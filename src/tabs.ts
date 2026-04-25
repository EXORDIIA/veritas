export function initTabs(onMapActivate: () => void): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('.tab');
  const panels = document.querySelectorAll<HTMLElement>('.panel');
  const sw = document.getElementById('sw')!;

  function activateTab(key: string): void {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === key));
    panels.forEach(p => p.classList.toggle('active', p.id === key + 'Panel'));
    sw.classList.toggle('visible', key === 'characters');
    if (key === 'map') requestAnimationFrame(onMapActivate);
  }

  tabs.forEach(t => t.addEventListener('click', () => activateTab(t.dataset.tab!)));
}
