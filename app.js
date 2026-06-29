/* ============================================================
   (Ad)mission Possible — application logic
   Ported from the Claude Design DCLogic component to vanilla JS.
   This module wires up the landing page: navigation, the
   scroll-hide header, reveal/scramble motion, and the pathways
   table. The router -> plan -> dashboard flow lives below.
   ============================================================ */
(function () {
  'use strict';

  // ---- config (mirrors the design's exposed props) ----
  var CONFIG = { enableMotion: true, slashAngle: 12, showTrustStrip: true };

  // ---- data ----
  var PATHWAYS = [
    { name: 'Common App',     bestFor: 'Most private + many public', fact: 'One essay, 1,000+ schools',           money: 'Fee waivers available' },
    { name: 'UC Application', bestFor: 'All UC campuses',            fact: 'Its own Personal Insight Qs',         money: 'No separate supplements' },
    { name: 'QuestBridge',    bestFor: 'High-achieving, low-income', fact: 'National Match = possible full ride', money: 'Free to apply' },
    { name: 'Coalition',      bestFor: 'Member schools',             fact: 'Alternative to Common App',           money: 'Fee waivers available' },
    { name: 'ApplyTexas',     bestFor: 'Texas publics',              fact: 'Standard Texas route',                money: 'Its own essays' },
    { name: 'CBCA',           bestFor: 'HBCUs',                      fact: 'One app, many schools',               money: 'One low fee' }
  ];

  // ---- app state ----
  var state = { menuOpen: false, screen: 'site', step: 0, answers: {}, plan: null, trackOverride: null };

  var root, overlay, reduced, motionOn;

  // ---- helpers ----
  function el(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

  // ---- pathways table ----
  function renderPathways() {
    var host = root.querySelector('[data-pathways]');
    if (!host) return;
    host.innerHTML = PATHWAYS.map(function (row) {
      return '<div class="pathways__row">' +
        '<div class="pathways__name">' + esc(row.name) + '</div>' +
        '<div class="pathways__cell">' + esc(row.bestFor) + '</div>' +
        '<div class="pathways__cell">' + esc(row.fact) + '</div>' +
        '<div class="pathways__cell pathways__cell--muted">' + esc(row.money) + '</div>' +
      '</div>';
    }).join('');
  }

  // ---- navigation ----
  function goTo(id) {
    closeAllScreens();
    setTimeout(function () {
      var target = el(id);
      if (target) {
        var top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
      }
    }, 40);
  }

  function bindStaticNav() {
    document.querySelectorAll('[data-nav]').forEach(function (node) {
      node.addEventListener('click', function () { goTo(node.getAttribute('data-nav')); });
    });
    var toggle = root.querySelector('[data-menu-toggle]');
    if (toggle) toggle.addEventListener('click', function () { openMenu(); });
    // Wrap in a closure so a later openRouter reassignment (from the flow
    // module via setHooks) is picked up without re-binding the listener.
    document.querySelectorAll('[data-open-router]').forEach(function (b) {
      b.addEventListener('click', function () { openRouter(); });
    });
    var joinForm = root.querySelector('[data-join-form]');
    if (joinForm) joinForm.addEventListener('submit', function (e) {
      e.preventDefault();
      joinForm.reset();
      flashJoin(joinForm);
    });
  }

  function flashJoin(form) {
    var btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    var prev = btn.textContent;
    btn.textContent = 'Thanks';
    setTimeout(function () { btn.textContent = prev; }, 1800);
  }

  // ---- scroll-hide header ----
  var lastY = 0;
  function onScroll() {
    var h = root.querySelector('[data-header]');
    if (!h) return;
    var y = window.scrollY;
    if (y > lastY && y > 140) h.style.transform = 'translateY(-100%)';
    else h.style.transform = 'translateY(0)';
    lastY = y;
  }

  // ---- reveal + slash motion ----
  function setupMotion() {
    root.classList.add('is-animated');
    root.style.setProperty('--slash-angle', (CONFIG.slashAngle || 12) + 'deg');

    var slashes = root.querySelectorAll('[data-slash]');
    var reveals = root.querySelectorAll('[data-reveal]');
    var all = [].slice.call(slashes).concat([].slice.call(reveals));

    function show(node) { node.classList.add('shown'); node.dataset.shown = '1'; }

    function check() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var margin = vh * 0.12;
      all.forEach(function (node) {
        if (node.dataset.shown) return;
        var r = node.getBoundingClientRect();
        if (r.top < vh - margin && r.bottom > 0) show(node);
      });
    }

    var ticking = false;
    function onRevealScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; check(); });
    }
    window.addEventListener('scroll', onRevealScroll, { passive: true });
    window.addEventListener('resize', onRevealScroll, { passive: true });

    try {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting || e.target.dataset.shown) return;
          show(e.target);
          io.unobserve(e.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      all.forEach(function (n) { io.observe(n); });
    } catch (e) { /* no IO support */ }

    requestAnimationFrame(check);
    // safety net: never leave content stuck hidden
    setTimeout(function () { all.forEach(show); }, 1600);

    scrambleHero();
  }

  function scrambleHero() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\';
    root.querySelectorAll('[data-scramble]').forEach(function (node, i) {
      var text = node.textContent;
      var dur = 550 + i * 130;
      var start = performance.now();
      (function tick(now) {
        var p = Math.min(1, (now - start) / dur);
        var revealCount = Math.floor(p * text.length);
        var out = '';
        for (var j = 0; j < text.length; j++) {
          if (j < revealCount || text[j] === ' ') out += text[j];
          else out += chars[Math.floor(Math.random() * chars.length)];
        }
        node.textContent = out;
        if (p < 1) requestAnimationFrame(tick);
        else node.textContent = text;
      })(start);
    });
  }

  // ---- screen hooks (implemented in the flow module below) ----
  function openMenu() { state.menuOpen = true; renderOverlay(); }
  function openRouter() { /* defined in flow module */ }
  function closeAllScreens() { state.menuOpen = false; state.screen = 'site'; renderOverlay(); }
  function renderOverlay() { if (overlay) overlay.innerHTML = ''; }

  // ---- boot ----
  function init() {
    root = el('root');
    overlay = el('overlay');
    reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    motionOn = CONFIG.enableMotion && !reduced;

    if (!CONFIG.showTrustStrip) {
      var strip = root.querySelector('[data-trust-strip]');
      if (strip) strip.style.display = 'none';
    }

    renderPathways();
    bindStaticNav();
    window.addEventListener('scroll', onScroll, { passive: true });
    if (motionOn) setupMotion();

    // shared surface for the flow module
    window.AP = {
      state: state, CONFIG: CONFIG, root: root, overlay: overlay,
      reduced: reduced, el: el, esc: esc,
      setHooks: function (h) {
        if (h.openRouter) openRouter = h.openRouter;
        if (h.renderOverlay) renderOverlay = h.renderOverlay;
        if (h.closeAllScreens) closeAllScreens = h.closeAllScreens;
      }
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
