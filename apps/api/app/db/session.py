"""
Database session management
"""

from sqlmodel import Session, create_engine
from app.core.config import settings

# Create database engine
# Create database engine
if settings.DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}
    engine = create_engine(
        settings.DATABASE_URL,
        echo=settings.DEBUG,
        connect_args=connect_args,
    )
else:
    engine = create_engine(
        settings.DATABASE_URL,
        pool_size=settings.DATABASE_POOL_SIZE,
        max_overflow=settings.DATABASE_MAX_OVERFLOW,
        echo=settings.DEBUG,
    )


def get_session():
    """Get database session (dependency injection)"""
    with Session(engine) as session:
        yield session

