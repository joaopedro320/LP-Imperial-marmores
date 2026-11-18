(function () {
  var C = window.QH4_CONFIG, $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function wa(msg) { return "https://wa.me/" + C.WHATSAPP + "?text=" + encodeURIComponent(msg); }

  // links de WhatsApp
  $$("[data-wa]").forEach(function (a) {
    a.href = wa(C.MSG_PADRAO);
    a.target = "_blank"; a.rel = "noopener";
    a.addEventListener("click", function () { window.qh4Evento("whatsapp_click", { wa_local: a.getAttribute("data-wa") }); });
  });

  // header
  var topo = $(".topo");
  function onScroll() {
    topo.classList.toggle("rolou", window.scrollY > 40);
    var im = $(".arco img"); if (im && window.scrollY < 900 && !matchMedia("(prefers-reduced-motion:reduce)").matches) im.style.transform = "translateY(" + (-window.scrollY * 0.05) + "px)";
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // revelar ao rolar
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); } }); }, { threshold: .12 });
    $$(".revela").forEach(function (el) { io.observe(el); });
  } else { $$(".revela").forEach(function (el) { el.classList.add("vis"); }); }

  // faixa duplicada para loop continuo
  var tr = $(".faixa-trilho"); if (tr) tr.innerHTML += tr.innerHTML;


  // lightbox da galeria
  var itens = $$(".galeria .g"), lb, lbImg, lbCap, atual = 0, ultimo = null, x0 = null;
  function monta() {
    lb = document.createElement("div"); lb.className = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Imagem ampliada"); lb.hidden = true;
    lb.innerHTML = '<button class="lb-x" type="button" aria-label="Fechar">&times;</button><button class="lb-n lb-prev" type="button" aria-label="Anterior">&#8249;</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-n lb-next" type="button" aria-label="Próxima">&#8250;</button>';
    document.body.appendChild(lb); lbImg = $("img", lb); lbCap = $("figcaption", lb);
    $(".lb-x", lb).addEventListener("click", fecha);
    $(".lb-prev", lb).addEventListener("click", function (e) { e.stopPropagation(); vai(-1); });
    $(".lb-next", lb).addEventListener("click", function (e) { e.stopPropagation(); vai(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.tagName === "FIGURE") fecha(); });
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) { if (x0 === null) return; var d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 50) vai(d < 0 ? 1 : -1); x0 = null; });
  }
  function mostraItem(i) {
    atual = (i + itens.length) % itens.length;
    var im = $("img", itens[atual]), cap = $("figcaption", itens[atual]);
    lbImg.classList.remove("on"); lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt; lbCap.textContent = cap ? cap.textContent : "";
    lbImg.onload = function () { lbImg.classList.add("on"); }; if (lbImg.complete) lbImg.classList.add("on");
  }
  function abre(i) {
    if (!lb) monta(); ultimo = document.activeElement; mostraItem(i); lb.hidden = false; document.body.style.overflow = "hidden";
    requestAnimationFrame(function () { lb.classList.add("aberto"); $(".lb-x", lb).focus(); });
    window.qh4Evento("galeria_ampliar", { item: lbCap.textContent });
  }
  function fecha() { lb.classList.remove("aberto"); document.body.style.overflow = ""; setTimeout(function () { lb.hidden = true; }, 250); if (ultimo) ultimo.focus(); }
  function vai(d) { mostraItem(atual + d); }
  itens.forEach(function (g, i) {
    g.tabIndex = 0; g.setAttribute("role", "button"); g.setAttribute("aria-label", "Ampliar: " + ($("figcaption", g) ? $("figcaption", g).textContent : "foto"));
    g.addEventListener("click", function () { abre(i); });
    g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abre(i); } });
  });
  document.addEventListener("keydown", function (e) {
    if (!lb || lb.hidden) return;
    if (e.key === "Escape") fecha(); else if (e.key === "ArrowRight") vai(1); else if (e.key === "ArrowLeft") vai(-1);
    else if (e.key === "Tab") { var f = $$("button", lb); var a = document.activeElement, p = f.indexOf(a); if (e.shiftKey && p <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && p === f.length - 1) { e.preventDefault(); f[0].focus(); } }
  });

  // servicos: foto troca com a lista
  var btns = $$(".serv-lista button"), fotos = $$(".serv-foto img");
  function mostrar(b) {
    var alvo = b.getAttribute("data-foto"); if (!alvo) return;
    btns.forEach(function (x) { x.removeAttribute("aria-current"); }); b.setAttribute("aria-current", "true");
    fotos.forEach(function (f) { f.classList.toggle("on", f.id === alvo); });
  }
  btns.forEach(function (b) { ["mouseenter", "focus", "click"].forEach(function (ev) { b.addEventListener(ev, function () { mostrar(b); }); }); });

  // formulario
  var f = $("#form-orcamento"); if (!f) return;
  var botao = $("button[type=submit]", f), iniciou = false;
  function valida() { botao.disabled = !f.checkValidity(); }
  f.addEventListener("input", function () { if (!iniciou) { iniciou = true; window.qh4Evento("form_start"); } valida(); });
  f.addEventListener("change", valida); valida();
  var tel = $("#tel"); tel.addEventListener("input", function () {
    var d = tel.value.replace(/\D/g, "").slice(0, 11), o = d;
    if (d.length > 2) o = "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length > 7) o = "(" + d.slice(0, 2) + ") " + d.slice(2, d.length - 4) + "-" + d.slice(-4);
    tel.value = o;
  });
  f.addEventListener("submit", function (e) {
    e.preventDefault(); if (!f.checkValidity() || $("#site-hp").value) return;
    var d = { nome: $("#nome").value.trim(), whatsapp: tel.value, ambiente: $("#ambiente").value, fase: $("#fase").value, mensagem: $("#msg").value.trim() };
    window.qh4Evento("generate_lead", { form_ambiente: d.ambiente });
    botao.disabled = true; botao.textContent = "Enviando...";
    if (C.WEBHOOK) {
      var body = new URLSearchParams(d); body.append("origem", location.href);
      fetch(C.WEBHOOK, { method: "POST", mode: "no-cors", body: body }).catch(function () { }).finally(function () { location.href = "obrigado.html"; });
    } else {
      var m = "Olá! Vim pelo site da Imperial Marmoraria e gostaria de um orçamento.\n\nNome: " + d.nome + "\nWhatsApp: " + d.whatsapp + "\nAmbiente: " + d.ambiente + "\nFase do projeto: " + d.fase + (d.mensagem ? "\nMensagem: " + d.mensagem : "");
      location.href = wa(m);
    }
  });
})();
