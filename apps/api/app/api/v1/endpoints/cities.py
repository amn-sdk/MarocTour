"""
Cities endpoints
"""

from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from app.db.session import get_session
from app.models.city import City
from app.schemas.city import CityResponse, CityListResponse, CityCreate, CityUpdate

router = APIRouter(prefix="/cities", tags=["Cities"])


@router.get("/", response_model=CityListResponse)
def get_cities(
    skip: int = 0,
    limit: int = 100,
    region: Optional[str] = None,
    session: Session = Depends(get_session),
) -> CityListResponse:
    """Get all cities with optional filters"""
    query = select(City)

    if region:
        query = query.where(City.region == region)

    cities = session.exec(query.offset(skip).limit(limit)).all()
    total = len(session.exec(query).all())

    return CityListResponse(cities=cities, total=total)


@router.get("/{city_id}", response_model=CityResponse)
def get_city_by_id(city_id: UUID, session: Session = Depends(get_session)) -> City:
    """Get city by ID"""
    city = session.get(City, city_id)
    if not city:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"City with ID {city_id} not found",
        )
    return city


@router.get("/slug/{slug}", response_model=CityResponse)
def get_city_by_slug(slug: str, session: Session = Depends(get_session)) -> City:
    """Get city by slug"""
    query = select(City).where(City.slug == slug)
    city = session.exec(query).first()
    if not city:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"City with slug '{slug}' not found",
        )
    return city


@router.post("/", response_model=CityResponse, status_code=status.HTTP_201_CREATED)
def create_city(city_data: CityCreate, session: Session = Depends(get_session)) -> City:
    """Create a new city (admin only)"""
    # Check if slug already exists
    existing = session.exec(select(City).where(City.slug == city_data.slug)).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"City with slug '{city_data.slug}' already exists",
        )

    city = City(**city_data.model_dump())
    session.add(city)
    session.commit()
    session.refresh(city)
    return city


@router.patch("/{city_id}", response_model=CityResponse)
def update_city(
    city_id: UUID, city_data: CityUpdate, session: Session = Depends(get_session)
) -> City:
    """Update city (admin only)"""
    city = session.get(City, city_id)
    if not city:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"City with ID {city_id} not found",
        )

    update_data = city_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(city, key, value)

    from datetime import datetime

    city.updated_at = datetime.utcnow()

    session.add(city)
    session.commit()
    session.refresh(city)
    return city


@router.delete("/{city_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_city(city_id: UUID, session: Session = Depends(get_session)) -> None:
    """Delete city (admin only)"""
    city = session.get(City, city_id)
    if not city:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"City with ID {city_id} not found",
        )

    session.delete(city)
    session.commit()

