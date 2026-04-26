import { characters, type Character } from './data/characters';
import { openCharacterModal } from './characters';
import { flyTo } from './map';

// Calibrated positions as % of MAP.png natural dimensions (measured from image)
const PINMAP: Record<string, [number, number]> = {
  'Nahr':            [14.0, 28.0],
  'Santia':          [13.0, 44.0],
  'Air':             [ 8.0, 52.0],
  'Yhick':           [18.0, 53.0],
  'Alkyrta':         [19.0, 70.0],
  "Hun'ai":          [10.0, 68.0],
  'Yidu':            [ 4.0,  8.0],
  'Aaube':           [28.0, 59.0],
  'Taqqiq Triangle': [36.0, 55.0],
  'Gora':            [34.0, 65.0],
  'Naygen':          [65.0, 73.0],
  'Bari':            [51.0, 52.0],
  'Yinggai':         [47.0, 17.0],
  'Iowha':           [47.0, 25.0],
  'Korenas':         [27.0, 10.0],
  'Frea':            [83.0, 37.0],
  'Yharien':         [71.0, 52.0],
  'Herya':           [68.0, 69.0],
  'Skyvet':          [92.0, 44.0],
  'Avik':            [91.0, 72.0],
  'Aster':           [87.0, 21.0],
  'Iren':            [95.0, 28.0],
  'Astria':          [80.0,  9.0],
  'Corinda':         [95.0, 66.0],
  'Sedna':           [ 4.0, 56.0],
  'Isete':           [13.0, 61.0],
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
