// Shared detail modal — used by principles and zones

export const ZONE_DATA: Record<string, { color: string; level: string; name: string; sub: string; effect: string; usage: string }> = {
  'green zone':  { color: '#4caf50', level: 'Threat Level 1-2',  name: 'GREEN ZONE',  sub: 'Safe Territories',      effect: 'Habitable regions where creatures pose little to no threat. Villages, cities, farmlands and trade roads dominate these areas. Creatures here are domesticated, passive or easily avoided. Ruth combat training is not required for daily life.',                                                                                             usage: "Commerce, agriculture, settlement, safe travel. The majority of Azertya's civilian population lives in Green Zones. Most Rutheka academies are located here to ensure safe training conditions." },
  'yellow zone': { color: '#f9c74f', level: 'Threat Level 3-4',  name: 'YELLOW ZONE', sub: 'Monitored Wildlands',   effect: 'Territories with unpredictable or defensive creatures that can be dangerous if provoked or cornered. Most major trade roads cross through Yellow Zones. Patrols are maintained but gaps exist.',                                                                                                                                           usage: 'Monitored travel with caution. Merchant caravans typically hire at least one Ruth-trained escort. Minor expeditions and resource gathering are feasible with proper preparation.' },
  'orange zone': { color: '#f4a261', level: 'Threat Level 5-7',  name: 'ORANGE ZONE', sub: 'Restricted Regions',    effect: 'Unstable or partially explored territories where creatures are actively aggressive and capable of killing seasoned travelers. Environmental hazards compound the danger. Official permits and expedition teams trained in Ruth combat are mandatory.',                                                                                    usage: "High-value resource extraction, ruin exploration, specialized military operations. Orange Zones hold some of Azertya's most sought-after materials and ancient ruins, drawing expeditions despite the significant risk." },
  'red zone':    { color: '#e63946', level: 'Threat Level 8-9',  name: 'RED ZONE',    sub: 'Extreme Danger',        effect: 'Territories where even elite Ruthetkas are at serious risk. Creatures here hunt intelligently, resist conventional techniques, and have claimed entire expeditions. The landscape itself is often corrupted or unstable.',                                                                                                             usage: 'Sanctioned military operations only. Certain exceptional hunters hold permits. Rare materials of extraordinary value are found here, but the death toll among those who seek them is severe. Every entry is treated as a potential one-way mission.' },
  'black zone':  { color: '#222222', level: 'Threat Level 10+',  name: 'BLACK ZONE',  sub: 'Forbidden Territories', effect: "No living expedition has returned with complete information. Entire teams of elite Ruthetkas have vanished without trace. What dwells in the Black Zones is classified at the highest levels of Azertya's governing bodies. Unofficial accounts speak of creatures that dissolve Ruth itself.",                                      usage: 'Entry is forbidden and punishable by exile or death. Even the most powerful Ruthetkas do not attempt Black Zones voluntarily. The few who have entered and returned refuse to speak of what they witnessed.' },
};

export function openPD(card: HTMLElement): void {
  const d = card.dataset;
  const pdOv  = document.getElementById('pdOv')!;
  const imgCol = document.querySelector<HTMLElement>('.pd-img-col')!;

  if (d.color) {
    // Zone: show zone image with colored overlay
    imgCol.style.cssText = '';
    const dot = imgCol.querySelector('.zone-dot-vis');
    if (dot) dot.remove();
    const pdImg = document.getElementById('pdImg') as HTMLImageElement;
    if (d.img) {
      pdImg.src = d.img;
      pdImg.style.display = '';
      pdImg.style.objectFit = 'cover';
      pdImg.style.padding = '0';
      pdImg.style.filter = `brightness(.75) saturate(.9)`;
    } else {
      pdImg.src = ''; pdImg.style.display = 'none';
      imgCol.style.background = `linear-gradient(160deg,${d.color}22 0%,${d.color}55 100%)`;
    }
    document.getElementById('pdBadge')!.textContent = d.level || '';
  } else {
    // Principle / racial / forbidden: show image
    imgCol.style.cssText = '';
    const dot = imgCol.querySelector('.zone-dot-vis');
    if (dot) dot.remove();
    const pdImg = document.getElementById('pdImg') as HTMLImageElement;
    const img   = card.querySelector<HTMLImageElement>('img.card-img');
    if (img?.src) { pdImg.src = img.src; pdImg.style.display = ''; }
    else           { pdImg.src = ''; pdImg.style.display = 'none'; }
    document.getElementById('pdBadge')!.textContent = d.badge || '';
  }

  const raceTag = document.getElementById('pdRaceTag') as HTMLElement;
  if (d.race) { raceTag.textContent = d.race; raceTag.style.display = ''; }
  else raceTag.style.display = 'none';

  document.getElementById('pdName')!.textContent = d.name || '';
  document.getElementById('pdSub')!.textContent  = d.sub  || '';
  document.getElementById('pdEffect')!.textContent = d.effect || '';

  const usageRow = document.getElementById('pdUsageRow')!;
  if (d.usage) { document.getElementById('pdUsage')!.textContent = d.usage; usageRow.style.display = ''; }
  else usageRow.style.display = 'none';

  const dbRow = document.getElementById('pdDrawbackRow')!;
  if (d.drawback) { document.getElementById('pdDrawback')!.textContent = d.drawback; dbRow.style.display = ''; }
  else dbRow.style.display = 'none';

  pdOv.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

export function closePD(e?: Event): void {
  const pdOv = document.getElementById('pdOv')!;
  if (e) {
    const t = e.target as HTMLElement;
    if (t !== pdOv && !t.classList.contains('pd-close')) return;
  }
  // Reset pdImg style on close
  const pdImg = document.getElementById('pdImg') as HTMLImageElement | null;
  if (pdImg) { pdImg.style.objectFit = ''; pdImg.style.padding = ''; pdImg.style.filter = ''; }
  pdOv.style.display = 'none';
  document.body.style.overflow = '';
}

export function initDetailModal(): void {
  document.getElementById('pdOv')!.addEventListener('click', e => closePD(e));
  document.getElementById('pdClose')!.addEventListener('click', () => closePD());
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePD(); });
}
