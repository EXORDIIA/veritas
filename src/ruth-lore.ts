// The Energy of Ruth — dedicated lore tab

const SECTIONS = [
  {
    img: '/Assets/1.png',
    imgAlt: 'The discovery of Ruth',
    title: 'The Discovery',
    text: 'Centuries ago, some of the inhabitants of Azertya discovered a mysterious energy residing within them, known as "Ruth." This revelation marked the beginning of an era of astonishing transformation for a world that was once made up of isolated villages. Though they did not fully understand how it worked, curious individuals and researchers began studying this mysterious force to better grasp its nature.',
  },
  {
    img: '/Assets/2.png',
    imgAlt: 'Tribes and their powers',
    title: 'Tribes & Powers',
    text: 'Over the centuries, these inquisitive minds uncovered that, when properly mastered, Ruth could grant extraordinary—sometimes even supernatural—abilities. Entire villages, now known as tribes, emerged with unique gifts, ranging from the mastery of magic to the transmutation of matter, using Ruth to perform unimaginable feats. Each tribe developed distinct powers and skills, becoming the keepers of traditions, heritage, and specialized knowledge passed down through generations. The learning of these remarkable abilities begins in childhood and continues throughout life, shaping individuals who are both powerful and respectful of their ancestral legacy.',
  },
  {
    img: '/Assets/3.png',
    imgAlt: 'Limits of Ruth',
    title: 'The Limits of Ruth',
    text: 'However, Ruth is not an infinite resource. Excessive use can lead to the user\'s exhaustion, limiting the capabilities of those who rely on it. Rest periods and proper nutrition are required to replenish this vital energy, constantly reminding tribe members of their limits despite their impressive powers.',
  },
  {
    img: '/Assets/4.png',
    imgAlt: 'Oppression of the tribes',
    title: 'Oppression',
    text: 'Unfortunately, not all tribes experienced such glorious fates. After a member of a northern tribe spread terror across Azertya for an entire century, some tribes were oppressed and even exterminated by dominant leaders\' countries like Margua. In response to the perceived threat of uncontrollable powers, strict laws were imposed to regulate the use of Ruth. Those who violated these laws were imprisoned behind massive fortress walls, and the scrolls and books that taught the tribal powers were burned. Some even discovered ways to block the use of Ruth, including through the use of special bracelets.',
  },
  {
    img: '/Assets/5.png',
    imgAlt: 'The tribes in secrecy',
    title: 'Survival in Secrecy',
    text: 'Yet despite these challenges, the descendants of the tribes continue to thrive—often in secrecy—unleashing incredible abilities such as creature summoning, dimensional portals, elemental manipulation, and many more. Their feats, traditions, and mysteries continue to intrigue and inspire those fortunate enough to encounter them in the far corners of Azertya.',
  },
  {
    img: '/Assets/6.png',
    imgAlt: 'The Rutherium schools',
    title: 'The Rutherium',
    text: 'In the world of Azertya, Ruth is a universal and omnipresent energy, accessible to all races. Its core tenets, known as the "Principles of the Rutherium," are techniques taught by Ruth masters, found in ancient manuscripts, or learned within schools known as Rutheriums—hidden centers of knowledge scattered across the world. These techniques are not limited to battle; they are also part of daily life, helping Ruthekas face a wide range of challenges.',
  },
  {
    img: '/Assets/7.png',
    imgAlt: 'Cultural refinement of Ruth',
    title: 'Cultural Identity',
    text: 'Each Rutheka tribe has embraced one or more of these principles, refining them to create techniques unique to their culture and identity. These refined versions reflect each tribe\'s values, beliefs, and way of life, enhancing their uniqueness and expertise in wielding Ruth.',
  },
  {
    img: '/Assets/8.png',
    imgAlt: 'Racial techniques of Ruth',
    title: 'Racial Techniques',
    text: 'Moreover, each race has developed a distinct racial technique, shaped by its history, natural abilities, and its unique bond with Ruth.',
  },
];

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function initRuthLore(): void {
  const container = document.getElementById('ruthloreContainer')!;

  container.innerHTML = `
    <div class="rl-hero">
      <h2 class="cinzel">L'Énergie de Ruth</h2>
      <div class="ornament"></div>
      <div class="tag">The Power That Shapes Azertya</div>
    </div>

    ${SECTIONS.map((s, i) => {
      const imgLeft = i % 2 === 0;
      return `
      <div class="rl-section ${imgLeft ? 'rl-img-left' : 'rl-img-right'}" style="animation-delay:${i * 80}ms">
        <div class="rl-img-wrap">
          <img src="${s.img}" alt="${esc(s.imgAlt)}" loading="lazy"/>
          <div class="rl-img-frame"></div>
        </div>
        <div class="rl-text">
          <h3 class="rl-title cinzel">${esc(s.title)}</h3>
          <div class="rl-divider"></div>
          <p class="rl-body">${esc(s.text)}</p>
        </div>
      </div>`;
    }).join('\n')}
  `;
}
