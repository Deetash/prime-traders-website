(() => {
  const root = document.documentElement;
  const storageKey = 'prime-traders-theme';
  const toggle = document.getElementById('themeToggle');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  const getPreferredTheme = () => {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark') return saved;
    return systemDark.matches ? 'dark' : 'light';
  };

  const applyTheme = (theme, persist = false) => {
    root.setAttribute('data-theme', theme);
    if (persist) localStorage.setItem(storageKey, theme);
    if (toggle) {
      const icon = toggle.querySelector('.theme-icon');
      const nextMode = theme === 'dark' ? 'light' : 'dark';
      if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      toggle.setAttribute('aria-label', `Switch to ${nextMode} mode`);
      toggle.setAttribute('title', `Switch to ${nextMode} mode`);
    }
  };

  applyTheme(getPreferredTheme());

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || getPreferredTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next, true);
    });
  }

  const handleSystemChange = (event) => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) applyTheme(event.matches ? 'dark' : 'light');
  };

  if (systemDark.addEventListener) {
    systemDark.addEventListener('change', handleSystemChange);
  } else if (systemDark.addListener) {
    systemDark.addListener(handleSystemChange);
  }

  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      if (!item) return;
      item.classList.toggle('open');
    });
  });
})();