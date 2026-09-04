(function () {
  // Guard against double-injection on client-side (SPA) navigations.
  if (window.__gleapInjected) return;
  window.__gleapInjected = true;

  // Gleap Frontend (SDK) API key — public, client-side key, same class as the
  // analytics/widget IDs embedded in the sibling scripts.
  var GLEAP_API_KEY = 'aeHGJSmBKIqb9F8uHnQy95D2npuRaZw6';

  // Async Gleap loader (from the official JS SDK snippet): queues calls until
  // the SDK script loads, then initializes once.
  !(function () {
    if (!(window.Gleap = window.Gleap || []).invoked) {
      window.GleapActions = [];
      var e = new Proxy(
        { invoked: !0 },
        {
          get: function (e, n) {
            return n === 'invoked'
              ? e.invoked
              : function () {
                  var t = Array.prototype.slice.call(arguments);
                  window.GleapActions.push({ e: n, a: t });
                };
          },
          set: function (e, n, t) {
            return (e[n] = t), !0;
          },
        }
      );
      window.Gleap = e;
      var n = document.getElementsByTagName('head')[0];
      var t = document.createElement('script');
      t.type = 'text/javascript';
      t.async = !0;
      t.src = 'https://sdk.gleap.io/latest/index.js';
      n.appendChild(t);
      window.Gleap.initialize(GLEAP_API_KEY);
    }
  })();

  // The docs theme pins an "Ask AI" launcher at bottom:20px/right:20px. Gleap's
  // feedback button defaults to the same corner, so lift it above the Ask AI
  // button. Gleap's launcher renders into the light DOM, so a static head-level
  // CSS rule applies whether the element exists yet or appears later. Gleap's
  // current SDK renders the launcher as `.bb-feedback-button` (legacy BugBattle
  // class); the `.gleap-frontend-button*` selectors are kept as forward-compat
  // fallbacks. Lift the notification bubbles to stay above the moved button.
  var style = document.createElement('style');
  style.id = 'gleap-offset-fix';
  style.textContent =
    '.bb-feedback-button,.gleap-frontend-button,.gleap-frontend-button-container{bottom:88px !important;}' +
    '.gleap-notification-container{bottom:148px !important;}';
  document.getElementsByTagName('head')[0].appendChild(style);
})();
