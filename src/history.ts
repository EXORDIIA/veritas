import { races, zones, threatLevels } from './data/lore';
import { ZONE_DATA } from './detail-modal';

const RESTRICTED_WARNINGS: Record<number, string> = {
  8:  `WARNING — UNAUTHORIZED ACCESS PROHIBITED<br><br>You are not authorized to access this document.<br><br>Any attempt to proceed will be automatically detected, logged, and met with immediate execution under Protocol "Margua."<br>There will be no warning beyond this point. No appeals. No recovery.`,
  10: `CLEARANCE LEVEL: M_XX — ULTRA RESTRICTED<br>Authorization Required: [REDACTED]<br><br>This file contains information classified among the most dangerous ever recorded.<br>Exposure is considered a Level Omega cognitohazard.`,
};

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function threatClass(level: number): string {
  if (level >= 9) return ' t-apoc';
  if (level >= 7) return ' t-extreme';
  if (level >= 5) return ' t-high';
  return '';
}

const RACE_IMAGES: Record<string, string> = {
  Lians:      '/Races/Lians.png',
  Corindians: '/Races/Corndians.png',
  Humans:     '/Races/Humans.png',
  Elves:      '/Races/Elfs.png',
  Arciaics:   '/Races/Arcaics.png',
};

const ZONE_COLORS: Record<string, string> = {
  green: '#4caf50', yellow: '#f9c74f', orange: '#f3722c', red: '#e63946', black: '#444',
};
const ZONE_LEVELS: Record<string, string> = {
  green: 'Threat Level 1–2', yellow: 'Threat Level 3–4', orange: 'Threat Level 5–7', red: 'Threat Level 8–9', black: 'Threat Level 10+',
};

function initZoneModal(): void {
  const ov    = document.getElementById('zoneOv')!;
  const img   = document.getElementById('zoneImg') as HTMLImageElement;
  const name  = document.getElementById('zoneName')!;
  const dot   = document.getElementById('zoneDot') as HTMLElement;
  const level = document.getElementById('zoneLevel')!;
  const desc  = document.getElementById('zoneDesc')!;

  function open(card: HTMLElement) {
    const cls  = ['green','yellow','orange','red','black'].find(c => card.classList.contains(c)) ?? 'green';
    const color = ZONE_COLORS[cls];
    img.src = card.dataset.img ?? '';
    img.alt = card.dataset.name ?? '';
    name.textContent = (card.dataset.name ?? '').toUpperCase();
    dot.style.background = color;
    dot.style.boxShadow  = `0 0 14px ${color}`;
    level.textContent    = ZONE_LEVELS[cls] ?? '';
    level.style.color    = color;
    desc.textContent     = card.dataset.effect ?? '';
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    ov.classList.remove('open');
    document.body.style.overflow = '';
  }

  ov.addEventListener('click', e => { if (e.target === ov) close(); });
  document.getElementById('zoneClose')!.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  document.addEventListener('click', e => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('.zone-card');
    if (card) open(card);
  });
}

function initRaceModal(): void {
  const ov    = document.getElementById('raceOv')!;
  const img   = document.getElementById('raceImg') as HTMLImageElement;
  const name  = document.getElementById('raceName')!;
  const desc  = document.getElementById('raceDesc')!;

  function open(src: string, raceName: string, raceDesc: string) {
    img.src  = src;
    img.alt  = raceName;
    name.textContent = raceName.toUpperCase();
    desc.textContent = raceDesc;
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    ov.classList.remove('open');
    document.body.style.overflow = '';
  }

  ov.addEventListener('click', e => { if (e.target === ov) close(); });
  document.getElementById('raceClose')!.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Store race desc on each card as data attribute during render, then listen
  document.addEventListener('click', e => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('.racecard');
    if (!card) return;
    const cardImg = card.querySelector<HTMLImageElement>('img');
    if (cardImg) open(cardImg.src, card.dataset.raceName ?? '', card.dataset.raceDesc ?? '');
  });
}

export function renderHistory(): void {
  const container = document.getElementById('historyContainer')!;
  container.innerHTML = `
    <div class="hero">
      <h2 class="cinzel">AZERTYA</h2>
      <div class="ornament"></div>
      <div class="tag">The Land of Ruth</div>
    </div>

    <div class="section">
      <h3><span class="shead-sub">Chapter I</span>The Races of Azertya</h3>
      <div class="racegrid">
        ${races.map(r => {
          const img = RACE_IMAGES[r.name];
          return `
          <div class="racecard" data-race-name="${esc(r.name)}" data-race-desc="${esc(r.desc)}">
            ${img ? `<div class="racecard-img"><img src="${img}" alt="${esc(r.name)}"/></div>` : ''}
            <div class="racecard-body"><h4>${esc(r.name)}</h4><p>${esc(r.desc)}</p></div>
          </div>`;
        }).join('\n')}
      </div>
      <div class="repro">
        <strong>Reproduction</strong> &mdash; Cross-race reproduction is possible but rare. Dominance order: Corindian &gt; Human &gt; Elf &gt; Lian &gt; Arciaic.
      </div>
    </div>

    <div class="section">
      <h3><span class="shead-sub">Chapter II</span>Creatures of Azertya</h3>

      <div class="zone-intro">
        <img class="zone-intro-img" src="/Places/0.png" alt="Azertya wilderness" loading="lazy"/>
        <div class="zone-intro-text">
          <p>Azertya is divided into five known zones, each defined by the density and aggressiveness of its creatures. Expeditions, commerce and daily life are all shaped by these boundaries. The governing authorities have implemented a color-coded zone system to assess the relative safety of various regions.</p>
          <p>Beyond the borders of civilization, the land grows increasingly hostile. What begins as rolling hills and familiar trade roads gives way to uncharted wilderness, warped landscapes, and creatures whose very existence defies understanding. Few return from the deeper zones unchanged — if they return at all.</p>
        </div>
      </div>

      <div class="zonegrid">
        ${zones.map(z => {
            const zd = ZONE_DATA[z.name.toLowerCase()];
            return `
          <div class="zone-card ${z.cls}"
            data-name="${esc(zd?.name ?? z.name.toUpperCase())}"
            data-sub="${esc(zd?.sub ?? '')}"
            data-level="${esc(zd?.level ?? '')}"
            data-color="${esc(zd?.color ?? '')}"
            data-img="${z.image}"
            data-effect="${esc(z.fullDesc)}"
            data-usage="${esc(zd?.usage ?? '')}">
            <div class="zone-card-img">
              <img src="${z.image}" alt="${esc(z.name)}" loading="lazy"/>
              <div class="zone-card-overlay"></div>
            </div>
            <div class="zone-card-body">
              <div class="zone-card-header">
                <div class="zonedot"></div>
                <h5>${esc(z.name)}</h5>
              </div>
              <p>${esc(z.desc)}</p>
            </div>
          </div>`;
          }).join('\n')}
      </div>
    </div>

    <div class="section">
      <h3><span class="shead-sub">Chapter III</span>Threat Levels</h3>
      <div class="prose">
        <p>The Azertyan authorities classify all known creatures across ten escalating tiers of threat — from harmless companions to reality-warping entities capable of cosmic destruction.</p>
      </div>
      <div class="threatgrid">
        ${threatLevels.map(t => {
          const warn = RESTRICTED_WARNINGS[t.level];
          const descHtml = warn
            ? `<div class="threat-restricted-warning">${warn}</div>`
            : `<div class="tdesc">${esc(t.desc)}</div>`;
          const extra = warn ? ` data-restricted="${t.level}" data-realdesc="${encodeURIComponent(t.desc)}" data-name="${esc(t.name)}" data-img="${t.image}"` : '';
          return `
          <div class="threat${threatClass(t.level)}"${extra}>
            <div class="threat-img-wrap">
              <img class="card-img" src="${t.image}" alt="${esc(t.name)}" loading="lazy"/>
            </div>
            <div class="threat-info">
              <div class="tlvl">Level ${t.level}</div>
              <div class="tname">${esc(t.name)}</div>
              ${descHtml}
            </div>
          </div>`;
        }).join('\n')}
      </div>
    </div>
  `;

  initZoneModal();
  initRaceModal();
  initRestrictedCards();
}

function initRestrictedCards(): void {
  const container = document.getElementById('historyContainer')!;

  container.querySelectorAll<HTMLElement>('.threat[data-restricted]').forEach(card => {
    card.addEventListener('click', () => {
      const desc  = decodeURIComponent(card.dataset.realdesc!);
      const name  = card.dataset.name!;
      const img   = card.dataset.img!;
      const level = card.dataset.restricted!;
      openRestrictedFlow(desc, name, img, level);
    });
  });

  document.getElementById('threatClose')!.addEventListener('click', () => {
    (document.getElementById('threatOv') as HTMLElement).style.display = 'none';
  });
  document.getElementById('threatOv')!.addEventListener('click', e => {
    if (e.target === document.getElementById('threatOv')) {
      (document.getElementById('threatOv') as HTMLElement).style.display = 'none';
    }
  });
}

function openRestrictedFlow(desc: string, name: string, img: string, level: string): void {
  const ov   = document.getElementById('restrictedOv') as HTMLElement;
  const fill = document.getElementById('restrictedFill') as HTMLElement;

  ov.style.display = 'flex';
  fill.style.transition = 'none';
  fill.style.transform = 'scaleX(1)';

  requestAnimationFrame(() => requestAnimationFrame(() => {
    fill.style.transition = 'transform 3s linear';
    fill.style.transform  = 'scaleX(0)';
  }));

  setTimeout(() => {
    ov.style.display = 'none';
    openThreatDetail(desc, name, img, level);
  }, 3000);
}

function openThreatDetail(desc: string, name: string, img: string, level: string): void {
  const ov = document.getElementById('threatOv') as HTMLElement;
  (document.getElementById('threatDetailImg')    as HTMLImageElement).src         = img;
  (document.getElementById('threatDetailLevel')  as HTMLElement).textContent      = `Level ${level}`;
  (document.getElementById('threatDetailName')   as HTMLElement).textContent      = name;
  (document.getElementById('threatDetailDesc')   as HTMLElement).textContent      = desc;
  ov.style.display = 'flex';
}
