const SVG_MOON = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const SVG_SUN  = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><circle cx="12" cy="12" r="4"/><path fill="none" stroke="currentColor" stroke-width="2" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;

function applyTheme(theme: string): void {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch { /* ignore */ }
  const btn = document.getElementById('themeBtn')!;
  btn.innerHTML = theme === 'light' ? SVG_MOON : SVG_SUN;
  btn.title = theme === 'light' ? 'Mode sombre' : 'Mode clair';
}

export function initTheme(): void {
  const saved = (() => { try { return localStorage.getItem('theme') || ''; } catch { return ''; } })();
  applyTheme(saved);
  document.getElementById('themeBtn')!.addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'light' ? '' : 'light');
  });
}
