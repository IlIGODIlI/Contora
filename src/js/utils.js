// Contora Utilities Module

/**
 * Show a toast notification popup
 * @param {string} msg Message to show in the toast
 */
export function showToast(msg = 'Copied!') {
  const t = document.getElementById('toast');
  if (t) {
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }
}

/**
 * Copy text to clipboard with toast notification feedback
 * @param {string} txt Text to copy
 */
export function copyText(txt) {
  navigator.clipboard.writeText(txt)
    .then(() => showToast('Copied to clipboard ✓'))
    .catch(() => {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = txt;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand('copy');
        showToast('Copied!');
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
      document.body.removeChild(el);
    });
}

// Expose on window for inline compatibility (e.g. onclick="copyText(...)")
window.showToast = showToast;
window.copyText = copyText;
