import { NextResponse } from 'next/server';

export async function GET() {
  const fesData = {
    slug: "fes",
    title: "Fès",
    hero: {
      title: "Fès",
      subtitle: "Capitale spirituelle et culturelle du Maroc, berceau millénaire de l'érudition islamique",
      image_url: "/images/cities/fes/hero.png"
    },
    history: [
      {
        id: "fondation",
        title: "Fondation par Idris Ier (789)",
        text: "Fès a été fondée en 789 par Idris Ier, fondateur de la dynastie idrisside et descendant du prophète Mahomet. La ville fut établie sur les rives de l'oued Fès, un emplacement stratégique qui permettait de contrôler les routes commerciales entre l'Atlantique et la Méditerranée. Idris Ier choisit ce site pour établir sa capitale, créant ainsi la première ville impériale du Maroc. Sous son règne, Fès devint rapidement un centre religieux et politique majeur, attirant des savants et des artisans de tout le monde musulman."
      },
      {
        id: "idris-ii",
        title: "L'Expansion sous Idris II (808-828)",
        text: "Le fils d'Idris Ier, Idris II, transforma Fès en une véritable métropole. En 808, il fit construire Fès el-Bali (la vieille Fès) sur la rive droite de l'oued. En 818, l'arrivée de 8 000 familles andalouses chassées de Cordoue par les Omeyyades enrichit considérablement la ville. Ces réfugiés apportèrent avec eux leurs savoir-faire en matière d'artisanat, d'architecture et de culture. En 825, 2 000 familles de Kairouan (Tunisie) s'installèrent également à Fès, créant le quartier des Kairouanais. Cette diversité culturelle fit de Fès un creuset unique où se mêlèrent les traditions andalouses, maghrébines et orientales."
      },
      {
        id: "al-quaraouiyine",
        title: "Fondation de l'Université Al Quaraouiyine (859)",
        text: "En 859, Fatima al-Fihriya, une femme pieuse et érudite, fonda la mosquée et l'université Al Quaraouiyine, considérée comme la plus ancienne université du monde encore en activité. Cette institution devint rapidement un centre d'excellence intellectuelle, attirant des étudiants et des savants de tout le monde musulman. L'université enseignait la théologie, le droit islamique, la grammaire, la médecine, les mathématiques et l'astronomie. Des figures illustres comme Ibn Khaldoun, Averroès et Maimonide y étudièrent ou y enseignèrent. Al Quaraouiyine contribua à faire de Fès la capitale intellectuelle et spirituelle du Maghreb."
      },
      {
        id: "age-dor-merinide",
        title: "L'Âge d'Or Mérinide (XIIIe-XVe siècles)",
        text: "Au XIIIe siècle, la dynastie mérinide fit de Fès sa capitale et transforma la ville en un centre intellectuel et artistique de premier plan. Les souverains mérinides construisirent de magnifiques médersas (écoles coraniques) comme la Médersa Bou Inania (1350-1357), la Médersa Attarine (1323-1325) et la Médersa Cherratine (1670). Ces édifices sont de véritables chefs-d'œuvre de l'architecture islamique, avec leurs décors de zellige (carreaux de céramique), leurs plâtres sculptés et leurs boiseries finement travaillées. Cette période vit également l'expansion de l'Université Al Quaraouiyine et l'épanouissement des arts et de l'artisanat. Fès devint alors la ville la plus importante du Maroc, avec une population estimée à 200 000 habitants."
      },
      {
        id: "patrimoine-unesco",
        title: "Patrimoine Mondial UNESCO (1981)",
        text: "En 1981, la médina de Fès fut classée au patrimoine mondial de l'UNESCO, reconnaissant ainsi sa valeur universelle exceptionnelle. La médina de Fès el-Bali, avec ses 9 000 ruelles labyrinthiques, ses 300 mosquées, ses centaines de fondouks (caravansérails) et ses souks animés, constitue l'un des plus vastes ensembles urbains médiévaux du monde. Cette reconnaissance internationale a permis de mobiliser des fonds pour la restauration et la préservation de ce patrimoine unique. Aujourd'hui, Fès est non seulement un musée à ciel ouvert mais aussi une ville dynamique où se perpétuent des traditions artisanales millénaires."
      },
      {
        id: "fes-moderne",
        title: "Fès Aujourd'hui",
        text: "Avec une population de plus d'un million d'habitants, Fès est aujourd'hui la deuxième plus grande ville du Maroc. La ville conserve son rôle de capitale spirituelle et culturelle, tout en s'adaptant aux défis de la modernité. Les tanneries traditionnelles, les poteries bleues, la maroquinerie et la broderie continuent d'attirer des visiteurs du monde entier. Le Festival des Musiques Sacrées du Monde, créé en 1994, rassemble chaque année des artistes et des visiteurs venus des quatre coins du globe. Fès reste un symbole vivant de l'excellence culturelle et intellectuelle du Maroc, préservant son héritage millénaire tout en regardant vers l'avenir."
      }
    ],
    quiz: [
      {
        id: 1,
        question: "Qui a fondé Fès et en quelle année ?",
        choices: ["Idris Ier en 789", "Idris II en 808", "Moulay Idriss en 788", "Hassan Ier en 1873"],
        correct_index: 0,
        explanation: "Fès a été fondée en 789 par Idris Ier, fondateur de la dynastie idrisside et descendant du prophète Mahomet."
      },
      {
        id: 2,
        question: "Qui a fondé l'Université Al Quaraouiyine et en quelle année ?",
        choices: ["Idris II en 808", "Fatima al-Fihriya en 859", "Moulay Idriss en 789", "Abou Inan Faris en 1350"],
        correct_index: 1,
        explanation: "En 859, Fatima al-Fihriya, une femme pieuse et érudite, fonda la mosquée et l'université Al Quaraouiyine, considérée comme la plus ancienne université du monde encore en activité."
      },
      {
        id: 3,
        question: "Combien de ruelles compte approximativement la médina de Fès el-Bali ?",
        choices: ["3 000", "6 000", "9 000", "12 000"],
        correct_index: 2,
        explanation: "La médina de Fès el-Bali compte environ 9 000 ruelles labyrinthiques, ce qui en fait l'un des plus vastes ensembles urbains médiévaux du monde."
      },
      {
        id: 4,
        question: "Quelle dynastie a transformé Fès en capitale et construit les magnifiques médersas ?",
        choices: ["Les Idrissides", "Les Almoravides", "Les Mérinides", "Les Saadiens"],
        correct_index: 2,
        explanation: "Au XIIIe siècle, la dynastie mérinide fit de Fès sa capitale et construisit de magnifiques médersas comme la Médersa Bou Inania et la Médersa Attarine."
      },
      {
        id: 5,
        question: "En quelle année la médina de Fès a-t-elle été classée au patrimoine mondial de l'UNESCO ?",
        choices: ["1975", "1981", "1985", "1991"],
        correct_index: 1,
        explanation: "En 1981, la médina de Fès fut classée au patrimoine mondial de l'UNESCO, reconnaissant ainsi sa valeur universelle exceptionnelle."
      },
      {
        id: 6,
        question: "Quel est le nom des réfugiés andalous qui s'installèrent à Fès en 818 ?",
        choices: ["Les Andalousiens", "Les Cordouans", "Les Omeyyades", "Les 8 000 familles andalouses"],
        correct_index: 3,
        explanation: "En 818, 8 000 familles andalouses chassées de Cordoue par les Omeyyades s'installèrent à Fès, apportant leurs savoir-faire en matière d'artisanat et de culture."
      },
      {
        id: 7,
        question: "Quelle est la célèbre médersa construite par les Mérinides entre 1350 et 1357 ?",
        choices: ["Médersa Attarine", "Médersa Bou Inania", "Médersa Cherratine", "Médersa Ben Youssef"],
        correct_index: 1,
        explanation: "La Médersa Bou Inania, construite entre 1350 et 1357, est l'une des plus belles médersas de Fès et un chef-d'œuvre de l'architecture islamique."
      },
      {
        id: 8,
        question: "Quel artisanat traditionnel est particulièrement réputé à Fès ?",
        choices: ["La poterie rouge", "La poterie bleue de Fès", "La céramique verte", "La faïence blanche"],
        correct_index: 1,
        explanation: "Fès est réputée pour sa poterie bleue, un artisanat traditionnel unique qui utilise des techniques ancestrales et des motifs caractéristiques de la ville."
      },
      {
        id: 9,
        question: "Quel festival culturel majeur se déroule chaque année à Fès depuis 1994 ?",
        choices: ["Festival des Arts Islamiques", "Festival des Musiques Sacrées du Monde", "Festival du Patrimoine", "Festival des Cultures Méditerranéennes"],
        correct_index: 1,
        explanation: "Le Festival des Musiques Sacrées du Monde, créé en 1994, rassemble chaque année des artistes et des visiteurs venus des quatre coins du globe."
      },
      {
        id: 10,
        question: "Vrai ou Faux : L'Université Al Quaraouiyine est considérée comme la plus ancienne université du monde encore en activité.",
        choices: ["Vrai", "Faux", "Seulement au Maroc", "Seulement dans le monde arabe"],
        correct_index: 0,
        explanation: "Vrai. L'Université Al Quaraouiyine, fondée en 859, est considérée comme la plus ancienne université du monde encore en activité, ayant précédé les universités européennes de plusieurs siècles."
      }
    ],
    meta: {
      last_updated: "2024-12-26",
      sources: [
        "Histoire de Fès - Archives de la médina",
        "L'Université Al Quaraouiyine : 12 siècles d'excellence - UNESCO",
        "Fès, ville impériale - Ministère de la Culture",
        "Patrimoine mondial de l'UNESCO - Médina de Fès",
        "Le Maroc médiéval : un empire de l'Afrique à l'Espagne - Musée du Louvre",
        "Synthèse interne MarocTour - Sources historiques diverses"
      ]
    }
  };

  return NextResponse.json(fesData);
}

