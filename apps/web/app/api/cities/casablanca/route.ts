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
            // Quiz will be implemented in Issue 3.4, adding placeholders for now to match structure
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
