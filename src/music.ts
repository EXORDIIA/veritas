const SVG_PAUSE = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
const SVG_PLAY  = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8 5v14l11-7z"/></svg>`;

export function initMusic(): void {
  const aud    = document.getElementById('bgMusic')  as HTMLAudioElement;
  const mBtn   = document.getElementById('musicBtn') as HTMLButtonElement;
  const splash = document.getElementById('splash')   as HTMLElement;

  function syncBtn(): void {
    mBtn.innerHTML = aud.paused ? SVG_PLAY : SVG_PAUSE;
    mBtn.title = aud.paused ? 'Reprendre la musique' : 'Stopper la musique';
  }

  function dismissSplash(): void {
    splash.classList.add('hidden');
    setTimeout(() => splash.remove(), 900);
    aud.volume = 0.35;
    aud.play().then(syncBtn).catch(syncBtn);
  }

  splash.addEventListener('click', dismissSplash);
  splash.addEventListener('touchend', e => { e.preventDefault(); dismissSplash(); });

  mBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (aud.paused) aud.play().then(syncBtn).catch(syncBtn);
    else aud.pause();
    syncBtn();
  });
  aud.addEventListener('play', syncBtn);
  aud.addEventListener('pause', syncBtn);
}
