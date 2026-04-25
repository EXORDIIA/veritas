import { principles, racialBasic, racialSignature, forbidden } from './data/principles';
import { openPD } from './detail-modal';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const CHEVRON = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" width="12" height="12"><polyline points="4,5 8,10 12,5"/></svg>`;

function principlesHTML(): string {
  return principles.map(p => `
    <div class="pcard"
      data-name="${esc(p.name.toUpperCase())}" data-sub="${esc(p.sub)}"
      data-effect="${esc(p.effect)}" data-usage="${esc(p.usage)}"
      data-badge="N° ${String(p.num).padStart(2, '0')}" data-img="${p.image}">
      <div class="pcard-visual">
        <span class="pnum">${String(p.num).padStart(2, '0')}</span>
        <img class="card-img" src="${p.image}" alt="${esc(p.name)}" loading="lazy"/>
        <div class="pcard-peek">
          <div class="pcard-peek-name">${esc(p.name.toUpperCase())}</div>
          <div class="pcard-peek-sub">${esc(p.sub)}</div>
          <span class="pcard-peek-arrow">${CHEVRON}</span>
        </div>
      </div>
    </div>`).join('\n');
}

function racialHTML(entries: typeof racialBasic, signature: boolean): string {
  const cls   = signature ? 'rcard signature' : 'rcard';
  const badge = signature ? 'Signature' : 'Technique Raciale';
  return entries.map(r => `
    <div class="${cls}"
      data-name="${esc(r.name.toUpperCase())}" data-sub="${esc(r.sub)}"
      data-effect="${esc(r.effect)}" data-usage="${esc(r.usage)}"
      data-race="${esc(r.race)}"
      data-badge="${badge}" data-img="${r.image}">
      <div class="rcard-visual">
        <img class="card-img" src="${r.image}" alt="${esc(r.name)}" loading="lazy"/>
        <div class="rcard-peek">
          <div class="rcard-peek-name">${esc(r.name.toUpperCase())}</div>
          <div class="rcard-peek-sub">${esc(r.sub)} &middot; ${esc(r.race)}</div>
          <span class="rcard-peek-arrow">${CHEVRON}</span>
        </div>
      </div>
    </div>`).join('\n');
}

function forbiddenHTML(): string {
  return forbidden.map(f => `
    <div class="fcard"
      data-name="${esc(f.name.toUpperCase())}" data-sub="${esc(f.sub)}"
      data-effect="${esc(f.effect)}" data-usage="${esc(f.usage)}"
      data-drawback="${esc(f.drawback)}"
      data-badge="Technique Interdite" data-img="${f.image}">
      <div class="fcard-visual">
        <img class="card-img" src="${f.image}" alt="${esc(f.name)}" loading="lazy"/>
        <div class="fcard-peek">
          <div class="fcard-peek-name">${esc(f.name.toUpperCase())}</div>
          <div class="fcard-peek-sub">${esc(f.sub)}</div>
          <span class="fcard-peek-arrow">${CHEVRON}</span>
        </div>
      </div>
    </div>`).join('\n');
}

export function initPrinciples(): void {
  const container = document.getElementById('principlesContainer')!;
  container.innerHTML = `
    <div class="hero">
      <h2 class="cinzel">RUTH</h2>
      <div class="ornament"></div>
      <div class="tag">Principles of Power</div>
    </div>

    <div class="section">
      <h3><span class="shead-sub">Part I</span>The Twenty-Eight Principles</h3>
      <div class="prose">
        <p>Over centuries, Azertya's scholars catalogued the usable forms of Ruth. Each principle is a crystallized technique, learnable by the gifted, refined by the dedicated, and revered by all.</p>
      </div>
      <div class="pgrid">${principlesHTML()}</div>
    </div>

    <div class="section">
      <h3><span class="shead-sub">Part II</span>Racial Techniques &mdash; Basic</h3>
      <div class="prose">
        <p>Each race carries within its blood a foundational technique, passed through generations as a birthright of lineage.</p>
      </div>
      <div class="racialgrid">${racialHTML(racialBasic, false)}</div>
    </div>

    <div class="section">
      <h3><span class="shead-sub">Part III</span>Racial Signature Techniques</h3>
      <div class="prose">
        <p>Few masters ever reach the final manifestation of their racial gift. Those who do become legends, remembered long after their flame has been extinguished.</p>
      </div>
      <div class="racialgrid">${racialHTML(racialSignature, true)}</div>
    </div>

    <div class="section">
      <h3><span class="shead-sub">Part IV</span>The Three Forbidden Principles</h3>
      <div class="prose">
        <p style="color:#ff9c95;font-style:italic">Whispered in the ruined temples, carved into sealed vaults, the three forbidden principles demand a price no sane being should pay. Their use is punished by death on sight across all civilized nations of Azertya.</p>
      </div>
      <div class="forbidden">${forbiddenHTML()}</div>
    </div>
  `;

  container.querySelectorAll<HTMLElement>('.pcard,.rcard,.fcard').forEach(c => {
    c.addEventListener('click', () => openPD(c));
  });
}
