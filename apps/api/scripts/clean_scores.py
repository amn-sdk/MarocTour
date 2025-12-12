
import sys
from pathlib import Path
from sqlmodel import SQLModel, create_engine, Session, select
from datetime import datetime

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from app.models.city import City
from app.models.quiz import QuizAttempt

def clean_and_seed_amine():
    # Use the correct DB file path
    db_url = "sqlite:///apps/api/maroctour.db"
    print(f"Connecting to {db_url}")
    engine = create_engine(db_url)

    with Session(engine) as session:
        # 1. Delete Test User
        print("Cleaning test scores...")
        statement = select(QuizAttempt).where(QuizAttempt.player_name == "Test User (Seed)")
        results = session.exec(statement).all()
        for attempt in results:
            session.delete(attempt)
        
        session.commit()
        print(f"Deleted {len(results)} test attempts.")

        # 2. Add Amine's Score
        print("Adding Amine's score...")
        # Get Nador ID
        city = session.exec(select(City).where(City.slug == "nador")).first()
        if not city:
            print("Error: Nador not found!")
            return

        # Check if Amine already exists to avoid duplicates
        existing = session.exec(select(QuizAttempt).where(QuizAttempt.player_name == "Amine")).first()
        if existing:
             print("Amine score already exists, updating...")
             existing.score = 70
             existing.completed_at = datetime.utcnow()
             existing.answers = [] # Reset answers or keep empty
             session.add(existing)
        else:
            amine_attempt = QuizAttempt(
                city_id=city.id,
                player_name="Amine",
                score=70,
                answers=[],
                completed_at=datetime.utcnow()
            )
            session.add(amine_attempt)
            
        session.commit()
        print("✅ Added Amine (70% on Nador)")

if __name__ == "__main__":
    clean_and_seed_amine()
