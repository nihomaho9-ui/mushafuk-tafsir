(function () {
  var info = window.QM_ALL || { s: 1, a: 1, next: "", prev: "" };
  var BOOKS = [
    ["saadi", "تيسير الكريم الرحمن", "السعدي"],
    ["muyassar", "التفسير الميسر", "مجمع الملك فهد"],
    ["mukhtasar", "المختصر في تفسير القرآن الكريم", "مركز تفسير"],
    ["ibnkathir", "تفسير ابن كثير", "ابن كثير"],
    ["baghawi", "معالم التنزيل", "البغوي"],
    ["samani", "تفسير السمعاني", "السمعاني"],
    ["aysar", "أيسر التفاسير", "أبو بكر الجزائري"],
    ["tabari", "جامع البيان", "الطبري"],
    ["shinqiti", "أضواء البيان", "الشنقيطي"],
    ["shawkani", "فتح القدير", "الشوكاني"],
    ["uthaymeen", "تفسير ابن عثيمين", "ابن عثيمين"]
  ];
  var box = document.getElementById("cards");
  BOOKS.forEach(function (b) {
    var card = document.createElement("article");
    card.className = "card";
    card.innerHTML = "<h2>" + b[1] + "<small>" + b[2] + "</small></h2><div class='body'>…</div>";
    box.appendChild(card);
  });

  function passage(arr, a) {
    var i = a - 1, raw = arr[i] || "";
    if (String(raw).trim()) return { raw: raw, from: a, to: a };
    var j = i;
    while (j > 0 && !String(arr[j] || "").trim()) j--;
    if (!String(arr[j] || "").trim()) return { raw: "", from: a, to: a };
    var k = j;
    while (k + 1 < arr.length && !String(arr[k + 1] || "").trim()) k++;
    if (i <= k) return { raw: arr[j], from: j + 1, to: k + 1 };
    return { raw: "", from: a, to: a };
  }
  var DIG = "٠١٢٣٤٥٦٧٨٩";
  function ar(n) { return String(n).replace(/\d/g, function (c) { return DIG[c]; }); }

  var HEAVY = { ibnkathir: 1, baghawi: 1, tabari: 1, shawkani: 1, uthaymeen: 1 };
  function showBook(body, arr) {
    var p = passage(arr, info.a);
    body.textContent = "";
    if (p.from !== p.to) {
      var sm = document.createElement("small");
      sm.className = "rng";
      sm.textContent = "الآيات " + ar(p.from) + "–" + ar(p.to);
      body.appendChild(sm);
    }
    body.appendChild(document.createTextNode(String(p.raw).trim() || "لا يوجد نص لهذه الآية في هذا التفسير."));
  }
  function fetchBook(id) {
    return fetch("/data/" + id + "/" + info.s + ".json").then(function (r) { if (!r.ok) throw new Error(); return r.json(); });
  }
  BOOKS.forEach(function (b, n) {
    var card = box.children[n];
    var body = card.querySelector(".body");
    var run = function () {
      if (body.dataset.on) return;
      body.dataset.on = "1";
      fetchBook(b[0]).then(function (arr) { showBook(body, arr); }).catch(function () { body.textContent = "تعذر تحميل هذا التفسير."; });
    };
    if (!HEAVY[b[0]]) run();
    else if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (ents) {
        if (ents.some(function (e) { return e.isIntersecting; })) { io.disconnect(); run(); }
      }, { rootMargin: "200px" });
      io.observe(card);
    } else run();
  });

  var AYAHS = "7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6".split(",").map(Number);
  function href(s, a) { return "/all/" + s + "/" + a + "/"; }
  function step(s, a, dir) {
    a += dir;
    if (a < 1) { s--; if (s < 1) return null; a = AYAHS[s - 1]; }
    else if (a > AYAHS[s - 1]) { s++; if (s > 114) return null; a = 1; }
    return href(s, a);
  }
  [1, 2].forEach(function (d) {
    [step(info.s, info.a, d), step(info.s, info.a, -d)].forEach(function (u) {
      if (!u) return;
      var l = document.createElement("link");
      l.rel = "prefetch"; l.as = "document"; l.href = u;
      document.head.appendChild(l);
    });
  });
  try {
    if (window.HTMLScriptElement && HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules")) {
      var spec = document.createElement("script");
      spec.type = "speculationrules";
      var nxt = step(info.s, info.a, 1);
      spec.textContent = JSON.stringify({ prerender: [{ source: "list", urls: nxt ? [nxt] : [] }] });
      document.head.appendChild(spec);
    }
  } catch (e) {}
  if (!document.querySelector("a.home-brand")) {
    var brand = document.createElement("a");
    brand.className = "home-brand";
    brand.href = "/";
    brand.setAttribute("aria-label", "Mushafuk");
    brand.innerHTML = '<img src="/icon.png" alt="" width="18" height="18"><span>Mushafuk</span>';
    var bar = document.querySelector(".bar");
    if (bar) bar.appendChild(brand);
  }

  var x = null, y = null, lock = null, lastDx = 0;
  function down(cx, cy, t) {
    if (t && t.closest && t.closest("a,button,input,textarea")) { x = null; return; }
    x = cx; y = cy; lock = null; lastDx = 0;
  }
  function move(cx, cy) {
    if (x == null) return;
    var dx = cx - x, dy = cy - y;
    lastDx = dx;
    if (!lock && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) lock = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
  }
  function up() {
    if (x == null) return;
    var dx = lastDx, was = lock;
    x = null; lock = null;
    if (was !== "x" || Math.abs(dx) < 36) return;
    var u = dx > 0 ? info.next : info.prev;
    if (u) location.assign(u);
  }
  document.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) return;
    down(e.touches[0].clientX, e.touches[0].clientY, e.target);
  }, { capture: true, passive: true });
  document.addEventListener("touchmove", function (e) {
    if (!e.touches.length) return;
    move(e.touches[0].clientX, e.touches[0].clientY);
  }, { capture: true, passive: true });
  document.addEventListener("touchend", function () { up(); }, true);
  document.addEventListener("touchcancel", function () { x = null; lock = null; }, true);
  document.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "touch") return;
    down(e.clientX, e.clientY, e.target);
  }, true);
  document.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch" || x == null) return;
    move(e.clientX, e.clientY);
  }, true);
  document.addEventListener("pointerup", function (e) {
    if (e.pointerType === "touch") return;
    up();
  }, true);
})();
