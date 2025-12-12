"""
Database session management
"""

from sqlmodel import Session, create_engine
from app.core.config import settings

# Create database engine
# Force SQLite for development stability if Postgres fails
db_url = "sqlite:///./maroctour.db"
connect_args = {"check_same_thread": False}
engine = create_engine(
    db_url,
    echo=settings.DEBUG,
    connect_args=connect_args,
)


def get_session():
    """Get database session (dependency injection)"""
    with Session(engine) as session:
        yield session

