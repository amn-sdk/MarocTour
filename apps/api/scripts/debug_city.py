
import sys
from pathlib import Path
from dotenv import load_dotenv

# Add paths
sys.path.append(str(Path(__file__).parent.parent))

# Load .env
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

from sqlmodel import Session, create_engine, select
from app.core.config import settings
from app.models.city import City
from app.schemas.city import CityResponse

def debug_city():
    # Point to the file we just verified exists
    db_url = "sqlite:///apps/api/maroctour.db"
    print(f"Connecting to {db_url}")
    engine = create_engine(db_url)
    
    try:
        with Session(engine) as session:
            print("Querying Nador...")
            statement = select(City).where(City.slug == "nador")
            result = session.exec(statement).first()
            
            if not result:
                print("Nador not found in DB!")
                return
                
            print(f"Found city: {result.name_fr}")
            print("Validating with CityResponse...")
            try:
                # Manually validate to trigger the error
                response_model = CityResponse.model_validate(result)
                print("Validation successful!")
                print(response_model)
            except Exception as e:
                print(f"Validation Error: {e}")
                
    except Exception as e:
        print(f"DB Error: {e}")

if __name__ == "__main__":
    debug_city()
