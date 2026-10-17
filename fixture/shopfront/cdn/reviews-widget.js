/* Reviews widget, served from the CDN origin (no CORS headers). */
(function () {
  var config = window.ReviewsWidgetConfig;
  // E1: the host page never sets ReviewsWidgetConfig.
  var mount = document.querySelector(config.mountSelector);
  mount.textContent = 'Loading reviews...';
})();
