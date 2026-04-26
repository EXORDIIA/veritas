import { characters, type Character } from './data/characters';
import { openCharacterModal } from './characters';
import { flyTo } from './map';

// Calibrated positions as % of MAP.png natural dimensions (measured from image)
const PINMAP: Record<string, [number, number]> = {
  'Nahr':            [ 7.0, 42.0],
  'Santia':          [ 9.0, 56.0],
  'Air':             [ 4.0, 62.0],
  'Yhick':           [17.0, 62.0],
  'Alkyrta':         [17.0, 76.0],
  "Hun'ai":          [ 8.0, 75.0],
  'Yidu':            [ 4.0, 10.0],
  'Aaube':           [23.0, 62.0],
  'Taqqiq Triangle': [30.0, 61.0],
  'Gora':            [31.0, 72.0],
  'Naygen':          [64.0, 79.0],
  'Bari':            [47.0, 58.0],
  'Yinggai':         [36.0, 28.0],
  'Iowha':           [48.0, 35.0],
  'Korenas':         [25.0, 17.0],
  'Frea':            [84.0, 48.0],
  'Yharien':         [74.0, 55.0],
  'Herya':           [67.0, 75.0],
  'Skyvet':          [93.0, 52.0],
  'Avik':            [92.0, 77.0],
  'Aster':           [91.0, 22.0],
  'Iren':            [96.0, 40.0],
  'Astria':          [83.0, 14.0],
  'Corinda':         [95.0, 72.0],
  'Sedna':           [ 4.0, 63.0],
  'Isete':           [13.0, 68.0],
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
