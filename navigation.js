/* ============================================================
   MediScan AI — Navigation & Page Routing
   File: js/navigation.js
   Handles: Page switching, Toast notifications
   ============================================================ */


/* ─────────────────────────────────────────
   SHOW PAGE
   Switches between: home, signup, login, dashboard
───────────────────────────────────────── */
function showPage(pageName) {
  // Hide all pages
  const allPages = document.querySelectorAll('.page');
  allPages.forEach(page => page.classList.remove('active'));

  // Show the requested page
  const targetPage = document.getElementById('page-' + pageName);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Scroll to top on page switch
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ─────────────────────────────────────────
   TOAST NOTIFICATION
   Shows a floating message at bottom-right
   @param {string} message - Text to display
   @param {number} duration - Time in ms (default 3000)
───────────────────────────────────────── */
function showToast(message, duration = 3000) {
  const toastEl = document.getElementById('toast');
  if (!toastEl) return;

  toastEl.textContent = message;
  toastEl.classList.add('show');

  // Auto-hide after duration
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, duration);
}
