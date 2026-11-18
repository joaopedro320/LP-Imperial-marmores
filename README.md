# LP Imperial Marmoraria (High Ticket Stones)

Landing page da Imperial Marmoraria (Campinas, SP), no padrão QH4. HTML, CSS e JS puros, sem build.

## Estrutura
```
index.html           LP principal
obrigado.html        página de obrigado (redireciona pro WhatsApp em 5s)
404.html             erro personalizado
robots.txt / sitemap.xml / site.webmanifest / vercel.json
assets/css/style.css
assets/js/tracking.js   config (WhatsApp, webhook, conversões) e dataLayer
assets/js/main.js       header, revelar ao rolar, serviços, formulário
assets/js/obrigado.js
assets/img/             fotos reais (jpg otimizadas), logo, ícones, og-image
TRACKING-QH4.md         onde colar GTM, Pixel e demais códigos
```

## Como publicar na Vercel (plano gratuito)
1. Suba esta pasta como projeto estático (Framework: Other, sem build command, output = raiz).
2. Aponte o domínio. A LP vai no mesmo domínio do site atual (imperialmarmoraria.net), então alinhe a transição com quem cuida do WordPress hoje antes de trocar o DNS.

## Pendências antes de publicar
- **WhatsApp:** o briefing indica (19) 99950-5158 para os anúncios e a ficha do contrato traz (19) 97146-5158. A LP está com o do briefing. Para trocar, edite `WHATSAPP` em `assets/js/tracking.js` e o `telephone` no JSON-LD do `index.html`.
- **GTM, Pixel, Google Ads:** colar nos slots (ver TRACKING-QH4.md).
- **Webhook do formulário:** `WEBHOOK` vazio em `tracking.js`. Sem webhook, o formulário monta a mensagem completa e envia direto pro WhatsApp. Com Apps Script, envia, abre `obrigado.html` e redireciona pro WhatsApp com "Olá, acabei de preencher o formulário no site. Aguardo mais informações."
- **Canonical, sitemap e OG:** estão com `https://imperialmarmoraria.net/`. Ajuste se o domínio final for outro.
- **Frase de propósito (seção Nossa história):** vem do briefing ("levar o Senhor Jesus por meio do nosso trabalho, edificando vidas"). Confirmar com o Lucas se quer no ar.
- **Logo:** o arquivo original é pequeno (200 px), então ele foi ampliado. Se houver versão em vetor ou maior, trocar `assets/img/logo.png`.
- **Mapa:** iframe do Google Maps com o endereço do site atual (Rua Rio das Pedras, 427, Jardim do Trevo). Confirmar se o endereço muda com o barracão novo.
- **Fontes:** Poppins e Inter via Google Fonts (briefing sem preferência de fonte).

## Fonte do conteúdo
Só o que está no briefing, na ficha do contrato e no site atual: fundação em 26/01/2015 e reinauguração em 2019, horários, endereço, lista de serviços, materiais e distribuidores, diferenciais (qualidade com valor justo, quartzito acessível, mão de obra especializada). Sem depoimentos, anos de mercado, garantias ou números inventados. Fotos escolhidas das obras da pasta do cliente.

## Eventos de rastreamento (dataLayer)
`whatsapp_click` (com `wa_local`: header, hero, projetos, servicos, contato, flutuante), `form_start`, `generate_lead`, `thank_you_view`, `galeria_ampliar`.

## Checklist de SEO e entrega
- Title e description com cidade e nicho; headline com "Marmoraria" e "perto de você"
- JSON-LD HomeAndConstructionBusiness e FAQPage (só fatos do briefing)
- Open Graph e Twitter Card completos, canonical, robots, sitemap, manifest
- width/height nas imagens, preload do hero, lazy nas demais
- Página de obrigado e 404 personalizadas, vercel.json
- Galeria com lightbox (clique amplia; setas, ESC e deslize no celular; evento `galeria_ampliar`)
- Botão flutuante de WhatsApp, formulário com envio desabilitado até ficar válido
- Script do IVO na index e na obrigado (`data-lp="lp-imperial-marmoraria"`)
- Rodapé: Desenvolvido por QH4 Growth, com link pro Instagram da agência
