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
}

export const zones: Zone[] = [
  { cls: "green",  name: "Green Zone",  desc: "Habitable territories with low-level creatures (Level 1-2). Safe for everyday life, agriculture and trade." },
  { cls: "yellow", name: "Yellow Zone", desc: "Monitored wildlands with moderate threats. Travelers are advised to move in groups and stay on patrolled routes." },
  { cls: "orange", name: "Orange Zone", desc: "Unstable or partially explored regions. Access requires official permits and expedition teams trained in Ruth combat." },
  { cls: "red",    name: "Red Zone",    desc: "Highly dangerous and mostly uncharted. Only elite hunters and sanctioned military units venture here, and many do not return." },
  { cls: "black",  name: "Black Zone",  desc: "Forbidden territories. Entire expeditions have vanished without trace. The truth of what dwells there is a state secret." },
];

export interface ThreatLevel {
  level: number;
  name: string;
  desc: string;
  image: string;
}

export const threatLevels: ThreatLevel[] = [
  { level: 1,  name: "Peaceful",           desc: "Harmless and friendly creatures. Often companions or livestock.",                                           image: "/Zones/PEACFUL.png" },
  { level: 2,  name: "Approachable",       desc: "Generally harmless but may react defensively if provoked.",                                                image: "/Zones/APPROCHABLE.png" },
  { level: 3,  name: "Wary (Aniere)",      desc: "Unpredictable, not naturally aggressive, but potentially lethal if cornered.",                              image: "/Zones/ANIERE.png" },
  { level: 4,  name: "Sylph",              desc: "Potentially dangerous with erratic behavior. Trained handlers only.",                                       image: "/Zones/SYLPH.png" },
  { level: 5,  name: "Perils",             desc: "Hostile and dangerous. A direct threat to human life.",                                                     image: "/Zones/PERILS.png" },
  { level: 6,  name: "Unstable",           desc: "Major threat capable of large-scale destruction.",                                                          image: "/Zones/INSTABLE.png" },
  { level: 7,  name: "Thanatos",           desc: "Ancient catastrophic entities with incomprehensible powers.",                                               image: "/Zones/THANATHOS.png" },
  { level: 8,  name: "Faraday",            desc: "Highly classified. Used by governments, born from secret experimentation.",                                 image: "/Zones/FARADAY.png" },
  { level: 9,  name: "Tyrants",            desc: "Among the most powerful. Can manipulate matter and inhabit bodies.",                                        image: "/Zones/TYRAN.png" },
  { level: 10, name: "Erebus",             desc: "Only 2 known specimens. Capable of warping dimensions and realities themselves.",                            image: "/Zones/ERBUS.png" },
];
