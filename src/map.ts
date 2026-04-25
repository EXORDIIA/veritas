const mapStage  = document.getElementById('mapStage')     as HTMLElement;
const mapImg    = document.getElementById('mapImg')        as HTMLImageElement;
const zoomInd   = document.getElementById('mzoom')        as HTMLElement;
const pinsLayer = document.getElementById('mapPinsLayer') as HTMLElement;

let mScale = 1, mTX = 0, mTY = 0, mMin = 0.2, mMax = 6, natW = 0, natH = 0;

function applyMap(): void {
  const t = `translate(${mTX}px,${mTY}px) scale(${mScale})`;
  mapImg.style.transform    = t;
  pinsLayer.style.transform = t;
  zoomInd.textContent = Math.round(mScale * 100) + '%';
}

export function getMapState() { return { mTX, mTY, mScale, natW, natH }; }

export function centerMap(): void {
  if (!natW || !natH) return;
  const r = mapStage.getBoundingClientRect();
  const s = Math.min(r.width / natW, r.height / natH) * 0.95;
  mScale = s; mMin = s * 0.4;
  mTX = (r.width - natW * s) / 2;
  mTY = (r.height - natH * s) / 2;
  applyMap();
}

function zoomAt(cx: number, cy: number, factor: number): void {
  const r = mapStage.getBoundingClientRect();
  const px = cx - r.left, py = cy - r.top;
  const newScale = Math.max(mMin, Math.min(mMax, mScale * factor));
  const ratio = newScale / mScale;
  mTX = px - (px - mTX) * ratio;
  mTY = py - (py - mTY) * ratio;
  mScale = newScale;
  applyMap();
}

export function initMap(): void {
  mapImg.addEventListener('load', () => {
    natW = mapImg.naturalWidth;
    natH = mapImg.naturalHeight;
    centerMap();
  });
  if (mapImg.complete && mapImg.naturalWidth) {
    natW = mapImg.naturalWidth;
    natH = mapImg.naturalHeight;
    centerMap();
  }

  mapStage.addEventListener('wheel', e => {
    e.preventDefault();
    zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.15 : 1 / 1.15);
  }, { passive: false });

  let drag = false, lx = 0, ly = 0;
  mapStage.addEventListener('mousedown', e => { drag = true; lx = e.clientX; ly = e.clientY; mapStage.classList.add('grabbing'); });
  window.addEventListener('mouseup', () => { drag = false; mapStage.classList.remove('grabbing'); });
  window.addEventListener('mousemove', e => {
    if (!drag) return;
    mTX += e.clientX - lx; mTY += e.clientY - ly;
    lx = e.clientX; ly = e.clientY;
    applyMap();
  });
  mapStage.addEventListener('dblclick', () => centerMap());

  let tDist = 0, tLX = 0, tLY = 0, tPan = false;
  mapStage.addEventListener('touchstart', e => {
    if (e.touches.length === 1) { tPan = true; tLX = e.touches[0].clientX; tLY = e.touches[0].clientY; }
    else if (e.touches.length === 2) { tPan = false; tDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); }
  }, { passive: true });
  mapStage.addEventListener('touchmove', e => {
    if (e.touches.length === 1 && tPan) {
      mTX += e.touches[0].clientX - tLX; mTY += e.touches[0].clientY - tLY;
      tLX = e.touches[0].clientX; tLY = e.touches[0].clientY;
      applyMap(); e.preventDefault();
    } else if (e.touches.length === 2) {
      const nd = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      if (tDist) {
        const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        zoomAt(cx, cy, nd / tDist);
      }
      tDist = nd; e.preventDefault();
    }
  }, { passive: false });
  mapStage.addEventListener('touchend', () => { tPan = false; tDist = 0; });

  document.getElementById('zin')!.addEventListener('click', () => { const r = mapStage.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, 1.25); });
  document.getElementById('zout')!.addEventListener('click', () => { const r = mapStage.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, 1 / 1.25); });
  document.getElementById('zrst')!.addEventListener('click', () => centerMap());
  window.addEventListener('resize', () => {
    if (document.getElementById('mapPanel')!.classList.contains('active')) centerMap();
  });
}
