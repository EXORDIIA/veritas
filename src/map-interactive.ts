import { characters, type Character } from './data/characters';
import { openCharacterModal } from './characters';
import { flyTo } from './map';

// Calibrated positions as % of MAP.png natural dimensions (measured from image)
const PINMAP: Record<string, [number, number]> = {
  'Nahr':            [ 9.0, 33.0],
  'Santia':          [11.0, 44.0],
  'Air':             [ 6.0, 54.0],
  'Yhick':           [12.0, 57.0],
  'Alkyrta':         [15.0, 74.0],
  "Hun'ai":          [ 6.0, 71.0],
  'Yidu':            [ 5.0,  9.0],
  'Aaube':           [23.0, 53.0],
  'Taqqiq Triangle': [32.0, 53.0],
  'Gora':            [33.0, 70.0],
  'Naygen':          [44.0, 47.0],
  'Bari':            [49.0, 54.0],
  'Yinggai':         [37.0, 26.0],
  'Iowha':           [48.0, 31.0],
  'Korenas':         [27.0, 12.0],
  'Frea':            [83.0, 45.0],
  'Yharien':         [74.0, 58.0],
  'Herya':           [68.0, 69.0],
  'Skyvet':          [91.0, 52.0],
  'Avik':            [91.0, 74.0],
  'Aster':           [91.0, 19.0],
  'Iren':            [94.0, 35.0],
  'Astria':          [82.0, 10.0],
  'Corinda':         [95.0, 71.0],
  'Sedna':           [ 3.0, 58.0],
  'Isete':           [10.0, 70.0],
};

// Group characters by nationality
const byNat: Record<string, Character[]> = {};
characters.forEach(c => {
  if (c.nationality && PINMAP[c.nationality]) {
    (byNat[c.nationality] ??= []).push(c);
  }
});

let activePinEl: HTMLElement | null = null;

function setActivePin(el: HTMLElement | null): void {
  activePinEl?.classList.remove('pin-highlight');
  activePinEl = el;
  activePinEl?.classList.add('pin-highlight');
}

function closePopup(): void {
  document.getElementById('natPopup')!.classList.remove('open');
  setActivePin(null);
  document.querySelectorAll<HTMLElement>('.nat-list-item').forEach(i => i.classList.remove('active'));
}

function openPopup(nat: string, chars: Character[], pinEl: HTMLElement): void {
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

  setActivePin(pinEl);
  popup.classList.add('open');
}

export function initMapInteractive(): void {
  const pinsLayer  = document.getElementById('mapPinsLayer')!;
  const mapImg     = document.getElementById('mapImg') as HTMLImageElement;
  const listItems  = document.getElementById('natListItems')!;
  const pinEls: Record<string, HTMLElement> = {};

  function buildPins(natW: number, natH: number): void {
    pinsLayer.innerHTML = '';
    // pinsLayer is now inside mapStage — same coordinate space as mapImg
    pinsLayer.style.cssText = `position:absolute;left:0;top:0;width:${natW}px;height:${natH}px;transform-origin:0 0;pointer-events:none`;

    // Sort nations by character count desc for the list
    const sorted = Object.entries(byNat).sort((a, b) => b[1].length - a[1].length);

    sorted.forEach(([nat, chars]) => {
      const coords = PINMAP[nat];
      if (!coords) return;
      const [xPct, yPct] = coords;

      // Pin on map
      const pin = document.createElement('div');
      pin.className = 'map-pin';
      pin.dataset.nat = nat;
      pin.style.left = (xPct / 100 * natW) + 'px';
      pin.style.top  = (yPct / 100 * natH)  + 'px';
      pin.innerHTML  = `<div class="map-pin-dot"><span class="map-pin-count">${chars.length}</span></div><div class="map-pin-label">${nat}</div>`;
      pin.style.pointerEvents = 'auto';
      pin.addEventListener('click', e => { e.stopPropagation(); openPopup(nat, chars, pin); });
      pinsLayer.appendChild(pin);
      pinEls[nat] = pin;
    });

    // Build list
    listItems.innerHTML = sorted.map(([nat, chars]) => `
      <div class="nat-list-item" data-nat="${nat}">
        <span class="nat-list-name">${nat}</span>
        <span class="nat-list-count">${chars.length}</span>
      </div>`).join('');

    listItems.querySelectorAll<HTMLElement>('.nat-list-item').forEach(el => {
      el.addEventListener('click', () => {
        const nat = el.dataset.nat!;
        const coords = PINMAP[nat];
        if (!coords) return;

        // Highlight list item
        listItems.querySelectorAll('.nat-list-item').forEach(i => i.classList.remove('active'));
        el.classList.add('active');

        // Fly to pin + open popup
        flyTo(coords[0], coords[1], 2.5);
        const pin = pinEls[nat];
        if (pin && byNat[nat]) openPopup(nat, byNat[nat], pin);
      });
    });
  }

  function tryBuild(): void {
    if (mapImg.naturalWidth) buildPins(mapImg.naturalWidth, mapImg.naturalHeight);
  }

  mapImg.addEventListener('load', tryBuild);
  if (mapImg.complete && mapImg.naturalWidth) tryBuild();

  document.getElementById('natPopupClose')!.addEventListener('click', closePopup);
  document.getElementById('mapStage')!.addEventListener('click', e => {
    if (!(e.target as HTMLElement).closest('.map-pin, .nat-popup')) closePopup();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });
}
