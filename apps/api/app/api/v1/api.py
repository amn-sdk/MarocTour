"""
Main API router - aggregates all endpoint routers
"""

from fastapi import APIRouter

from app.api.v1.endpoints import cities, quiz

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(cities.router)
api_router.include_router(quiz.router)

# Health check for API v1
@api_router.get("/health")
def api_health():
    return {"status": "ok", "version": "v1"}

