import { NextResponse } from 'next/server';

export async function GET() {
  const nadorData = {
    slug: "nador",
    title: "Nador",
    hero: {
      title: "Nador",
      subtitle: "Perle du Rif Oriental, porte de la Méditerranée",
      image_url: "/images/cities/nador/hero.webp"
    },
    history: [
      {
        id: "antiquite",
        title: "Antiquité",
        text: "Les terres de Nador furent habitées dès l'Antiquité par les tribus berbères du Rif. Les Phéniciens, puis les Romains, établirent des comptoirs commerciaux le long de la côte méditerranéenne. La région, riche en minerais et bénéficiant d'une position stratégique, servait de pont entre l'Afrique du Nord et l'Europe. Des vestiges archéologiques témoignent de cette présence antique, notamment des poteries et des outils datant du IIe siècle avant J.-C."
      },
      {
        id: "moyen-age",
        title: "Moyen-Âge",
        text: "Avec l'arrivée de l'Islam au VIIe siècle, la région se convertit progressivement. Les dynasties almoravide et almohade contrôlent le territoire, développant le commerce transsaharien. Au XIIIe siècle, les Mérinides établissent des fortifications pour protéger les routes commerciales. La région devient un carrefour d'échanges entre l'Andalousie, le Maghreb et l'Afrique subsaharienne. Les tribus rifaines conservent néanmoins une large autonomie."
      },
      {
        id: "epoque-moderne",
        title: "Époque Moderne (XVIe-XVIIIe siècles)",
        text: "Sous les dynasties saadienne puis alaouite, Nador reste une région périphérique mais stratégique. Les corsaires utilisent ses côtes comme base d'opérations en Méditerranée. La découverte de gisements de fer dans les montagnes environnantes attire l'attention des puissances européennes. Les tribus locales, menées par des chefs charismatiques, résistent aux tentatives de centralisation du Makhzen. Cette période voit naître les premières tensions entre le pouvoir central et les populations rifaines."
      },
      {
        id: "protectorat",
        title: "Protectorat Espagnol (1912-1956)",
        text: "En 1912, Nador intègre la zone du Protectorat espagnol du Maroc. L'Espagne développe massivement l'exploitation minière du fer dans les monts de Beni Snassen et du Rif. La ville de Nador est modernisée avec un port, des routes et des infrastructures coloniales. Cependant, cette période est marquée par la résistance rifaine menée par Abdelkrim al-Khattabi (1921-1926), qui établit la République du Rif. Bien que la révolte soit finalement réprimée, elle marque profondément l'identité locale."
      },
      {
        id: "independance",
        title: "Indépendance et Développement (1956-2000)",
        text: "Après l'indépendance en 1956, Nador connaît un développement rapide grâce à ses ressources minières et sa position frontalière avec Melilla. L'exode rural transforme la petite bourgade en ville industrielle. Dans les années 1960-70, de nombreux Nadoris émigrent vers l'Europe, particulièrement les Pays-Bas et l'Allemagne. Ces transferts de fonds contribuent au développement urbain. Le port de Beni Ensar devient un hub commercial important entre le Maroc et l'Europe."
      },
      {
        id: "evenements-recents",
        title: "Nador Moderne (2000-2024)",
        text: "Le XXIe siècle marque un tournant pour Nador avec le lancement de grands projets d'infrastructure. Le complexe portuaire de Nador West Med, inauguré en 2023, positionne la ville comme un hub logistique méditerranéen majeur. L'université Mohammed Premier développe des campus modernes. La ville mise sur le tourisme méditerranéen avec l'aménagement de la lagune de Marchica. Cependant, Nador fait face aux défis de l'immigration clandestine et du développement économique régional équilibré."
      },
      {
        id: "projets-futurs",
        title: "Projets d'Avenir (2025-2030)",
        text: "Nador se prépare à une transformation majeure avec plusieurs projets ambitieux. Le port Nador West Med prévoit d'étendre sa capacité à 5 millions de conteneurs d'ici 2027, renforçant sa position de gateway vers l'Afrique. La future ligne ferroviaire à grande vitesse Casablanca-Nador, prévue pour 2028, révolutionnera la connectivité régionale. Le projet 'Marchica Med' développera 1500 hectares autour de la lagune avec des complexes touristiques durables, un parc technologique et une marina de luxe. L'aéroport Al Aroui bénéficiera d'une extension pour accueillir 3 millions de passagers annuels. Enfin, la zone économique spéciale de Nador attirera les investissements dans les énergies renouvelables et les technologies vertes, positionnant la ville comme pionnier de la transition écologique au Maroc."
      }
    ],
    quiz: [
      {
        id: 1,
        question: "Quelles civilisations antiques ont établi des comptoirs commerciaux dans la région de Nador ?",
        choices: ["Les Grecs et les Byzantins", "Les Phéniciens et les Romains", "Les Carthaginois et les Vandales", "Les Égyptiens et les Nubiens"],
        correct_index: 1,
        explanation: "Les Phéniciens, puis les Romains, établirent des comptoirs commerciaux le long de la côte méditerranéenne, profitant de la position stratégique de la région."
      },
      {
        id: 2,
        question: "À quel siècle l'Islam est-il arrivé dans la région de Nador ?",
        choices: ["VIe siècle", "VIIe siècle", "VIIIe siècle", "IXe siècle"],
        correct_index: 1,
        explanation: "L'Islam est arrivé au VIIe siècle, entraînant la conversion progressive de la région."
      },
      {
        id: 3,
        question: "Quelle dynastie a établi des fortifications pour protéger les routes commerciales au XIIIe siècle ?",
        choices: ["Les Almoravides", "Les Almohades", "Les Mérinides", "Les Saadiens"],
        correct_index: 2,
        explanation: "Les Mérinides établissent des fortifications au XIIIe siècle pour protéger les routes commerciales dans la région."
      },
      {
        id: 4,
        question: "En quelle année Nador intègre-t-elle le Protectorat espagnol du Maroc ?",
        choices: ["1910", "1912", "1914", "1916"],
        correct_index: 1,
        explanation: "En 1912, Nador intègre la zone du Protectorat espagnol du Maroc, marquant le début de la période coloniale."
      },
      {
        id: 5,
        question: "Qui a mené la résistance rifaine et établi la République du Rif entre 1921-1926 ?",
        choices: ["Mohammed V", "Abdelkrim al-Khattabi", "Allal al-Fassi", "Ahmed al-Hiba"],
        correct_index: 1,
        explanation: "Abdelkrim al-Khattabi a mené la résistance rifaine et établi la République du Rif entre 1921 et 1926."
      },
      {
        id: 6,
        question: "Vers quels pays européens de nombreux Nadoris ont-ils émigré dans les années 1960-70 ?",
        choices: ["France et Belgique", "Pays-Bas et Allemagne", "Italie et Espagne", "Suède et Danemark"],
        correct_index: 1,
        explanation: "Dans les années 1960-70, de nombreux Nadoris émigrent vers l'Europe, particulièrement les Pays-Bas et l'Allemagne."
      },
      {
        id: 7,
        question: "Quel est le nom du complexe portuaire moderne inauguré en 2023 ?",
        choices: ["Nador Port", "Beni Ensar Complex", "Nador West Med", "Marchica Port"],
        correct_index: 2,
        explanation: "Le complexe portuaire de Nador West Med, inauguré en 2023, positionne la ville comme un hub logistique méditerranéen majeur."
      },
      {
        id: 8,
        question: "Quel type de minerai a historiquement contribué au développement économique de Nador ?",
        choices: ["L'or", "Le cuivre", "Le fer", "L'argent"],
        correct_index: 2,
        explanation: "L'Espagne a développé massivement l'exploitation minière du fer dans les monts de Beni Snassen et du Rif pendant le protectorat."
      },
      {
        id: 9,
        question: "Comment s'appelle la lagune que Nador développe pour le tourisme méditerranéen ?",
        choices: ["Lagune de Nador", "Lagune de Marchica", "Lagune de Rif", "Lagune de Sebkha"],
        correct_index: 1,
        explanation: "La ville mise sur le tourisme méditerranéen avec l'aménagement de la lagune de Marchica."
      },
      {
        id: 10,
        question: "Vrai ou Faux : Nador était un important carrefour d'échanges entre l'Andalousie, le Maghreb et l'Afrique subsaharienne au Moyen-Âge.",
        choices: ["Vrai", "Faux", "Seulement avec l'Andalousie", "Seulement au XIVe siècle"],
        correct_index: 0,
        explanation: "Vrai. Au Moyen-Âge, la région devient un carrefour d'échanges entre l'Andalousie, le Maghreb et l'Afrique subsaharienne."
      }
    ],
    meta: {
      last_updated: "2024-11-14",
      sources: [
        "Histoire du Maroc - Encyclopédie Universalis",
        "Le Rif marocain - Études historiques",
        "Nador : de la résistance rifaine à la modernité - Archives municipales",
        "Développement portuaire au Maroc - Ministère de l'Équipement",
        "Synthèse interne MarocTour - Sources historiques diverses"
      ]
    }
  };

  return NextResponse.json(nadorData);
}
