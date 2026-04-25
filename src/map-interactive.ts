import { characters, type Character } from './data/characters';
import { openCharacterModal } from './characters';

const NATMAP: Record<string, [number, number]> = {
  'Nahr':             [9.2,  33.2],
  'Santia':           [10.4, 53.6],
  'Air':              [3.2,  58.4],
  'Yhick':            [11.6, 65.6],
  'Alkyrta':          [14,   87.2],
  "Hun'ai":           [0,    89.6],
  'Yidu':             [0.8,  2],
  'Aaube':            [27.2, 63.2],
  'Taqqiq Triangle':  [33.2, 59.6],
  'Gora':             [32,   88.4],
  'Naygen':           [66.8, 76.4],
  'Bari':             [47.6, 63.2],
  'Yinggai':          [38,   27.2],
  'Iowha':            [50,   30.8],
  'Korenas':          [29.6, 5.6],
  'Frea':             [84.8, 41.6],
  'Yharien':          [76.4, 60.8],
  'Herya':            [70.4, 89.6],
  'Skyvet':           [96.8, 53.6],
  'Avik':             [95.6, 84.8],
  'Aster':            [90.8, 15.2],
  'Iren':             [100,  27.2],
  'Astria':           [72.8, 8],
  'Corinda':          [100,  86],
  'Sedna':            [0,    70.4],
  'Isete':            [5.6,  81.2],
};

// Group characters by nationality
const byNat: Record<string, Character[]> = {};
characters.forEach(c => {
  if (c.nationality && NATMAP[c.nationality]) {
    (byNat[c.nationality] ??= []).push(c);
  }
});

function closePopup(): void {
  document.getElementById('natPopup')!.classList.remove('open');
}

function openPopup(nat: string, chars: Character[]): void {
  const popup   = document.getElementById('natPopup')!;
  const nameEl  = document.getElementById('natPopupName')!;
  const facesEl = document.getElementById('natPopupFaces')!;

  nameEl.textContent = nat.toUpperCase();
  facesEl.innerHTML  = chars.map(c => `
    <div class="nat-face" data-name="${c.name}">
      <div class="nat-face-img">
        <img src="${c.image}" alt="${c.name}"
             style="object-position:${c.facePosition ?? 'top center'}"
             loading="lazy"/>
      </div>
      <span class="nat-face-label">${c.name.split(' ')[0]}</span>
    </div>`).join('');

  facesEl.querySelectorAll<HTMLElement>('.nat-face').forEach(el => {
    el.addEventListener('click', () => {
      const found = chars.find(c => c.name === el.dataset.name);
      if (found) { closePopup(); openCharacterModal(found); }
    });
  });

  popup.classList.add('open');
}

export function initMapInteractive(): void {
  const pinsLayer = document.getElementById('mapPinsLayer')!;
  const mapImg    = document.getElementById('mapImg') as HTMLImageElement;

  function buildPins(natW: number, natH: number): void {
    pinsLayer.innerHTML = '';
    pinsLayer.style.position = 'absolute';
    pinsLayer.style.left     = '0';
    pinsLayer.style.top      = '0';
    pinsLayer.style.width    = natW + 'px';
    pinsLayer.style.height   = natH + 'px';
    pinsLayer.style.transformOrigin = '0 0';
    pinsLayer.style.pointerEvents   = 'none';

    Object.entries(byNat).forEach(([nat, chars]) => {
      const coords = NATMAP[nat];
      if (!coords) return;
      const [xPct, yPct] = coords;

      const pin = document.createElement('div');
      pin.className = 'map-pin';
      pin.style.left = (xPct / 100 * natW) + 'px';
      pin.style.top  = (yPct / 100 * natH) + 'px';
      pin.innerHTML  = `<div class="map-pin-dot"><span class="map-pin-count">${chars.length}</span></div><div class="map-pin-label">${nat}</div>`;
      pin.style.pointerEvents = 'auto';

      pin.addEventListener('click', e => {
        e.stopPropagation();
        openPopup(nat, chars);
      });

      pinsLayer.appendChild(pin);
    });
  }

  function tryBuild(): void {
    if (mapImg.naturalWidth) buildPins(mapImg.naturalWidth, mapImg.naturalHeight);
  }

  mapImg.addEventListener('load', tryBuild);
  if (mapImg.complete && mapImg.naturalWidth) tryBuild();

  // Close popup
  document.getElementById('natPopupClose')!.addEventListener('click', closePopup);
  document.getElementById('mapStage')!.addEventListener('click', e => {
    if (!(e.target as HTMLElement).closest('.map-pin, .nat-popup')) closePopup();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });
}
