import { characters, type Character } from './data/characters';
import { getString } from './i18n';

const grid = document.getElementById('grid')!;
const cnt  = document.getElementById('cnt')!;
const ov   = document.getElementById('ov')!;

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

export function render(list: Character[]): void {
  cnt.textContent = String(list.length);
  grid.innerHTML = '';
  if (!list.length) {
    grid.innerHTML = `<div class="nr">${getString('no_results')}</div>`;
    return;
  }
  list.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText = `animation:cardIn .5s var(--ease,cubic-bezier(.16,1,.3,1)) both;animation-delay:${i % 20 * 38}ms`;
    const pos = c.facePosition ?? 'top center';
    card.innerHTML = `<div class="ciw"><img src="${c.image}" alt="${c.name}" style="object-position:${pos}" loading="lazy"/></div><div class="cb"><div class="cn">${c.name}</div></div>`;
    card.addEventListener('click', () => openModal(c));
    grid.appendChild(card);
  });
}

function setField(id: string, value: string | undefined): void {
  const el = document.getElementById(id);
  if (el) el.textContent = (value && value.trim()) ? value : '—';
}

function openModal(c: Character): void {
  const mi = document.getElementById('mi') as HTMLImageElement;
  mi.src = c.image;
  mi.style.objectPosition = c.facePosition ?? 'top center';
  document.getElementById('mn')!.textContent = c.name;

  setField('mAge',    c.age);
  setField('mBlood',  c.bloodType);
  setField('mHeight', c.height && c.height !== 'X' ? `${c.height} cm` : c.height);
  setField('mNat',    c.nationality);
  setField('mRace',   c.race);
  setField('mPower',  c.specialty || getString('modal_power_default'));

  const chapEl = document.getElementById('mChap')!;
  chapEl.textContent = c.firstChapter
    ? `${getString('modal_chap_prefix')} ${c.firstChapter}`
    : getString('modal_chap_default');

  // Map preview — use mapImg.src which is already resolved by the browser
  const coords  = c.nationality ? NATMAP[c.nationality] : undefined;
  const mapRow  = document.getElementById('mMapRow')!;
  const mapBg   = document.getElementById('mMapBg') as HTMLElement;
  const mapLbl  = document.getElementById('mMapLbl') as HTMLElement;
  const mapImgEl = document.getElementById('mapImg') as HTMLImageElement | null;
  const mapSrc   = mapImgEl?.src;
  if (coords && mapSrc) {
    mapBg.style.backgroundImage    = `url(${mapSrc})`;
    mapBg.style.backgroundPosition = `${coords[0]}% ${coords[1]}%`;
    mapLbl.textContent = c.nationality!;
    mapRow.style.display = '';
  } else {
    mapRow.style.display = 'none';
  }

  ov.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(): void {
  ov.classList.remove('open');
  document.body.style.overflow = '';
}

export function initCharacters(): void {
  const srch = document.getElementById('srch') as HTMLInputElement;
  srch.addEventListener('input', () => {
    const q = srch.value.toLowerCase().trim();
    render(q ? characters.filter(c => c.name.toLowerCase().includes(q)) : characters);
  });

  ov.addEventListener('click', e => { if (e.target === ov) closeModal(); });
  document.getElementById('closeModal')!.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  render(characters);
}
