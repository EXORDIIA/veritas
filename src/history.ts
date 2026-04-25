import { loreIntro, races, zones, threatLevels } from './data/lore';
import { ZONE_DATA, openPD } from './detail-modal';

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
  Lians:      '/images/LIANS.png',
  Corindians: '/images/CORINDIANS.png',
  Humans:     '/images/HUMANS.png',
  Elves:      '/images/ELFS.png',
  Arciaics:   '/images/ARCAIS.png',
};

export function renderHistory(): void {
  const container = document.getElementById('historyContainer')!;
  container.innerHTML = `
    <div class="hero">
      <h2 class="cinzel">AZERTYA</h2>
      <div class="ornament"></div>
      <div class="tag">The Land of Ruth</div>
    </div>

    <div class="section">
      <h3><span class="shead-sub">Chapter I</span>The Energy of Ruth</h3>
      <div class="prose">
        ${loreIntro.map(p => `<p>${esc(p)}</p>`).join('\n')}
      </div>
    </div>

    <div class="section">
      <h3><span class="shead-sub">Chapter II</span>The Races of Azertya</h3>
      <div class="racegrid">
        ${races.map(r => {
          const img = RACE_IMAGES[r.name];
          return `
          <div class="racecard">
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
      <h3><span class="shead-sub">Chapter III</span>Creatures of Azertya</h3>

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
      <h3><span class="shead-sub">Chapter IV</span>Threat Levels</h3>
      <div class="prose">
        <p>The Azertyan authorities classify all known creatures across ten escalating tiers of threat — from harmless companions to reality-warping entities capable of cosmic destruction.</p>
      </div>
      <div class="threatgrid">
        ${threatLevels.map(t => `
          <div class="threat${threatClass(t.level)}">
            <div class="threat-img-wrap">
              <img class="card-img" src="${t.image}" alt="${esc(t.name)}" loading="lazy"/>
            </div>
            <div class="threat-info">
              <div class="tlvl">Level ${t.level}</div>
              <div class="tname">${esc(t.name)}</div>
              <div class="tdesc">${esc(t.desc)}</div>
            </div>
          </div>`).join('\n')}
      </div>
    </div>
  `;

  container.querySelectorAll<HTMLElement>('.zone-card').forEach(z => {
    z.addEventListener('click', () => openPD(z));
  });
}
