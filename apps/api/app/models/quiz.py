"""
Quiz models - SQLModel
"""

from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel, Column, JSON


class QuizQuestion(SQLModel, table=True):
    """Quiz question database model"""

    __tablename__ = "quiz_questions"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    city_id: UUID = Field(foreign_key="cities.id", index=True)
    
    # Multilingual questions
    question_fr: str = Field()
    question_en: Optional[str] = Field(default=None)
    question_ar: Optional[str] = Field(default=None)
    
    # Options stored as JSON array
    options: dict = Field(sa_column=Column(JSON))
    correct_index: int = Field(ge=0, le=3)
    
    # Metadata
    difficulty: str = Field(default="medium", max_length=20)  # easy, medium, hard
    order: int = Field(default=0)
    
    created_at: datetime = Field(default_factory=datetime.utcnow)


class QuizAttempt(SQLModel, table=True):
    """Quiz attempt database model"""

    __tablename__ = "quiz_attempts"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    city_id: UUID = Field(foreign_key="cities.id", index=True)
    player_name: str = Field(max_length=200)
    
    score: int = Field(ge=0, le=100)
    answers: dict = Field(sa_column=Column(JSON))  # User answers
    
    completed_at: datetime = Field(default_factory=datetime.utcnow, index=True)

    class Config:
        json_schema_extra = {
            "example": {
                "city_id": "uuid-here",
                "player_name": "Ahmed",
                "score": 85,
                "answers": [{"question_id": "uuid", "selected": 2, "correct": True}],
            }
        }

