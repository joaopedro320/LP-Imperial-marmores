(function () {
  var C = window.QH4_CONFIG, url = "https://wa.me/" + C.WHATSAPP + "?text=" + encodeURIComponent(C.MSG_FORMULARIO);
  var a = document.getElementById("ir-wa"); if (a) a.href = url;
  window.qh4Evento("thank_you_view");
  var n = 5, el = document.getElementById("conta");
  var t = setInterval(function () { n--; if (el) el.textContent = n; if (n <= 0) { clearInterval(t); location.href = url; } }, 1000);
})();
