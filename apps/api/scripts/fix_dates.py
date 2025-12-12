
import sys
from pathlib import Path
from datetime import datetime

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from dotenv import load_dotenv

# Load .env file explicitly
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

from sqlmodel import Session, create_engine, select
from app.core.config import settings
from app.models.city import City

def fix_dates():
    db_url = "postgresql://maroctour:maroctour@localhost:5432/maroctour"
    print(f"Connecting to {db_url}")
    engine = create_engine(db_url)

    with Session(engine) as session:
        print("Checking cities...")
        cities = session.exec(select(City)).all()
        print(f"Found {len(cities)} cities.")
        
        count = 0
        for city in cities:
            updated = False
            if not city.created_at:
                city.created_at = datetime.utcnow()
                updated = True
            if not city.updated_at:
                city.updated_at = datetime.utcnow()
                updated = True
            
            if updated:
                session.add(city)
                count += 1
                
        if count > 0:
            print(f"Fixing timestamps for {count} cities...")
            session.commit()
            print("✅ Done!")
        else:
            print("All cities have valid timestamps.")

if __name__ == "__main__":
    fix_dates()
