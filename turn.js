(function(){try{if(window.__mfk)return;window.__mfk=1;var l=location,h=l.hostname,n=navigator,r='',q0='',p=l.pathname.slice(0,300),K='sb_publishable_UnQ35pj_GatInq-7lhFGgQ_DnRoUnDC',M=/(^|\.)mushafuk\.online$/;if(!M.test(h)||/^\/admin(\/|$)/.test(p)||n.webdriver||/bot|crawl|spider|slurp|preview|headless|lighthouse/i.test(n.userAgent))return;function S(t,o){fetch('https://isvqwafixlmusmuqqnyk.supabase.co/rest/v1/'+t,{method:'POST',keepalive:true,headers:{apikey:K,Authorization:'Bearer '+K,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(o)}).catch(function(){})}try{r=new URL(document.referrer).hostname}catch(e){}if(M.test(r))r='';r=r||null;if(window.__mfk404){S('events',{host:h,kind:'404',path:p,ref_host:r});return}window.mfkS=function(q,c){q=String(q||'').trim().slice(0,100);if(q&&q!==q0){q0=q;S('events',{host:h,kind:'search',path:p,q:q,results:c|0})}};S('pageviews',{host:h,path:p,ref_host:r,lang:(document.documentElement.lang||n.language||'').slice(0,12),device:innerWidth<768?'mobile':'desktop'})}catch(e){}})();
(function () {
  var s = document.currentScript;
  var next = s.getAttribute("data-next") || "";
  var prev = s.getAttribute("data-prev") || "";
  (function () {
    var css = document.createElement("link");
    css.rel = "stylesheet";
    var base = (s && s.src) ? s.src.replace(/turn\.js[^/]*$/, "") : "https://tafsir.mushafuk.online/";
    css.href = base + "saadi.css?v=4";
    document.head.appendChild(css);
  })();
  (function () {
    var th = document.createElement("script");
    var base = (s && s.src) ? s.src.replace(/turn\.js[^/]*$/, "") : "https://tafsir.mushafuk.online/";
    th.src = base + "read-theme.js?v=1";
    document.head.appendChild(th);
  })();
  (function () {
    var base = (s && s.src) ? s.src.replace(/turn\.js[^/]*$/, "") : "https://tafsir.mushafuk.online/";
    var c = document.createElement("link"); c.rel = "stylesheet"; c.href = base + "quote-color.css?v=1"; document.head.appendChild(c);
    var q = document.createElement("script"); q.src = base + "quote-color.js?v=1"; document.head.appendChild(q);
  })();

  try { sessionStorage.removeItem("qm.tfdir"); } catch (e) {}
  document.documentElement.classList.remove("qm-turning");

  function warm(url, attr, left) {
    if (!url || left < 0) return;
    var l = document.createElement("link");
    l.rel = "prefetch";
    l.as = "document";
    l.href = url;
    document.head.appendChild(l);
    if (!left) return;
    fetch(url).then(function (r) { return r.text(); }).then(function (html) {
      var m = html.match(new RegExp(attr + '="([^"]*)"'));
      if (m && m[1]) warm(m[1], attr, left - 1);
    }).catch(function () {});
  }
  warm(next, "data-next", 2);
  warm(prev, "data-prev", 2);
  try {
    if (window.HTMLScriptElement && HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules")) {
      var spec = document.createElement("script");
      spec.type = "speculationrules";
      var urls = [next, prev].filter(Boolean);
      spec.textContent = JSON.stringify({
        prerender: [{ source: "list", urls: urls.slice(0, 1) }],
        prefetch: [{ source: "list", urls: urls }]
      });
      document.head.appendChild(spec);
    }
  } catch (e) {}
  if (!document.querySelector("a.qm-home")) {
    var st = document.createElement("style");
    st.textContent = "a.qm-home{display:inline-flex;align-items:center;justify-content:center;gap:.3rem;flex:none;color:#0f4d3a;font-weight:650;font-size:.78rem;line-height:1;text-decoration:none;white-space:nowrap;padding:.28rem .58rem;height:2.2rem;box-sizing:border-box;border-radius:999px;border:1px solid rgba(15,77,58,.28);background:rgba(15,77,58,.08)}a.qm-home svg{width:1.15rem;height:1.15rem;display:block;flex:none}a.qm-home:focus-visible{outline:2px solid #0f4d3a;outline-offset:2px}html.qm-theme-black a.qm-home,html.qm-night a.qm-home{color:#d7b56a;border-color:#6a5a3a;background:#1c1c1c}html.qm-theme-white a.qm-home{color:#0b3a2c;border-color:#bbb;background:#fff}@media(max-width:520px){a.qm-home{width:2.2rem;padding:0;gap:0;border-radius:50%}a.qm-home .qm-home-lbl{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}}";
    document.head.appendChild(st);
    var HOME_LBL={az:"Ana səhifə",tr:"Ana sayfa",en:"Home",ru:"Главная",ar:"الرئيسية",ur:"صفحہ اول",fa:"خانه",uz:"Bosh sahifa",tg:"Саҳифаи асосӣ",ky:"Башкы бет",ug:"باش بەت",ps:"کورپاڼه",ku:"Destpêk",hi:"मुखपृष्ठ",ta:"முகப்பு",fr:"Accueil",de:"Startseite",nl:"Startpagina",es:"Inicio",pt:"Início",ha:"Gida",so:"Bogga hore",ja:"ホーム",bn:"মূলপাতা",id:"Beranda",ms:"Laman utama",zh:"首页",al:"Faqja kryesore"};
    var lang=(document.documentElement.lang||"").slice(0,2).toLowerCase();
    if (!HOME_LBL[lang]) { var pm=location.pathname.match(/^\/([a-z]{2})(?:\/|$)/); if (pm) lang=pm[1]; }
    var label=HOME_LBL[lang]||HOME_LBL.en;
    var old=document.querySelector("a.home-brand");
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var home=document.createElement("a");
    home.className="qm-home";
    home.href="https://mushafuk.online/";
    home.setAttribute("aria-label",label);
    home.title=label;
    home.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11.2 12 4l8 7.2"/><path d="M7 10.2V20h10V10.2"/><path d="M10 20v-6h4v6"/></svg><span class="qm-home-lbl">'+label+"</span>";
    var bar=document.querySelector("header.bar, header.tr-bar, header.nav .in, .bar");
    if (bar) {
      var x=bar.querySelector("a.x, a#back, a.logo");
      if (x && x.nextSibling) bar.insertBefore(home, x.nextSibling);
      else if (x) bar.appendChild(home);
      else bar.insertBefore(home, bar.firstChild);
    }
  }

  var x = null, y = null, t0 = 0, lock = null, lastX = 0, lastY = 0;
  function selecting() {
    try { var s = window.getSelection(); return s && String(s).length > 0; } catch (e) { return false; }
  }
  function shouldTurn(dx, dy, dt) {
    if (window.QM_shouldTurnPage) return window.QM_shouldTurnPage(dx, dy, dt, window.innerWidth);
    if (dt >= 800 || selecting()) return 0;
    var min = Math.max(60, window.innerWidth * 0.15);
    if (Math.abs(dx) < min || Math.abs(dx) <= 1.5 * Math.abs(dy || 0)) return 0;
    return dx > 0 ? 1 : -1;
  }
  function go(dir) {
    var u = dir > 0 ? next : prev;
    if (u) location.assign(u + (window.qmTrail || ""));
  }
  function down(cx, cy, target) {
    if (target && target.closest && target.closest("a,button,input,textarea,select,label")) { x = null; return; }
    if (selecting()) { x = null; return; }
    x = cx; y = cy; t0 = performance.now(); lock = null; lastX = cx; lastY = cy;
  }
  function move(cx, cy, ev) {
    if (x == null) return;
    var dx = cx - x, dy = cy - y;
    lastX = cx; lastY = cy;
    if (!lock) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      lock = Math.abs(dx) > Math.abs(dy) * 1.5 ? "x" : "y";
    }
    if (lock === "x" && ev && ev.cancelable) ev.preventDefault();
  }
  function up() {
    if (x == null) return;
    var dx = lastX - x, dy = lastY - y, dt = performance.now() - t0, was = lock;
    x = null; lock = null;
    if (was === "y") return;
    var dir = shouldTurn(dx, dy, dt);
    if (dir) go(dir);
  }

  document.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) { x = null; lock = null; return; }
    down(e.touches[0].clientX, e.touches[0].clientY, e.target);
  }, { capture: true, passive: true });
  document.addEventListener("touchmove", function (e) {
    if (e.touches.length !== 1) { x = null; lock = null; return; }
    if (!e.touches.length) return;
    move(e.touches[0].clientX, e.touches[0].clientY, e);
  }, { capture: true, passive: false });
  document.addEventListener("touchend", function (e) {
    if (e.touches && e.touches.length) { x = null; lock = null; return; }
    up();
  }, true);
  document.addEventListener("touchcancel", function () { x = null; lock = null; }, true);
  document.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "touch") return;
    down(e.clientX, e.clientY, e.target);
  }, true);
  document.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch" || x == null) return;
    move(e.clientX, e.clientY, e);
  }, true);
  document.addEventListener("pointerup", function (e) {
    if (e.pointerType === "touch") return;
    up();
  }, true);
})();
/* QM-BACK-START: "×" returns to the page this reading trail actually came from.
   Context lives in each history entry's URL fragment (#qmfrom=...), never in tab-wide storage. */
(function () {
  var HOSTS = /^(mushafuk\.online|tafsir\.mushafuk\.online|t\.mushafuk\.online|t1\.mushafuk\.online)$/;
  function safe(u, base) {
    try { var p = new URL(u, base); return (p.protocol === "https:" && HOSTS.test(p.hostname)) ? p.href : null; } catch (e) { return null; }
  }
  function reading(u) {
    try { return /\/\d+\/\d+\/(index\.html)?$/.test(new URL(u).pathname); } catch (e) { return false; }
  }
  // o = {href, referrer}; returns validated origin URL or null (use page default link)
  function resolveFrom(o) {
    var hash = ""; try { hash = new URL(o.href).hash; } catch (e) { return null; }
    var m = /(?:^#|&)qmfrom=([^&]+)/.exec(hash);
    if (m) { var h = null; try { h = safe(decodeURIComponent(m[1]), o.href); } catch (e) {} return h; }
    var r = o.referrer ? safe(o.referrer, o.href) : null;
    if (r && new URL(r).origin === new URL(o.href).origin && !reading(r)) return r;
    return null;
  }
  function trail(from) { return from ? "#qmfrom=" + encodeURIComponent(from) : ""; }
  if (typeof module !== "undefined" && module.exports) { module.exports = { resolveFrom: resolveFrom, trail: trail }; return; }
  var s = document.currentScript;
  function apply() {
    var from = resolveFrom({ href: location.href, referrer: document.referrer });
    if (from === location.href.split("#")[0]) from = null;
    window.qmTrail = trail(from);
    var x = document.querySelector("header.bar a.x");
    if (x) { if (!x.hasAttribute("data-qm-default")) x.setAttribute("data-qm-default", x.getAttribute("href") || ""); x.setAttribute("href", from || x.getAttribute("data-qm-default")); }
    var adj = [s && s.getAttribute("data-next"), s && s.getAttribute("data-prev")].filter(Boolean).map(function (u) { try { return new URL(u, location.href).href.split("#")[0]; } catch (e) { return ""; } });
    var as = document.querySelectorAll("a[href]");
    for (var i = 0; i < as.length; i++) {
      var a = as[i]; if (a === x) continue;
      var base = a.getAttribute("data-qm-base") || a.href.split("#")[0];
      if (adj.indexOf(base) < 0) continue;
      a.setAttribute("data-qm-base", base);
      a.setAttribute("href", base + window.qmTrail);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply); else apply();
  window.addEventListener("pageshow", function (e) { if (e.persisted) apply(); });
})();
/* QM-BACK-END */

;try{var qs=document.createElement("script");qs.src="https://mushafuk.online/read-shelf.js?v=3";document.head.appendChild(qs);}catch(e){}
