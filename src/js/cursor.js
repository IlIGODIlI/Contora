/* ============================================================
   CONTORA — cursor.js
   Custom glowing blue cursor

   To DISABLE the custom cursor:
   1. Delete this file's <script> tag from index.html
   2. Remove the 3 cursor divs from index.html (search "cur-dot")
   3. In styles.css section 26, delete everything
   ============================================================ */

(function () {
  const dot = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  const glow = document.getElementById('cur-glow');

  let mx = 0, my = 0;   // mouse position (dot follows instantly)
  let rx = 0, ry = 0;   // ring position (smooth lag)
  let gx = 0, gy = 0;   // glow position (slower lag)

  // Track mouse position
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  // Animate ring and glow with smooth lag
  (function loop() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    gx += (mx - gx) * 0.06;
    gy += (my - gy) * 0.06;

    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    glow.style.left = gx + 'px';
    glow.style.top = gy + 'px';

    requestAnimationFrame(loop);
  })();

  // Click effect — shrink dot, expand ring
  document.addEventListener('mousedown', () => document.body.classList.add('cur-click'));
  document.addEventListener('mouseup', () => document.body.classList.remove('cur-click'));
})();