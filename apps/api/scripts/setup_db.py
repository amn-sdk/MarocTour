
import sys
from pathlib import Path
from sqlmodel import SQLModel, create_engine, Session, select

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from app.models.city import City
from app.models.quiz import QuizQuestion, QuizAttempt
from app.core.config import settings

# Same data as seed.py
CITIES_DATA = [
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
    }
]

def setup_db():
    db_url = "sqlite:///./maroctour.db"
    print(f"Creating DB at {db_url}")
    engine = create_engine(db_url)
    
    print("Creating tables...")
    SQLModel.metadata.create_all(engine)
    
    with Session(engine) as session:
        print("Seeding Nador...")
        # Check if exists
        updated = False
        for city_data in CITIES_DATA:
            statement = select(City).where(City.slug == city_data["slug"])
            existing = session.exec(statement).first()
            if existing:
                print(f"Skipping {city_data['slug']} (already exists)")
                continue
            
            city = City(**city_data)
            session.add(city)
            print(f"Added {city.slug}")
            
        session.commit()
        print("Done!")

if __name__ == "__main__":
    setup_db()
