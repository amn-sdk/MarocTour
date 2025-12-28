"""
Tests for Fès city endpoints and quiz
"""

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.models.city import City


def test_get_fes_city_by_slug(client: TestClient, session: Session):
    """Test getting Fès city by slug"""
    # Create Fès city in database
    fes_city = City(
        slug="fes",
        name_fr="Fès",
        name_en="Fez",
        name_ar="فاس",
        region="Fès-Meknès",
        latitude=34.0347,
        longitude=-5.0162,
        population=1150000,
    )
    session.add(fes_city)
    session.commit()

    response = client.get("/api/v1/cities/slug/fes")
    assert response.status_code == 200
    data = response.json()
    assert data["slug"] == "fes"
    assert data["name_fr"] == "Fès"
    assert data["region"] == "Fès-Meknès"
    assert data["population"] == 1150000


def test_fes_city_exists(client: TestClient, session: Session):
    """Test that Fès city can be retrieved"""
    # Create Fès city
    fes_city = City(
        slug="fes",
        name_fr="Fès",
        region="Fès-Meknès",
        latitude=34.0347,
        longitude=-5.0162,
    )
    session.add(fes_city)
    session.commit()

    # Get all cities and verify Fès is in the list
    response = client.get("/api/v1/cities/")
    assert response.status_code == 200
    data = response.json()
    cities = data["cities"]
    fes_found = any(city["slug"] == "fes" for city in cities)
    assert fes_found, "Fès city should be in the cities list"


def test_fes_quiz_top_scores(client: TestClient, session: Session):
    """Test getting top scores for Fès quiz"""
    # Create Fès city
    fes_city = City(
        slug="fes",
        name_fr="Fès",
        region="Fès-Meknès",
        latitude=34.0347,
        longitude=-5.0162,
    )
    session.add(fes_city)
    session.commit()
    session.refresh(fes_city)

    # Get top scores for Fès (should work even if empty)
    response = client.get(f"/api/v1/quiz/top-scores?city_id={fes_city.id}&limit=10")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    # All scores should be for Fès if any exist
    for score in data:
        assert score["city_id"] == str(fes_city.id)

