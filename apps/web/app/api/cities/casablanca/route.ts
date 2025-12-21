import { NextResponse } from 'next/server';

export async function GET() {
  const casablancaData = {
    slug: "casablanca",
    title: "Casablanca",
    hero: {
      title: "Casablanca",
      subtitle: "Capitale économique du Maroc, métropole cosmopolite",
      image_url: "/images/cities/casablanca.jpg"
    },
    history: [
      {
        id: "origines",
        title: "Origines et Antiquité",
        text: "L'histoire de Casablanca remonte à l'époque berbère où un petit village de pêcheurs portait le nom d'Anfa. Les Phéniciens et les Romains établirent des comptoirs commerciaux dans cette région côtière stratégique. Au VIIe siècle, avec l'arrivée de l'Islam, Anfa devient un port modeste mais actif. Les navigateurs berbères utilisaient ce port pour le commerce maritime avec l'Afrique de l'Ouest et l'Europe méridionale."
      },
      {
        id: "moyen-age",
        title: "Moyen-Âge et Anfa",
        text: "Au XIIIe siècle, sous les Mérinides, Anfa se développe comme port commercial important. La ville devient un repaire de corsaires qui attaquent les navires européens en Atlantique. En 1468, les Portugais, exaspérés par ces raids, détruisent complètement Anfa. La cité reste en ruines pendant près de trois siècles. Ce n'est qu'en 1756 que le sultan Mohammed ben Abdallah reconstruit la ville et la rebaptise 'Dar el-Beida' (Maison Blanche en arabe), que les Espagnols traduiront par 'Casablanca'."
      },
      {
        id: "renaissance",
        title: "Renaissance et Développement (XVIIIe-XIXe siècles)",
        text: "Sous le règne du sultan Sidi Mohammed ben Abdallah, Casablanca renaît de ses cendres. Le sultan y construit une mosquée, un hammam et une médersa. La ville attire des commerçants de toute la région. Au XIXe siècle, Casablanca devient le principal port marocain pour le commerce de la laine avec l'Europe. Sa population passe de quelques centaines à plusieurs milliers d'habitants. Les consuls européens s'y installent, faisant de Casablanca un carrefour d'échanges entre l'Orient et l'Occident."
      },
      {
        id: "protectorat",
        title: "Protectorat Français (1912-1956)",
        text: "En 1907, l'occupation du port de Casablanca par la France marque un tournant. Avec l'établissement du Protectorat français en 1912, le maréchal Lyautey fait de Casablanca la vitrine de la modernité coloniale. L'architecte Henri Prost conçoit un plan d'urbanisme ambitieux séparant la médina traditionnelle de la ville nouvelle européenne. Des boulevards larges, des immeubles art déco et des infrastructures modernes transforment Casablanca en métropole économique. Le port devient le plus important d'Afrique du Nord."
      },
      {
        id: "guerre-mondiale",
        title: "Seconde Guerre Mondiale",
        text: "En novembre 1942, Casablanca joue un rôle crucial lors du débarquement allié 'Opération Torch'. La ville devient une base militaire stratégique pour les forces alliées en Afrique du Nord. En janvier 1943, la Conférence de Casablanca réunit le président américain Franklin D. Roosevelt, le Premier ministre britannique Winston Churchill et le général de Gaulle pour planifier la suite de la guerre. Cet événement place Casablanca sur la scène internationale. Le discours du Sultan Mohammed V en 1947 y marquera le début du mouvement d'indépendance."
      },
      {
        id: "independance",
        title: "Indépendance et Boom Économique (1956-1990)",
        text: "Après l'indépendance en 1956, Casablanca s'affirme comme la capitale économique du Maroc. L'exode rural massif fait exploser la population : de 1 million d'habitants en 1956 à plus de 3 millions en 1990. Des quartiers industriels se développent (Aïn Sebaâ, Roches Noires). Le port s'étend considérablement. La ville concentre les sièges des grandes entreprises, des banques et des industries. Cependant, cette croissance rapide crée aussi des bidonvilles en périphérie, témoins des inégalités sociales."
      },
      {
        id: "modernisation",
        title: "Modernisation (1990-2024)",
        text: "Les années 1990-2000 voient l'émergence de grands projets structurants. En 1993, la Mosquée Hassan II, plus grande mosquée du Maroc avec son minaret de 210 mètres, est inaugurée. Elle devient le symbole de Casablanca moderne. Les quartiers d'affaires (Twin Center, Casablanca Finance City) transforment la skyline. Le tramway, inauguré en 2012, modernise les transports. La Marina, les centres commerciaux géants (Morocco Mall) et la rénovation de la Corniche positionnent Casablanca comme métropole méditerranéenne du XXIe siècle."
      },
      {
        id: "avenir",
        title: "Projets d'Avenir (2025-2035)",
        text: "Casablanca se projette vers l'avenir avec des projets ambitieux. La Casablanca Finance City vise à devenir le premier hub financier africain, attirant banques et multinationales. Le projet Casa Port transformera l'ancien port en quartier culturel et résidentiel de luxe. L'extension du tramway (lignes T3 et T4) et le projet de métro amélioreront la mobilité urbaine. La ville investit massivement dans les énergies renouvelables et la smart city avec des projets d'éclairage intelligent, de gestion des déchets high-tech et de végétalisation urbaine. L'objectif : devenir une métropole durable et connectée, modèle pour l'Afrique."
      }
    ],
    quiz: [
      {
        id: 1,
        question: "Quel était le nom originel de Casablanca à l'époque berbère ?",
        choices: ["Dar el-Beida", "Anfa", "Casa Blanca", "Al-Bayda"],
        correct_index: 1,
        explanation: "Casablanca s'appelait Anfa à l'origine, un petit village de pêcheurs berbères."
      },
      {
        id: 2,
        question: "En quelle année les Portugais ont-ils détruit Anfa ?",
        choices: ["1415", "1468", "1492", "1515"],
        correct_index: 1,
        explanation: "En 1468, les Portugais détruisent complètement Anfa en représailles aux raids des corsaires."
      },
      {
        id: 3,
        question: "Quel sultan a reconstruit Casablanca en 1756 et lui a donné le nom de 'Dar el-Beida' ?",
        choices: ["Moulay Ismail", "Mohammed ben Abdallah", "Hassan I", "Moulay Slimane"],
        correct_index: 1,
        explanation: "Le sultan Mohammed ben Abdallah a reconstruit la ville en 1756 et l'a rebaptisée 'Dar el-Beida' (Maison Blanche)."
      },
      {
        id: 4,
        question: "Quel architecte français a conçu le plan d'urbanisme de Casablanca moderne sous le Protectorat ?",
        choices: ["Le Corbusier", "Henri Prost", "Auguste Perret", "Tony Garnier"],
        correct_index: 1,
        explanation: "Henri Prost a conçu le plan d'urbanisme ambitieux de Casablanca sous l'impulsion du maréchal Lyautey."
      },
      {
        id: 5,
        question: "Quelle opération militaire alliée a impliqué Casablanca en novembre 1942 ?",
        choices: ["Opération Overlord", "Opération Torch", "Opération Husky", "Opération Market Garden"],
        correct_index: 1,
        explanation: "L'Opération Torch, le débarquement allié en Afrique du Nord, a impliqué Casablanca en novembre 1942."
      },
      {
        id: 6,
        question: "Quels dirigeants se sont rencontrés à la Conférence de Casablanca en janvier 1943 ?",
        choices: ["Roosevelt, Churchill, de Gaulle", "Roosevelt, Staline, Churchill", "Eisenhower, Pétain, Churchill", "Truman, Attlee, de Gaulle"],
        correct_index: 0,
        explanation: "Roosevelt, Churchill et de Gaulle se sont rencontrés à Casablanca en janvier 1943 pour planifier la suite de la guerre."
      },
      {
        id: 7,
        question: "Quelle est la hauteur du minaret de la Mosquée Hassan II ?",
        choices: ["150 mètres", "180 mètres", "210 mètres", "250 mètres"],
        correct_index: 2,
        explanation: "Le minaret de la Mosquée Hassan II mesure 210 mètres de hauteur, ce qui en fait l'un des plus hauts du monde."
      },
      {
        id: 8,
        question: "En quelle année le tramway de Casablanca a-t-il été inauguré ?",
        choices: ["2008", "2010", "2012", "2015"],
        correct_index: 2,
        explanation: "Le tramway de Casablanca a été inauguré en 2012, modernisant ainsi les transports en commun de la ville."
      },
      {
        id: 9,
        question: "Quel projet vise à transformer Casablanca en premier hub financier africain ?",
        choices: ["Morocco Business Center", "Casablanca Finance City", "African Financial Hub", "Casa Economy Zone"],
        correct_index: 1,
        explanation: "La Casablanca Finance City vise à faire de la ville le premier hub financier du continent africain."
      },
      {
        id: 10,
        question: "Quel produit était principalement exporté de Casablanca au XIXe siècle vers l'Europe ?",
        choices: ["Les épices", "La laine", "Les tapis", "Les agrumes"],
        correct_index: 1,
        explanation: "Au XIXe siècle, Casablanca était le principal port marocain pour le commerce de la laine avec l'Europe."
      }
    ],
    meta: {
      last_updated: "2024-12-19",
      sources: [
        "Histoire du Maroc - Encyclopédie Universalis",
        "Casablanca : de l'Anfa berbère à la métropole moderne - Archives municipales",
        "Le Protectorat français au Maroc - Études historiques",
        "La Conférence de Casablanca - Archives diplomatiques",
        "Casablanca Finance City - Documentation officielle"
      ]
    }
  };

  return NextResponse.json(casablancaData);
}

