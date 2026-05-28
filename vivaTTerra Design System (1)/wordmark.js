/* =============================================================
   vivaTTerra — wordmark auto-grafter
   Finds any "TT" inside text nodes and wraps it in
   <span class="wm-tt">TT</span> so the two T crossbars merge.
   Works for vivaTTerra, VivaTTerra, VIVATTERRA — anywhere "TT"
   appears. Idempotent: safe to call multiple times.

   Usage:
     <link rel="stylesheet" href="/path/to/colors_and_type.css">
     <script src="/path/to/wordmark.js"></script>

   Or, in React / dynamic UIs, call manually after render:
     window.vivaTTerra.graftTT(rootElement);

   To skip a specific element, add class="no-graft" to it.
   ============================================================= */
(function () {
  var SKIP_SEL = '.wm-tt, .no-graft, script, style, code, pre, textarea, input, [contenteditable="true"]';

  function graftTT(root) {
    root = root || document.body;
    if (!root) return;

    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || n.nodeValue.indexOf('TT') === -1) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        if (!p || p.closest(SKIP_SEL)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var parts = node.nodeValue.split(/(TT)/);
      if (parts.length === 1) continue;
      var frag = document.createDocumentFragment();
      for (var j = 0; j < parts.length; j++) {
        var part = parts[j];
        if (part === 'TT') {
          var span = document.createElement('span');
          span.className = 'wm-tt';
          span.textContent = 'TT';
          frag.appendChild(span);
        } else if (part) {
          frag.appendChild(document.createTextNode(part));
        }
      }
      node.replaceWith(frag);
    }
  }

  // Optional: watch for DOM additions and graft new content as it appears.
  function observe(root) {
    if (typeof MutationObserver === 'undefined') return null;
    var pending = false;
    var mo = new MutationObserver(function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        graftTT(root || document.body);
      });
    });
    mo.observe(root || document.body, { childList: true, subtree: true, characterData: true });
    return mo;
  }

  window.vivaTTerra = window.vivaTTerra || {};
  window.vivaTTerra.graftTT = graftTT;
  window.vivaTTerra.observeGraftTT = observe;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { graftTT(); observe(); });
  } else {
    graftTT();
    observe();
  }
})();
