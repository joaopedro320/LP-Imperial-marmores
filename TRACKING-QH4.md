# Onde colar cada código

Os slots estão comentados de forma visível na `index.html`, na `obrigado.html` e na `404.html` (mesmos números).

| Slot | Onde | O que colar |
|---|---|---|
| 1 | `<head>` | Script do Google Tag Manager |
| 2 | `<head>` | Metas de verificação de domínio (Search Console, Meta) |
| 3 | `<head>` | Meta Pixel direto (só se NÃO usar GTM) |
| 4 | `<head>` | gtag do Google Ads ou GA4 direto (só se NÃO usar GTM) |
| 5 | logo após `<body>` | GTM noscript |
| 6 | antes de `</body>` | Scripts de terceiros (Clarity, Hotjar, chat) |
| 7 | `assets/js/tracking.js` | WhatsApp, webhook e rótulos de conversão |
| 8 | `obrigado.html` | Conversão de Lead (Google Ads e Meta) |

Eventos no dataLayer: `whatsapp_click` (wa_local), `form_start`, `generate_lead`, `thank_you_view`.

O script do IVO já está instalado antes do `</body>` da index e da obrigado (não na 404).
