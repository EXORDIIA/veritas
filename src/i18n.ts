const STRINGS = {
  fr: {
    brand_sub: 'Univers Azertya',
    tab_chars: 'Personnages', tab_map: 'Carte', tab_lore: 'Histoire', tab_principles: 'Principes de Ruth',
    search_ph: 'Rechercher...',
    splash_btn: '&#9654;&ensp;Entrer dans l\'univers',
    map_hint: 'Molette : zoom &middot; Glisser : déplacer &middot; Double-clic : recentrer',
    modal_mover: 'Personnage', modal_blood: 'Groupe Sanguin', modal_height: 'Taille',
    modal_nat: 'Nationalité', modal_power_lbl: 'Spécialité / Pouvoir',
    modal_region: 'Région sur la carte',
    modal_close: 'Fermer',
    modal_power_default: 'Non renseigné',
    modal_chap_default: 'Chapitre —',
    modal_chap_prefix: 'Chapitre',
    pd_effect: 'Effet', pd_usage: 'Utilisation', pd_drawback: 'Inconvénient',
    no_results: 'Aucun personnage trouvé',
    music_stop: 'Stopper la musique', music_play: 'Reprendre la musique',
    theme_dark: 'Mode sombre', theme_light: 'Mode clair',
  },
  en: {
    brand_sub: 'Universe of Azertya',
    tab_chars: 'Characters', tab_map: 'Map', tab_lore: 'Lore', tab_principles: 'Principles of Ruth',
    search_ph: 'Search...',
    splash_btn: '&#9654;&ensp;Enter the Universe',
    map_hint: 'Scroll: zoom &middot; Drag: move &middot; Double-click: reset',
    modal_mover: 'Character', modal_blood: 'Blood Type', modal_height: 'Height',
    modal_nat: 'Nationality', modal_power_lbl: 'Specialty / Power',
    modal_region: 'Region on Map',
    modal_close: 'Close',
    modal_power_default: 'Unknown',
    modal_chap_default: 'Chapter —',
    modal_chap_prefix: 'Chapter',
    pd_effect: 'Effect', pd_usage: 'Usage', pd_drawback: 'Drawback',
    no_results: 'No character found',
    music_stop: 'Stop music', music_play: 'Resume music',
    theme_dark: 'Dark mode', theme_light: 'Light mode',
  },
} as const;

type Lang = keyof typeof STRINGS;
type StringKey = keyof typeof STRINGS.fr;

export let currentLang: Lang = (() => {
  try { return (localStorage.getItem('lang') as Lang) || 'fr'; } catch { return 'fr'; }
})();

export function getString(key: StringKey): string {
  return STRINGS[currentLang][key] as string;
}

export function setLang(lang: Lang): void {
  currentLang = lang;
  try { localStorage.setItem('lang', lang); } catch { /* ignore */ }
  const S = STRINGS[lang];

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n') as StringKey;
    if (S[k] !== undefined) el.textContent = S[k] as string;
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach(el => {
    const k = el.getAttribute('data-i18n-html') as StringKey;
    if (S[k] !== undefined) el.innerHTML = S[k] as string;
  });
  document.querySelectorAll<HTMLInputElement>('[data-i18n-ph]').forEach(el => {
    const k = el.getAttribute('data-i18n-ph') as StringKey;
    if (S[k] !== undefined) el.placeholder = S[k] as string;
  });

  document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
}

export function initI18n(): void {
  document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach(b => {
    b.addEventListener('click', () => setLang(b.dataset.lang as Lang));
  });
  setLang(currentLang);
}
