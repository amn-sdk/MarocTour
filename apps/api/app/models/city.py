"""
City model - SQLModel
"""

from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel


class City(SQLModel, table=True):
    """City database model"""

    __tablename__ = "cities"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    slug: str = Field(unique=True, index=True, max_length=100)
    
    # Multilingual names
    name_fr: str = Field(max_length=200)
    name_en: Optional[str] = Field(default=None, max_length=200)
    name_ar: Optional[str] = Field(default=None, max_length=200)
    
    # Multilingual descriptions
    description_fr: Optional[str] = Field(default=None)
    description_en: Optional[str] = Field(default=None)
    description_ar: Optional[str] = Field(default=None)
    
    # Location
    region: str = Field(max_length=200)
    latitude: float = Field()
    longitude: float = Field()
    
    # Metadata
    population: Optional[int] = Field(default=None)
    image_url: Optional[str] = Field(default=None, max_length=500)
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "slug": "marrakech",
                "name_fr": "Marrakech",
                "name_en": "Marrakech",
                "name_ar": "مراكش",
                "description_fr": "Perle du Sud",
                "region": "Marrakech-Safi",
                "latitude": 31.6295,
                "longitude": -7.9811,
                "population": 929000,
            }
        }

