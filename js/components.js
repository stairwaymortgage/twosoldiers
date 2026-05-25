/* ========================================================================
   TwoSoldiers.org — Shared Component Loader
   Loads header and footer partials into placeholder divs on every page.
   Usage: Place <div data-include="partials/header.html"></div>
                <div data-include="partials/footer.html"></div>
          and link this script before </body>.
   ======================================================================== */

(function () {
  // Load all partials marked with data-include
  var placeholders = document.querySelectorAll('[data-include]');

  placeholders.forEach(function (el) {
    var url = el.getAttribute('data-include');
    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load ' + url);
        return res.text();
      })
      .then(function (html) {
        el.outerHTML = html;
        // After header is injected, mark the active page link
        markActiveNavLink();
      })
      .catch(function (err) {
        console.error('Component load error:', err);
      });
  });

  // Highlight the current page in the nav
  function markActiveNavLink() {
    var path = window.location.pathname.split('/').pop() || 'index';
    // Strip .html if present (for previewing locally) — clean URLs already have no extension
    var page = path.replace('.html', '');
    // Treat the root URL as 'index'
    if (page === '' || page === '/') page = 'index';
    var activeAttr = 'data-nav-' + page;
    var link = document.querySelector('[' + activeAttr + ']');
    if (link) link.classList.add('active');
  }
})();
