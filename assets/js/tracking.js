/* [QH4 SLOT 7] CONFIG DE RASTREAMENTO E CONTATO
   Tudo que muda de cliente para cliente fica aqui. */
window.QH4_CONFIG = {
  WHATSAPP: "5519999505158",   // PENDENTE: briefing indica (19) 99950-5158; a ficha do contrato traz (19) 97146-5158. Confirmar com o cliente.
  MSG_PADRAO: "Olá! Vim pelo site da Imperial Marmoraria e gostaria de um orçamento.",
  MSG_FORMULARIO: "Olá, acabei de preencher o formulário no site. Aguardo mais informações.",
  WEBHOOK: "",                 // URL do Google Apps Script. Vazio = formulário monta a mensagem completa e envia direto pro WhatsApp.
  CONVERSAO_GOOGLE_ADS: "",    // ex.: "AW-XXXXXXXXX/AbCdEfGhIjK"
  CONVERSAO_META: "Lead"
};
window.dataLayer = window.dataLayer || [];
window.qh4Evento = function (nome, extra) {
  var e = { event: nome }; for (var k in (extra || {})) e[k] = extra[k];
  window.dataLayer.push(e);
};
