"""
City schemas - Pydantic models for API validation
"""

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class CityBase(BaseModel):
    """Base city schema"""

    slug: str = Field(..., min_length=1, max_length=100)
    name_fr: str = Field(..., min_length=1, max_length=200)
    name_en: Optional[str] = Field(None, max_length=200)
    name_ar: Optional[str] = Field(None, max_length=200)
    description_fr: Optional[str] = None
    description_en: Optional[str] = None
    description_ar: Optional[str] = None
    region: str = Field(..., min_length=1, max_length=200)
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    population: Optional[int] = Field(None, ge=0)
    image_url: Optional[str] = None


class CityCreate(CityBase):
    """Schema for creating a city"""

    pass


class CityUpdate(BaseModel):
    """Schema for updating a city (all fields optional)"""

    name_fr: Optional[str] = None
    name_en: Optional[str] = None
    name_ar: Optional[str] = None
    description_fr: Optional[str] = None
    description_en: Optional[str] = None
    description_ar: Optional[str] = None
    region: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    population: Optional[int] = None
    image_url: Optional[str] = None


class CityResponse(CityBase):
    """Schema for city response"""

    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CityListResponse(BaseModel):
    """Schema for city list response"""

    cities: list[CityResponse]
    total: int

