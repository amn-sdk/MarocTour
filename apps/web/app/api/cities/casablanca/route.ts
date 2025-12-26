import { NextResponse } from 'next/server';

export async function GET() {
    const casablancaData = {
        slug: "casablanca",
        title: "Casablanca",
        hero: {
            title: "Casablanca",
            subtitle: "La ville blanche, ville de l'audace et poumon économique du Royaume",
            image_url: "/images/cities/casablanca/hero.webp"
        },
        history: [
            {
                id: "anfa",
                title: "L'Ancienne Anfa",
                text: "À l'origine, Casablanca était connue sous le nom d'Anfa, un port florissant fondé par les Berbères au VIIe siècle. La ville servait de carrefour commercial majeur pour les produits agricoles et les tissus. Elle fut un temps une république indépendante de corsaires, ce qui entraîna sa destruction par les Portugais en 1468."
            },
            {
                id: "casa-branca",
                title: "Dar el-Beida et la Renaissance",
                text: "Au XVIIIe siècle, le sultan Sidi Mohammed ben Abdallah reconstruisit la ville sur les ruines d'Anfa et la nomma Dar el-Beida (La Maison Blanche). Il y fit construire une muraille, une mosquée et la célèbre Sqala pour protéger le port. La ville reprit alors son essor commercial avec l'Europe."
            },
            {
                id: "protectorat",
                title: "Le Protectorat et le Plan Lyautey",
                text: "En 1912, avec le début du protectorat français, Casablanca connut une expansion fulgurante. L'architecte Henri Prost conçut un plan d'urbanisme moderne, séparant les quartiers résidentiels des zones industrielles. C'est à cette époque que furent construits les emblématiques immeubles Art Déco et Néo-Mauresques qui font aujourd'hui le charme du centre-ville."
            },
            {
                id: "mosquee-hassan2",
                title: "Le Symbole : La Mosquée Hassan II",
                text: "Inaugurée en 1993, la Mosquée Hassan II est l'un des plus grands édifices religieux au monde. Construite en partie sur la mer, elle possède le minaret le plus haut du monde (210m). Elle symbolise le génie de l'artisanat marocain et la splendeur de l'architecture islamique contemporaine."
            },
            {
                id: "metropole-moderne",
                title: "Casablanca Aujourd'hui",
                text: "Aujourd'hui, Casablanca est une métropole monde, abritant le Casablanca Finance City et le plus grand port d'Afrique du Nord. Ville de tous les contrastes, elle mêle tradition marocaine et modernité occidentale, s'affirmant comme la locomotive économique du pays et un pôle culturel dynamique."
            }
        ],
        quiz: [
            {
                id: 1,
                question: "Quel était le nom originel de Casablanca avant sa reconstruction au XVIIIe siècle ?",
                choices: ["Dar el-Beida", "Anfa", "Casa Branca", "Al-Bayda"],
                correct_index: 1,
                explanation: "Casablanca était connue sous le nom d'Anfa, un port florissant fondé par les Berbères au VIIe siècle, avant sa destruction par les Portugais en 1468."
            },
            {
                id: 2,
                question: "En quelle année les Portugais ont-ils détruit la ville d'Anfa ?",
                choices: ["1415", "1468", "1492", "1515"],
                correct_index: 1,
                explanation: "Les Portugais détruisirent Anfa en 1468 suite aux activités de piraterie qui menaçaient leurs routes commerciales."
            },
            {
                id: 3,
                question: "Qui a reconstruit la ville sur les ruines d'Anfa au XVIIIe siècle ?",
                choices: ["Moulay Ismail", "Sidi Mohammed ben Abdallah", "Hassan Ier", "Moulay Slimane"],
                correct_index: 1,
                explanation: "Le sultan Sidi Mohammed ben Abdallah a reconstruit la ville au XVIIIe siècle et l'a nommée Dar el-Beida (La Maison Blanche)."
            },
            {
                id: 4,
                question: "Quel architecte français a conçu le plan d'urbanisme moderne de Casablanca en 1912 ?",
                choices: ["Le Corbusier", "Henri Prost", "Auguste Perret", "Tony Garnier"],
                correct_index: 1,
                explanation: "Henri Prost a conçu le plan d'urbanisme moderne de Casablanca en 1912, séparant les quartiers résidentiels des zones industrielles."
            },
            {
                id: 5,
                question: "Quelle est la hauteur du minaret de la Mosquée Hassan II ?",
                choices: ["175 mètres", "190 mètres", "210 mètres", "225 mètres"],
                correct_index: 2,
                explanation: "Le minaret de la Mosquée Hassan II mesure 210 mètres, ce qui en fait le minaret le plus haut du monde."
            },
            {
                id: 6,
                question: "En quelle année la Mosquée Hassan II a-t-elle été inaugurée ?",
                choices: ["1989", "1993", "1995", "1999"],
                correct_index: 1,
                explanation: "La Mosquée Hassan II a été inaugurée en 1993. C'est l'un des plus grands édifices religieux au monde, construite en partie sur la mer."
            },
            {
                id: 7,
                question: "Quel style architectural caractérise le centre-ville de Casablanca construit dans les années 1920-1930 ?",
                choices: ["Art Nouveau", "Art Déco", "Bauhaus", "Modernisme catalan"],
                correct_index: 1,
                explanation: "Le centre-ville de Casablanca est célèbre pour ses immeubles Art Déco et Néo-Mauresques construits pendant le protectorat français."
            },
            {
                id: 8,
                question: "Quel nom porte le quartier financier moderne de Casablanca ?",
                choices: ["Casa Business District", "Casablanca Finance City", "Anfa Financial Hub", "Morocco Business Center"],
                correct_index: 1,
                explanation: "Casablanca Finance City (CFC) est le quartier d'affaires moderne qui positionne Casablanca comme hub financier africain."
            },
            {
                id: 9,
                question: "Quel est le plus grand port d'Afrique du Nord situé à Casablanca ?",
                choices: ["Port de Mohammedia", "Port de Casablanca", "Port de Jorf Lasfar", "Port d'Anfa"],
                correct_index: 1,
                explanation: "Le Port de Casablanca est le plus grand port d'Afrique du Nord, jouant un rôle crucial dans l'économie marocaine."
            },
            {
                id: 10,
                question: "Vrai ou Faux : Casablanca était une république indépendante de corsaires avant sa destruction par les Portugais.",
                choices: ["Vrai", "Faux", "Seulement pendant 10 ans", "Uniquement sous contrôle ottoman"],
                correct_index: 0,
                explanation: "Vrai. Anfa fut un temps une république indépendante de corsaires, ce qui entraîna sa destruction par les Portugais en 1468."
            }
        ],
        meta: {
            last_updated: "2025-12-26",
            sources: [
                "Archives du Patrimoine de Casablanca",
                "Histoire moderne du Maroc - Guy Martinet",
                "Fondation de la Mosquée Hassan II",
                "Portail officiel de la région Casablanca-Settat"
            ]
        }
    };

    return NextResponse.json(casablancaData);
}
