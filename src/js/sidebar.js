(function () {
  const body = document.body;
  const btn  = document.getElementById('sidebarToggle');

  try {
    if (localStorage.getItem('sidebarCollapsed') === '1') {
      body.classList.add('sidebar-collapsed');
    }
  } catch (e) {}

  if (btn) {
    updateIcon();
    btn.addEventListener('click', function () {
      body.classList.toggle('sidebar-collapsed');
      updateIcon();
      try {
        localStorage.setItem(
          'sidebarCollapsed',
          body.classList.contains('sidebar-collapsed') ? '1' : '0'
        );
      } catch (e) {}
    });
  }

  function updateIcon() {
    if (!btn) return;
    const collapsed = body.classList.contains('sidebar-collapsed');
    btn.textContent = collapsed ? '→' : '←';
    btn.title = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
  }
})();