"""
Seed script to populate database with initial data
"""

import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from uuid import uuid4
from sqlmodel import Session, create_engine, select

from app.core.config import settings
from app.models.city import City
from app.models.quiz import QuizQuestion

# Cities data (10 cities including Nador)
CITIES_DATA = [
    {
        "slug": "rabat",
        "name_fr": "Rabat",
        "name_en": "Rabat",
        "name_ar": "الرباط",
        "region": "Rabat-Salé-Kénitra",
        "latitude": 34.0209,
        "longitude": -6.8416,
        "population": 580000,
        "description_fr": "Capitale du Maroc, ville moderne et historique avec de magnifiques monuments",
        "description_en": "Capital of Morocco, modern and historic city with magnificent monuments",
        "description_ar": "عاصمة المغرب، مدينة حديثة وتاريخية مع آثار رائعة",
    },
    {
        "slug": "casablanca",
        "name_fr": "Casablanca",
        "name_en": "Casablanca",
        "name_ar": "الدار البيضاء",
        "region": "Casablanca-Settat",
        "latitude": 33.5731,
        "longitude": -7.5898,
        "population": 3360000,
        "description_fr": "Capitale économique du Maroc, ville moderne et dynamique",
        "description_en": "Economic capital of Morocco, modern and dynamic city",
        "description_ar": "العاصمة الاقتصادية للمغرب، مدينة حديثة وديناميكية",
    },
    {
        "slug": "marrakech",
        "name_fr": "Marrakech",
        "name_en": "Marrakech",
        "name_ar": "مراكش",
        "region": "Marrakech-Safi",
        "latitude": 31.6295,
        "longitude": -7.9811,
        "population": 929000,
        "description_fr": "Perle du Sud, ville impériale aux mille couleurs",
        "description_en": "Pearl of the South, imperial city of a thousand colors",
        "description_ar": "لؤلؤة الجنوب، المدينة الإمبراطورية ذات الألف لون",
    },
    {
        "slug": "fes",
        "name_fr": "Fès",
        "name_en": "Fez",
        "name_ar": "فاس",
        "region": "Fès-Meknès",
        "latitude": 34.0181,
        "longitude": -5.0078,
        "population": 1150000,
        "description_fr": "Capitale spirituelle et culturelle, abritant la plus ancienne université du monde",
        "description_en": "Spiritual and cultural capital, home to the world's oldest university",
        "description_ar": "العاصمة الروحية والثقافية، موطن أقدم جامعة في العالم",
    },
    {
        "slug": "tanger",
        "name_fr": "Tanger",
        "name_en": "Tangier",
        "name_ar": "طنجة",
        "region": "Tanger-Tétouan-Al Hoceïma",
        "latitude": 35.7595,
        "longitude": -5.8340,
        "population": 948000,
        "description_fr": "Porte de l'Afrique, ville cosmopolite entre Méditerranée et Atlantique",
        "description_en": "Gateway to Africa, cosmopolitan city between Mediterranean and Atlantic",
        "description_ar": "بوابة أفريقيا، مدينة كوزموبوليتانية بين البحر المتوسط والمحيط الأطلسي",
    },
    {
        "slug": "agadir",
        "name_fr": "Agadir",
        "name_en": "Agadir",
        "name_ar": "أكادير",
        "region": "Souss-Massa",
        "latitude": 30.4278,
        "longitude": -9.5981,
        "population": 422000,
        "description_fr": "Station balnéaire moderne aux plages magnifiques",
        "description_en": "Modern seaside resort with beautiful beaches",
        "description_ar": "منتجع ساحلي حديث مع شواطئ جميلة",
    },
    {
        "slug": "meknes",
        "name_fr": "Meknès",
        "name_en": "Meknes",
        "name_ar": "مكناس",
        "region": "Fès-Meknès",
        "latitude": 33.8935,
        "longitude": -5.5473,
        "population": 632000,
        "description_fr": "Ville impériale, patrimoine mondial de l'UNESCO",
        "description_en": "Imperial city, UNESCO World Heritage site",
        "description_ar": "مدينة إمبراطورية، موقع التراث العالمي لليونسكو",
    },
    {
        "slug": "ouarzazate",
        "name_fr": "Ouarzazate",
        "name_en": "Ouarzazate",
        "name_ar": "ورزازات",
        "region": "Drâa-Tafilalet",
        "latitude": 30.9189,
        "longitude": -6.8934,
        "population": 72000,
        "description_fr": "Porte du désert, Hollywood du Maroc avec ses studios de cinéma",
        "description_en": "Gateway to the desert, Hollywood of Morocco with its film studios",
        "description_ar": "بوابة الصحراء، هوليوود المغرب مع استوديوهات السينما",
    },
    {
        "slug": "nador",
        "name_fr": "Nador",
        "name_en": "Nador",
        "name_ar": "الناظور",
        "region": "Oriental",
        "latitude": 35.1681,
        "longitude": -2.9333,
        "population": 161000,
        "description_fr": "Ville méditerranéenne du Rif avec sa magnifique lagune de Marchica",
        "description_en": "Mediterranean city of the Rif with its beautiful Marchica lagoon",
        "description_ar": "مدينة البحر الأبيض المتوسط في الريف مع بحيرة مارتشيكا الجميلة",
    },
    {
        "slug": "dakhla",
        "name_fr": "Dakhla",
        "name_en": "Dakhla",
        "name_ar": "الداخلة",
        "region": "Dakhla-Oued Ed-Dahab",
        "latitude": 23.7167,
        "longitude": -15.9333,
        "population": 108000,
        "description_fr": "Paradis des sports nautiques dans le grand sud marocain",
        "description_en": "Paradise for water sports in the great Moroccan south",
        "description_ar": "جنة الرياضات المائية في الجنوب المغربي الكبير",
    },
]

# Quiz questions for Casablanca
CASABLANCA_QUIZ_QUESTIONS = [
    {
        "question_fr": "Quel était le nom originel de Casablanca à l'époque berbère ?",
        "question_en": "What was the original name of Casablanca in Berber times?",
        "question_ar": "ما كان الاسم الأصلي للدار البيضاء في العصر الأمازيغي؟",
        "options": {
            "fr": ["Dar el-Beida", "Anfa", "Casa Blanca", "Al-Bayda"],
            "en": ["Dar el-Beida", "Anfa", "Casa Blanca", "Al-Bayda"],
            "ar": ["دار البيضاء", "أنفا", "كازا بلانكا", "البيضاء"],
        },
        "correct_index": 1,
        "difficulty": "medium",
        "order": 1,
    },
    {
        "question_fr": "Quelle est la hauteur du minaret de la Mosquée Hassan II ?",
        "question_en": "What is the height of the Hassan II Mosque minaret?",
        "question_ar": "ما هو ارتفاع صومعة مسجد الحسن الثاني؟",
        "options": {
            "fr": ["150 mètres", "180 mètres", "210 mètres", "250 mètres"],
            "en": ["150 meters", "180 meters", "210 meters", "250 meters"],
            "ar": ["150 متراً", "180 متراً", "210 متراً", "250 متراً"],
        },
        "correct_index": 2,
        "difficulty": "hard",
        "order": 2,
    },
    {
        "question_fr": "Quel sultan a reconstruit Casablanca en 1756 ?",
        "question_en": "Which sultan rebuilt Casablanca in 1756?",
        "question_ar": "أي سلطان أعاد بناء الدار البيضاء عام 1756؟",
        "options": {
            "fr": ["Moulay Ismail", "Mohammed ben Abdallah", "Hassan I", "Moulay Slimane"],
            "en": ["Moulay Ismail", "Mohammed ben Abdallah", "Hassan I", "Moulay Slimane"],
            "ar": ["مولاي إسماعيل", "محمد بن عبد الله", "الحسن الأول", "مولاي سليمان"],
        },
        "correct_index": 1,
        "difficulty": "medium",
        "order": 3,
    },
    {
        "question_fr": "En quelle année le tramway de Casablanca a-t-il été inauguré ?",
        "question_en": "In what year was the Casablanca tramway inaugurated?",
        "question_ar": "في أي سنة تم تدشين ترامواي الدار البيضاء؟",
        "options": {
            "fr": ["2008", "2010", "2012", "2015"],
            "en": ["2008", "2010", "2012", "2015"],
            "ar": ["2008", "2010", "2012", "2015"],
        },
        "correct_index": 2,
        "difficulty": "easy",
        "order": 4,
    },
    {
        "question_fr": "Casablanca est la capitale _____ du Maroc.",
        "question_en": "Casablanca is the _____ capital of Morocco.",
        "question_ar": "الدار البيضاء هي العاصمة _____ للمغرب.",
        "options": {
            "fr": ["politique", "économique", "culturelle", "administrative"],
            "en": ["political", "economic", "cultural", "administrative"],
            "ar": ["السياسية", "الاقتصادية", "الثقافية", "الإدارية"],
        },
        "correct_index": 1,
        "difficulty": "easy",
        "order": 5,
    },
]

# Quiz questions for Nador
NADOR_QUIZ_QUESTIONS = [
    {
        "question_fr": "Quelle est la principale attraction naturelle de Nador ?",
        "question_en": "What is the main natural attraction of Nador?",
        "question_ar": "ما هي المعالم الطبيعية الرئيسية في الناظور؟",
        "options": {
            "fr": ["La montagne", "La lagune de Marchica", "Le désert", "La forêt"],
            "en": ["The mountain", "Marchica lagoon", "The desert", "The forest"],
            "ar": ["الجبل", "بحيرة مارتشيكا", "الصحراء", "الغابة"],
        },
        "correct_index": 1,
        "difficulty": "easy",
        "order": 1,
    },
    {
        "question_fr": "Dans quelle région géographique se trouve Nador ?",
        "question_en": "In which geographical region is Nador located?",
        "question_ar": "في أي منطقة جغرافية تقع الناظور؟",
        "options": {
            "fr": ["Le Rif", "Le Sahara", "L'Atlas", "Le Souss"],
            "en": ["The Rif", "The Sahara", "The Atlas", "The Souss"],
            "ar": ["الريف", "الصحراء", "الأطلس", "السوس"],
        },
        "correct_index": 0,
        "difficulty": "medium",
        "order": 2,
    },
    {
        "question_fr": "Quelle mer borde Nador ?",
        "question_en": "Which sea borders Nador?",
        "question_ar": "أي بحر يحد الناظور؟",
        "options": {
            "fr": ["Mer Rouge", "Mer Méditerranée", "Océan Atlantique", "Mer Noire"],
            "en": ["Red Sea", "Mediterranean Sea", "Atlantic Ocean", "Black Sea"],
            "ar": ["البحر الأحمر", "البحر الأبيض المتوسط", "المحيط الأطلسي", "البحر الأسود"],
        },
        "correct_index": 1,
        "difficulty": "easy",
        "order": 3,
    },
    {
        "question_fr": "Quelle est approximativement la population de Nador ?",
        "question_en": "What is approximately the population of Nador?",
        "question_ar": "ما هو عدد سكان الناظور تقريباً؟",
        "options": {
            "fr": ["50 000", "161 000", "500 000", "1 million"],
            "en": ["50,000", "161,000", "500,000", "1 million"],
            "ar": ["50,000", "161,000", "500,000", "1 مليون"],
        },
        "correct_index": 1,
        "difficulty": "hard",
        "order": 4,
    },
    {
        "question_fr": "Nador est connue pour :",
        "question_en": "Nador is known for:",
        "question_ar": "الناظور معروفة بـ:",
        "options": {
            "fr": [
                "Ses montagnes enneigées",
                "Son port et sa lagune",
                "Ses kasbahs anciennes",
                "Ses dunes de sable",
            ],
            "en": [
                "Its snowy mountains",
                "Its port and lagoon",
                "Its ancient kasbahs",
                "Its sand dunes",
            ],
            "ar": ["جبالها الثلجية", "ميناءها وبحيرتها", "قصباتها القديمة", "كثبانها الرملية"],
        },
        "correct_index": 1,
        "difficulty": "medium",
        "order": 5,
    },
]


def seed_database():
    """Seed the database with initial data"""
    engine = create_engine(settings.DATABASE_URL)

    with Session(engine) as session:
        print("🌱 Starting database seeding...")

        # Check if cities already exist
        existing_cities = session.exec(select(City)).all()
        if existing_cities:
            print(f"⚠️  Database already contains {len(existing_cities)} cities. Skipping seed.")
            return

        # Seed cities
        print(f"📍 Seeding {len(CITIES_DATA)} cities...")
        cities_map = {}
        for city_data in CITIES_DATA:
            city = City(**city_data)
            session.add(city)
            cities_map[city_data["slug"]] = city
            print(f"  ✓ Added {city_data['name_fr']}")

        session.commit()

        # Seed quiz questions for Casablanca
        casablanca = cities_map.get("casablanca")
        total_questions = 0
        if casablanca:
            print(f"❓ Seeding {len(CASABLANCA_QUIZ_QUESTIONS)} quiz questions for Casablanca...")
            for question_data in CASABLANCA_QUIZ_QUESTIONS:
                question = QuizQuestion(city_id=casablanca.id, **question_data)
                session.add(question)
                print(f"  ✓ Added question: {question_data['question_fr'][:50]}...")
                total_questions += 1

            session.commit()

        # Seed quiz questions for Nador
        nador = cities_map.get("nador")
        if nador:
            print(f"❓ Seeding {len(NADOR_QUIZ_QUESTIONS)} quiz questions for Nador...")
            for question_data in NADOR_QUIZ_QUESTIONS:
                question = QuizQuestion(city_id=nador.id, **question_data)
                session.add(question)
                print(f"  ✓ Added question: {question_data['question_fr'][:50]}...")
                total_questions += 1

            session.commit()

        print("✅ Database seeding completed successfully!")
        print(f"   - {len(CITIES_DATA)} cities added")
        print(f"   - {total_questions} quiz questions added")


if __name__ == "__main__":
    seed_database()

