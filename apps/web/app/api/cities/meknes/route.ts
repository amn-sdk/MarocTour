import { NextResponse } from 'next/server';

export async function GET() {
    const meknesData = {
        slug: "meknes",
        title: "Meknès",
        hero: {
            title: "Meknès",
            subtitle: "Le Versailles Marocain - Cité Impériale de Moulay Ismail",
            image_url: "/images/cities/meknes/bab_mansour.png"
        },
        quiz: [
            {
                id: 1,
                question: "Quelle tribu berbère a fondé Meknès au XIe siècle ?",
                choices: ["Les Almoravides", "Les Meknassa", "Les Zénètes", "Les Sanhadja"],
                correct_index: 1,
                explanation: "Meknès a été fondée par la tribu berbère des Meknassa au XIe siècle, ce qui a donné son nom à la ville."
            },
            {
                id: 2,
                question: "Quel sultan a fait de Meknès sa capitale impériale en 1672 ?",
                choices: ["Moulay Rachid", "Moulay Ismail", "Moulay Abdallah", "Moulay Hassan"],
                correct_index: 1,
                explanation: "Le sultan Moulay Ismail a choisi Meknès comme capitale de son empire en 1672 et y a régné pendant 55 ans jusqu'en 1727."
            },
            {
                id: 3,
                question: "Combien de kilomètres de remparts entourent la ville impériale de Meknès ?",
                choices: ["15 kilomètres", "20 kilomètres", "25 kilomètres", "30 kilomètres"],
                correct_index: 2,
                explanation: "Meknès est entourée de 25 kilomètres de remparts monumentaux, construits sous Moulay Ismail pour protéger la cité impériale."
            },
            {
                id: 4,
                question: "Quelle porte est considérée comme la plus belle d'Afrique du Nord ?",
                choices: ["Bab el-Khemis", "Bab Mansour el-Aleuj", "Bab Berdieyinne", "Bab el-Mrissa"],
                correct_index: 1,
                explanation: "Bab Mansour el-Aleuj, achevée en 1732, est considérée comme la plus belle porte du Maghreb avec ses 16 mètres de hauteur et ses magnifiques zelliges."
            },
            {
                id: 5,
                question: "En quelle année la porte Bab Mansour a-t-elle été achevée ?",
                choices: ["1727", "1732", "1740", "1752"],
                correct_index: 1,
                explanation: "Bab Mansour a été achevée en 1732, cinq ans après la mort de Moulay Ismail, par son fils qui voulait honorer la mémoire de son père."
            },
            {
                id: 6,
                question: "Combien de chevaux pouvaient être accueillis dans les écuries royales (Heri es-Souani) ?",
                choices: ["5 000 chevaux", "8 000 chevaux", "12 000 chevaux", "15 000 chevaux"],
                correct_index: 2,
                explanation: "Les écuries royales Heri es-Souani pouvaient accueillir jusqu'à 12 000 chevaux, témoignant de la puissance militaire de Moulay Ismail."
            },
            {
                id: 7,
                question: "Quelle catastrophe naturelle a frappé Meknès en 1755 ?",
                choices: ["Une inondation", "Un tremblement de terre", "Une sécheresse", "Un incendie"],
                correct_index: 1,
                explanation: "Le tremblement de terre de Lisbonne de 1755 a causé des dégâts importants à Meknès, détruisant de nombreux palais impériaux."
            },
            {
                id: 8,
                question: "À quelle distance de Meknès se trouvent les ruines romaines de Volubilis ?",
                choices: ["15 kilomètres", "30 kilomètres", "45 kilomètres", "60 kilomètres"],
                correct_index: 1,
                explanation: "Les ruines romaines de Volubilis, ancienne capitale de la Maurétanie Tingitane, se trouvent à environ 30 kilomètres de Meknès."
            },
            {
                id: 9,
                question: "En quelle année la médina de Meknès a-t-elle été inscrite au patrimoine mondial de l'UNESCO ?",
                choices: ["1993", "1996", "1999", "2001"],
                correct_index: 1,
                explanation: "La médina historique de Meknès a été inscrite au patrimoine mondial de l'UNESCO en 1996 pour son architecture hispano-mauresque exceptionnelle."
            },
            {
                id: 10,
                question: "Quel monument religieux de Meknès est accessible aux non-musulmans ?",
                choices: ["La Grande Mosquée", "Le Mausolée de Moulay Ismail", "La Mosquée Nejjarine", "La Médersa Bou Inania"],
                correct_index: 1,
                explanation: "Le Mausolée de Moulay Ismail est le seul monument religieux de Meknès (et l'un des rares du Maroc) accessible aux non-musulmans, grâce à son importance historique."
            }
        ],
        meta: {
            last_updated: "2025-12-29",
            sources: [
                "UNESCO World Heritage - Médina de Meknès",
                "Histoire des villes impériales du Maroc",
                "Archives du Patrimoine de Meknès",
                "Ministère de la Culture du Royaume du Maroc"
            ]
        }
    };

    return NextResponse.json(meknesData);
}
