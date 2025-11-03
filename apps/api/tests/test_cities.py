"""
Tests for cities endpoints
"""

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.models.city import City


def test_read_root(client: TestClient):
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "name" in data
    assert "version" in data


def test_health_check(client: TestClient):
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


def test_create_city(client: TestClient, session: Session):
    """Test creating a city"""
    city_data = {
        "slug": "test-city",
        "name_fr": "Ville Test",
        "name_en": "Test City",
        "region": "Test Region",
        "latitude": 34.0,
        "longitude": -6.0,
        "population": 100000,
    }
    response = client.post("/api/v1/cities/", json=city_data)
    assert response.status_code == 201
    data = response.json()
    assert data["slug"] == city_data["slug"]
    assert data["name_fr"] == city_data["name_fr"]
    assert "id" in data


def test_get_cities(client: TestClient, session: Session):
    """Test getting all cities"""
    # Create a test city
    city = City(
        slug="test-city",
        name_fr="Ville Test",
        region="Test Region",
        latitude=34.0,
        longitude=-6.0,
    )
    session.add(city)
    session.commit()

    response = client.get("/api/v1/cities/")
    assert response.status_code == 200
    data = response.json()
    assert "cities" in data
    assert "total" in data
    assert data["total"] >= 1


def test_get_city_by_slug(client: TestClient, session: Session):
    """Test getting a city by slug"""
    # Create a test city
    city = City(
        slug="test-city-slug",
        name_fr="Ville Test Slug",
        region="Test Region",
        latitude=34.0,
        longitude=-6.0,
    )
    session.add(city)
    session.commit()

    response = client.get("/api/v1/cities/slug/test-city-slug")
    assert response.status_code == 200
    data = response.json()
    assert data["slug"] == "test-city-slug"
    assert data["name_fr"] == "Ville Test Slug"


def test_get_city_not_found(client: TestClient):
    """Test getting a non-existent city"""
    response = client.get("/api/v1/cities/slug/non-existent-city")
    assert response.status_code == 404

