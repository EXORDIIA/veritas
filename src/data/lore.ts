export const loreIntro: string[] = [
  `Centuries ago, some of the inhabitants of Azertya discovered a mysterious energy residing within them, known as "Ruth." Initially subtle and elusive, this power intrigued certain tribes who began to study it. Shamans, sages, and warriors dedicated themselves to understanding its nature.`,
  `Over the centuries, these inquisitive minds uncovered that, when properly mastered, Ruth could grant extraordinary abilities—enhanced reflexes, manipulation of the elements, and even subtle control over the surrounding environment. This mastery transformed those who possessed it into revered figures, capable of protecting their communities, healing the wounded, and leading their people toward prosperity.`,
  `However, Ruth is not an infinite resource. Excessive use can lead to the user's exhaustion, and sometimes even death. Furthermore, not all inhabitants of Azertya are equally attuned to this energy: some are naturally gifted, while others must dedicate themselves to it tirelessly to achieve even a modest level of mastery.`,
  `Unfortunately, not all tribes experienced such glorious fates. After a member of a northern tribe spread terror across Azertya, using Ruth not to protect but to subjugate, fear took hold of the other tribes. Those who had once been admired for their abilities began to be distrusted, then persecuted. Once-united tribes were decimated, their knowledge lost, and their ancestral traditions nearly forgotten.`,
  `Yet despite these challenges, the descendants of the tribes continue to thrive—often in secrecy. They preserve the knowledge of Ruth through hidden teachings and sacred rites, hoping that one day, balance will be restored and Azertya will once again be a land where this mysterious energy is celebrated as a gift, not feared as a threat.`,
];

export interface Race {
  name: string;
  desc: string;
}

export const races: Race[] = [
  { name: "Lians",      desc: "Lians are small in stature, attentive to nature, and not inclined to travel. Some females have wings that allow them to fly short distances. They are excellent healers and prefer peaceful, secluded lives deep within forests." },
  { name: "Corindians", desc: "Imposing and covered in thick skin, Corindians consider themselves superior. According to legends, they come from another world. Their raw strength and resilience place them at the top of the racial dominance order." },
  { name: "Humans",     desc: "The dominant race in Azertya, Humans are distinguished by their curiosity and spirit of innovation. Adaptable and ambitious, they have built most of the great cities and institutions of the continent." },
  { name: "Elves",      desc: "Elves are tall, agile, and endowed with striking beauty. Their smooth skin, long ears, and resistance to disease make them natural aristocrats. They are deeply connected to magic and ancient scholarship." },
  { name: "Arciaics",   desc: "Often mistaken for Corindians, Arciaics form a minority. Their skin ranges from white to violet, and they possess rare abilities tied to dimensional manipulation. Secretive and mistrusted, they live on the fringes of society." },
];

export interface Zone {
  cls: string;
  name: string;
  desc: string;
  image: string;
  fullDesc: string;
}

export const zones: Zone[] = [
  {
    cls: "green",
    name: "Green Zone",
    image: "/Places/Green Zone.png",
    desc: "Habitable areas with low-level creature presence (Level 1-2). Urbanized, peaceful, and well-maintained.",
    fullDesc: "Habitable areas with low-level creature presence (Level 1 or 2). These regions are generally urbanized, peaceful, and well-maintained. Includes main roads, large villages, and fortified cities. Creatures here are domesticated, passive or easily avoided. Ruth combat training is not required for daily life.",
  },
  {
    cls: "yellow",
    name: "Yellow Zone",
    image: "/Places/Yellow Zone.png",
    desc: "Monitored wildlands with moderate threats. Travel in groups is strongly advised.",
    fullDesc: "Monitored wildlands where creature types are known but still pose a moderate threat. Caution is advised, and prolonged exploration is discouraged without proper escort or protection. Most major trade roads cross through Yellow Zones. Merchant caravans typically hire at least one Ruth-trained escort.",
  },
  {
    cls: "orange",
    name: "Orange Zone",
    image: "/Places/Orange Zone.png",
    desc: "Unstable or partially explored regions. Navigation requires permits and armed escort.",
    fullDesc: "Unstable or partially explored regions, often bordering the unknown. Some hostile or mutated species have been identified here. Navigation requires permits and armed escort. Few dare to settle here. Orange Zones hold some of Azertya's most sought-after materials and ancient ruins, drawing expeditions despite the significant risk.",
  },
  {
    cls: "red",
    name: "Red Zone",
    image: "/Places/Red Zone.png",
    desc: "Highly dangerous and mostly uncharted. Entering is strictly forbidden without authorization.",
    fullDesc: "Highly dangerous and mostly uncharted areas. Populated by aggressive, unpredictable, or unclassified creatures. Magic disturbances and sypnic anomalies are frequently reported. Entering is strictly forbidden without authorization. Even elite Ruthetkas are at serious risk — every entry is treated as a potential one-way mission.",
  },
  {
    cls: "black",
    name: "Black Zone",
    image: "/Places/Black Zone.png",
    desc: "Forbidden territories. Entire expeditions have vanished without trace.",
    fullDesc: "Forbidden territories. These are regions where entire expeditions have vanished, and where spatial, magical, or dimensional instability makes survival nearly impossible. Thought to harbor creatures from ancient eras or lost civilizations. Access is strictly prohibited, even for military forces. The few who have entered and returned refuse to speak of what they witnessed.",
  },
];

export interface ThreatLevel {
  level: number;
  name: string;
  desc: string;
  image: string;
}

export const threatLevels: ThreatLevel[] = [
  { level: 1,  name: "Peaceful",        desc: "Harmless and friendly by nature, these creatures pose no threat to the world's inhabitants. They can be approached safely and are often seen as loyal companions or useful helpers. Lians—beings attuned to magical creatures—can tame and summon them with ease.",                                                                                                                                                                                                                         image: "/Zones/PEACFUL.png" },
  { level: 2,  name: "Approachable",    desc: "Generally harmless but may react if provoked or mistreated. Safe to interact with when approached calmly and respectfully. Used for transport or farming; requires moderate training. Can be summoned by skilled Lians under certain conditions.",                                                                                                                                                                                                                               image: "/Zones/APPROCHABLE.png" },
  { level: 3,  name: "Wary (Aniere)",   desc: "Unpredictable and often misunderstood. Not naturally aggressive, but may react unexpectedly. Careful handling is essential to avoid conflict. Tameable by cautious and experienced Lians.",                                                                                                                                                                                                                                                                                     image: "/Zones/ANIERE.png" },
  { level: 4,  name: "Sylph",           desc: "First identified by the researcher Yharien Eustass Sylphe. Potentially dangerous, with erratic or hostile behavior. Approaching requires knowledge and preparation. Summoning is possible, but only for seasoned Lians.",                                                                                                                                                                                                                                                     image: "/Zones/SYLPH.png" },
  { level: 5,  name: "Perils",          desc: "Hostile and dangerous, posing a direct threat to life. They may attack unprovoked and are often difficult to subdue. Some are even capable of limited intelligence, making their behavior highly unpredictable. Due to their aggressive nature, they are generally avoided and kept far from inhabited areas.",                                                                                                                                                                   image: "/Zones/PERILS.png" },
  { level: 6,  name: "Unstable",        desc: "Creatures of this level represent a major threat to the world as a whole. Their overwhelming power and aggression make them nearly impossible to approach or control. They are capable of large-scale destruction and pose a serious risk to all known civilizations in Azertya. Studying them is a top priority for ensuring global safety.",                                                                                                                                    image: "/Zones/INSTABLE.png" },
  { level: 7,  name: "Thanatos",        desc: "Ancient, catastrophic entities whose mere existence threatens the world's balance. They may take various forms and wield incomprehensible powers. Often, the only viable solution is total destruction to prevent devastation on a global scale.",                                                                                                                                                                                                                              image: "/Zones/THANATHOS.png" },
  { level: 8,  name: "Faraday",         desc: "Highly classified and incredibly rare, these creatures are utilized by the ruling government to counter the most extreme threats. Born from advanced scientific experimentation, they are kept far from public reach. Their true nature and capabilities are poorly understood, but they are seen as essential tools for maintaining planetary security.",                                                                                                                          image: "/Zones/FARADAY.png" },
  { level: 9,  name: "Tyrants",         desc: "The most powerful and destructive of all. Possessing both supernatural abilities and brilliant intellect, they are capable of manipulating matter and even inhabiting other bodies to extend their influence. Their elimination is a critical goal to prevent global catastrophe.",                                                                                                                                                                                             image: "/Zones/TYRAN.png" },
  { level: 10, name: "Erebus",          desc: "Only two known specimens have ever existed, known only to a select few. These creatures are capable of warping dimensions and realities, unleashing cosmic-scale destruction. Their emergence threatens the extinction of all life and matter in the universe. Drastic countermeasures must be taken to prevent their manifestation.",                                                                                                                                            image: "/Zones/ERBUS.png" },
];
