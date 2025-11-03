"""
Quiz endpoints
"""

from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select, func

from app.db.session import get_session
from app.models.quiz import QuizQuestion, QuizAttempt
from app.schemas.quiz import (
    QuizQuestionResponse,
    QuizAttemptCreate,
    QuizAttemptResponse,
    TopScoresResponse,
)

router = APIRouter(prefix="/quiz", tags=["Quiz"])


@router.get("/cities/{city_id}/questions", response_model=list[QuizQuestionResponse])
def get_quiz_questions(city_id: UUID, session: Session = Depends(get_session)) -> list[QuizQuestion]:
    """Get all quiz questions for a city (without correct answers)"""
    query = select(QuizQuestion).where(QuizQuestion.city_id == city_id).order_by(QuizQuestion.order)
    questions = session.exec(query).all()

    if not questions:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No quiz questions found for city {city_id}",
        )

    return questions


@router.post("/attempt", response_model=QuizAttemptResponse, status_code=status.HTTP_201_CREATED)
def submit_quiz_attempt(
    attempt_data: QuizAttemptCreate, session: Session = Depends(get_session)
) -> dict:
    """Submit a quiz attempt and get results"""

    # Get all questions for the city
    query = select(QuizQuestion).where(QuizQuestion.city_id == attempt_data.city_id)
    questions = session.exec(query).all()

    if not questions:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No quiz questions found for city {attempt_data.city_id}",
        )

    # Create a map of question IDs to questions
    questions_map = {str(q.id): q for q in questions}

    # Score the answers
    correct_count = 0
    detailed_answers = []

    for answer in attempt_data.answers:
        question_id = answer.get("question_id")
        selected_index = answer.get("selected_index")

        if question_id not in questions_map:
            continue

        question = questions_map[question_id]
        is_correct = selected_index == question.correct_index
        if is_correct:
            correct_count += 1

        detailed_answers.append(
            {
                "question_id": question_id,
                "selected_index": selected_index,
                "correct_index": question.correct_index,
                "is_correct": is_correct,
            }
        )

    # Calculate score percentage
    total_questions = len(questions)
    score = int((correct_count / total_questions) * 100) if total_questions > 0 else 0

    # Save attempt to database
    attempt = QuizAttempt(
        city_id=attempt_data.city_id,
        player_name=attempt_data.player_name,
        score=score,
        answers=detailed_answers,
    )
    session.add(attempt)
    session.commit()
    session.refresh(attempt)

    return {
        "id": attempt.id,
        "score": score,
        "total_questions": total_questions,
        "correct_answers": correct_count,
        "answers": detailed_answers,
        "completed_at": attempt.completed_at,
    }


@router.get("/top-scores", response_model=list[TopScoresResponse])
def get_top_scores(
    limit: int = 10, city_id: Optional[UUID] = None, session: Session = Depends(get_session)
) -> list[QuizAttempt]:
    """Get top quiz scores"""
    query = select(QuizAttempt).order_by(QuizAttempt.score.desc(), QuizAttempt.completed_at.desc())

    if city_id:
        query = query.where(QuizAttempt.city_id == city_id)

    scores = session.exec(query.limit(limit)).all()
    return scores

