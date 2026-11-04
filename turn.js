(function () {
  var s = document.currentScript;
  var next = s.getAttribute("data-next") || "";
  var prev = s.getAttribute("data-prev") || "";
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
  if (!document.querySelector("a.home-brand")) {
    var st = document.createElement("style");
    st.textContent = "a.home-brand{display:flex;align-items:center;gap:.28rem;margin-inline-start:auto;flex:none;text-decoration:none;color:#12352c;font-weight:700;font-size:.72rem;line-height:1}a.home-brand img{width:1.05rem;height:1.05rem;border-radius:22%;display:block}";
    document.head.appendChild(st);
    var brand = document.createElement("a");
    brand.className = "home-brand";
    brand.href = "https://mushafuk.online/";
    brand.setAttribute("aria-label", "Mushafuk");
    brand.innerHTML = '<img src="https://mushafuk.online/icon.png" alt="" width="18" height="18"><span>Mushafuk</span>';
    var bar = document.querySelector(".bar");
    if (bar) bar.appendChild(brand);
  }

  var x = null, y = null, lock = null, lastDx = 0;
  function go(dir) {
    var u = dir > 0 ? next : prev;
    if (u) location.assign(u);
  }
  function down(cx, cy, target) {
    if (target && target.closest && target.closest("a,button,input,textarea")) { x = null; return; }
    x = cx; y = cy; lock = null; lastDx = 0;
  }
  function move(cx, cy, ev) {
    if (x == null) return;
    var dx = cx - x, dy = cy - y;
    lastDx = dx;
    if (!lock) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      lock = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (lock === "x" && ev && ev.cancelable) ev.preventDefault();
  }
  function up() {
    if (x == null) return;
    var dx = lastDx, was = lock;
    x = null; lock = null;
    if (was === "x" && Math.abs(dx) > 32) go(dx > 0 ? 1 : -1);
  }

  document.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) return;
    down(e.touches[0].clientX, e.touches[0].clientY, e.target);
  }, { capture: true, passive: true });
  document.addEventListener("touchmove", function (e) {
    if (!e.touches.length) return;
    move(e.touches[0].clientX, e.touches[0].clientY, e);
  }, { capture: true, passive: false });
  document.addEventListener("touchend", function () { up(); }, true);
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
