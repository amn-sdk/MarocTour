export type KenitraQuestion = {
  id: number;
  question: string;
  choices: string[];
  correct_index: number;
  explanation: string;
};

export const kenitraQuestions: KenitraQuestion[] = [
  {
    id: 1,
    question: "Quelle rivière traverse Kénitra ?",
    choices: ["Oued Sebou", "Oued Oum Er-Rbia", "Oued Tensift", "Oued Bou Regreg"],
    correct_index: 0,
    explanation: "Kénitra est située sur l’oued Sebou, un axe majeur du Gharb."
  },
  {
    id: 2,
    question: "Kénitra appartient à quelle région administrative ?",
    choices: ["Rabat-Salé-Kénitra", "Casablanca-Settat", "Fès-Meknès", "Oriental"],
    correct_index: 0,
    explanation: "Kénitra fait partie de la région Rabat‑Salé‑Kénitra."
  },
  {
    id: 3,
    question: "Quelle plage se trouve à proximité immédiate de Kénitra ?",
    choices: ["Mehdia", "Taghazout", "Martil", "Saïdia"],
    correct_index: 0,
    explanation: "La plage de Mehdia est la plus connue près de Kénitra."
  },
  {
    id: 4,
    question: "Quelle grande forêt borde l’aire urbaine de Kénitra ?",
    choices: ["Forêt de la Mamora", "Forêt de Bouskoura", "Forêt de Maâmora", "Forêt de Témara"],
    correct_index: 0,
    explanation: "La forêt de la Mamora (Maâmora) est l’un des plus grands massifs de chênes-lièges au monde."
  },
  {
    id: 5,
    question: "Quel secteur s’est fortement développé à Kénitra ces dernières années ?",
    choices: ["Industrie", "Pêche hauturière", "Tourisme de montagne", "Agrumiculture uniquement"],
    correct_index: 0,
    explanation: "Kénitra s’est affirmée comme pôle industriel, tout en gardant une base agricole."
  },
  {
    id: 6,
    question: "Quel atout de mobilité structure le développement de Kénitra ?",
    choices: [
      "Axe ferroviaire et autoroutier nord‑sud",
      "Téléphérique urbain",
      "Port de croisière",
      "Aéroport international dédié"
    ],
    correct_index: 0,
    explanation: "La ville est positionnée sur un axe ferroviaire/autoroutier stratégique."
  },
  {
    id: 7,
    question: "Quelle appellation correspond à la côte proche de Kénitra ?",
    choices: ["Atlantique", "Méditerranée", "Sahara", "Rif"],
    correct_index: 0,
    explanation: "Kénitra est proche de l’océan Atlantique."
  },
  {
    id: 8,
    question: "Quel lieu naturel se situe à l’embouchure de l’oued Sebou ?",
    choices: [
      "Zone lagunaire et embouchure de Mehdia",
      "Dunes de Merzouga",
      "Parc de Tazekka",
      "Vallée du Dadès"
    ],
    correct_index: 0,
    explanation: "À Mehdia, l’embouchure du Sebou forme un espace naturel apprécié."
  }
];


