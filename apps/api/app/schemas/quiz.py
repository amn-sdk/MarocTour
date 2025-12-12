"""
Quiz schemas - Pydantic models for API validation
"""

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class QuizQuestionBase(BaseModel):
    """Base quiz question schema"""

    question_fr: str
    question_en: Optional[str] = None
    question_ar: Optional[str] = None
    options: dict = Field(..., description="JSON object with options in multiple languages")
    correct_index: int = Field(..., ge=0, le=3)
    difficulty: str = Field(default="medium", pattern="^(easy|medium|hard)$")


class QuizQuestionCreate(QuizQuestionBase):
    """Schema for creating a quiz question"""

    city_id: UUID
    order: int = 0


class QuizQuestionResponse(QuizQuestionBase):
    """Schema for quiz question response (without correct answer)"""

    id: UUID
    city_id: UUID

    class Config:
        from_attributes = True


class QuizQuestionFull(QuizQuestionResponse):
    """Schema for quiz question with correct answer (admin only)"""

    correct_index: int
    created_at: datetime


class QuizAttemptCreate(BaseModel):
    """Schema for creating a quiz attempt"""

    city_id: UUID
    player_name: str = Field(..., min_length=1, max_length=200)
    answers: list[dict] = Field(
        default=[], description="List of answers: [{question_id, selected_index}]"
    )
    score: Optional[int] = None


class QuizAttemptResponse(BaseModel):
    """Schema for quiz attempt response"""

    id: UUID
    score: int
    total_questions: int
    correct_answers: int
    answers: list[dict]  # With correct/incorrect flags
    completed_at: datetime

    class Config:
        from_attributes = True


class TopScoresResponse(BaseModel):
    """Schema for top scores response"""

    player_name: str
    score: int
    city_id: UUID
    city_name: str
    completed_at: datetime

    class Config:
        from_attributes = True

