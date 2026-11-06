/*! quote-color.js — high-confidence Quran/hadith spans; preserves textContent */
(function () {
  var Q_CLASS = "qm-q-ayah";
  var H_CLASS = "qm-q-hadith";
  // Ornate Quran brackets; OpenITI @QB@…@QE@; optional explicit @HAD@…@HADE@ if ever present.
  var RE_Q = /﴿[^﴾]*﴾|@QB@[\s\S]*?@QE@/g;
  var RE_H = /@HAD@[\s\S]*?@HADE@/g;
  var ROOT_SEL = [
    ".tx[lang='ar']", ".tx[lang=ar]", ".ay",
    ".ulum-book .body", ".qm-body[lang='ar']", ".qm-body[lang=ar]",
    ".qm-tx2[lang='ar']", ".qm-cmp-tx[lang='ar']", ".qm-gh"
  ].join(",");

  function already(n) {
    return n.parentElement && (n.parentElement.classList.contains(Q_CLASS) || n.parentElement.classList.contains(H_CLASS));
  }

  function wrapMatches(textNode, re, cls) {
    var text = textNode.nodeValue;
    if (!text || !re.test(text)) { re.lastIndex = 0; return; }
    re.lastIndex = 0;
    var frag = document.createDocumentFragment();
    var last = 0, m;
    while ((m = re.exec(text))) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      var sp = document.createElement("span");
      sp.className = cls;
      sp.textContent = m[0];
      frag.appendChild(sp);
      last = m.index + m[0].length;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    textNode.parentNode.replaceChild(frag, textNode);
  }

  function walk(root) {
    if (!root || root.nodeType !== 1) return;
    if (root.classList.contains(Q_CLASS) || root.classList.contains(H_CLASS)) return;
    // Primary ayah line on static tafsir pages
    if (root.classList.contains("ay") && !root.querySelector("." + Q_CLASS)) {
      root.classList.add(Q_CLASS);
    }
    var nodes = [];
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = tw.nextNode())) {
      if (!n.nodeValue || !n.nodeValue.trim()) continue;
      if (already(n)) continue;
      // skip script/style
      var p = n.parentElement;
      if (p && /^(SCRIPT|STYLE|TEXTAREA)$/.test(p.tagName)) continue;
      nodes.push(n);
    }
    nodes.forEach(function (tn) {
      wrapMatches(tn, RE_H, H_CLASS);
    });
    // re-collect after hadith wraps
    nodes = [];
    tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    while ((n = tw.nextNode())) {
      if (!n.nodeValue || !n.nodeValue.trim()) continue;
      if (already(n)) continue;
      var p = n.parentElement;
      if (p && /^(SCRIPT|STYLE|TEXTAREA)$/.test(p.tagName)) continue;
      nodes.push(n);
    }
    nodes.forEach(function (tn) {
      wrapMatches(tn, RE_Q, Q_CLASS);
    });
  }

  function colorize(root) {
    if (!root) root = document;
    if (root.nodeType === 1 && root.matches && root.matches(ROOT_SEL)) walk(root);
    else if (root.querySelectorAll) root.querySelectorAll(ROOT_SEL).forEach(walk);
  }

  window.QM_COLOR_QUOTES = colorize;

  function boot() { colorize(document); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
