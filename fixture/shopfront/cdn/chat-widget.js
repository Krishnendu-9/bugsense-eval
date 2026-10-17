/* Support chat widget, served from the CDN origin (no CORS headers). */
(function () {
  var state = { open: false, unread: 0 };
  // E2: the widget calls a bootstrap hook that this shop never defines.
  window.SupportChat.boot(state);
})();
