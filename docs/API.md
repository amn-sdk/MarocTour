# 📡 Documentation API MarocTour

## Vue d'ensemble

L'API MarocTour est une API REST construite avec **FastAPI** qui fournit des endpoints pour accéder aux données des villes marocaines, gérer les quiz et plus encore.

- **Base URL** : `http://localhost:8000/api/v1` (développement)
- **Documentation interactive** : `http://localhost:8000/docs` (Swagger UI)
- **ReDoc** : `http://localhost:8000/redoc`
- **OpenAPI Schema** : `http://localhost:8000/openapi.json`

## Authentification

Pour la version MVP, l'API est ouverte sans authentification. L'authentification JWT sera ajoutée dans les versions futures pour les endpoints admin.

## Endpoints

### 🏠 Root & Health

#### `GET /`

Retourne les informations de base de l'API.

**Response 200**
```json
{
  "name": "MarocTour API",
  "version": "1.0.0",
  "docs": "/docs",
  "health": "/health"
}
```

#### `GET /health`

Health check endpoint.

**Response 200**
```json
{
  "status": "healthy",
  "environment": "development",
  "version": "1.0.0"
}
```

#### `GET /ready`

Readiness check (pour Kubernetes).

**Response 200**
```json
{
  "status": "ready"
}
```

---

### 🏙️ Cities

#### `GET /api/v1/cities/`

Liste toutes les villes avec filtres optionnels.

**Query Parameters:**
- `skip` (int, default: 0) - Nombre de résultats à sauter
- `limit` (int, default: 100) - Nombre maximum de résultats
- `region` (string, optional) - Filtrer par région

**Response 200**
```json
{
  "cities": [
    {
      "id": "uuid-here",
      "slug": "marrakech",
      "name_fr": "Marrakech",
      "name_en": "Marrakech",
      "name_ar": "مراكش",
      "description_fr": "Perle du Sud...",
      "region": "Marrakech-Safi",
      "latitude": 31.6295,
      "longitude": -7.9811,
      "population": 929000,
      "image_url": null,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 10
}
```

#### `GET /api/v1/cities/{city_id}`

Récupère une ville par son ID.

**Path Parameters:**
- `city_id` (UUID) - ID de la ville

**Response 200**
```json
{
  "id": "uuid-here",
  "slug": "marrakech",
  "name_fr": "Marrakech",
  ...
}
```

**Response 404**
```json
{
  "detail": "City with ID {city_id} not found"
}
```

#### `GET /api/v1/cities/slug/{slug}`

Récupère une ville par son slug.

**Path Parameters:**
- `slug` (string) - Slug de la ville (ex: "marrakech")

**Response 200**
```json
{
  "id": "uuid-here",
  "slug": "marrakech",
  "name_fr": "Marrakech",
  ...
}
```

**Response 404**
```json
{
  "detail": "City with slug 'xxx' not found"
}
```

#### `POST /api/v1/cities/` 🔒

Crée une nouvelle ville (admin uniquement - à venir).

**Request Body:**
```json
{
  "slug": "new-city",
  "name_fr": "Nouvelle Ville",
  "name_en": "New City",
  "name_ar": "مدينة جديدة",
  "description_fr": "Description...",
  "region": "Région",
  "latitude": 34.0,
  "longitude": -6.0,
  "population": 100000
}
```

**Response 201**
```json
{
  "id": "uuid-here",
  "slug": "new-city",
  ...
}
```

**Response 400**
```json
{
  "detail": "City with slug 'xxx' already exists"
}
```

#### `PATCH /api/v1/cities/{city_id}` 🔒

Met à jour une ville (admin uniquement - à venir).

#### `DELETE /api/v1/cities/{city_id}` 🔒

Supprime une ville (admin uniquement - à venir).

---

### 🧠 Quiz

#### `GET /api/v1/quiz/cities/{city_id}/questions`

Récupère les questions de quiz pour une ville (sans les réponses correctes).

**Path Parameters:**
- `city_id` (UUID) - ID de la ville

**Response 200**
```json
[
  {
    "id": "uuid-here",
    "city_id": "uuid-city",
    "question_fr": "Quelle est la principale attraction de Nador ?",
    "question_en": "What is the main attraction of Nador?",
    "question_ar": "ما هي المعالم الرئيسية في الناظور؟",
    "options": {
      "fr": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "en": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "ar": ["خيار 1", "خيار 2", "خيار 3", "خيار 4"]
    },
    "difficulty": "medium"
  }
]
```

**Response 404**
```json
{
  "detail": "No quiz questions found for city {city_id}"
}
```

#### `POST /api/v1/quiz/attempt`

Soumet une tentative de quiz et reçoit le score.

**Request Body:**
```json
{
  "city_id": "uuid-here",
  "player_name": "Ahmed",
  "answers": [
    {
      "question_id": "uuid-q1",
      "selected_index": 1
    },
    {
      "question_id": "uuid-q2",
      "selected_index": 3
    }
  ]
}
```

**Response 201**
```json
{
  "id": "uuid-attempt",
  "score": 85,
  "total_questions": 5,
  "correct_answers": 4,
  "answers": [
    {
      "question_id": "uuid-q1",
      "selected_index": 1,
      "correct_index": 1,
      "is_correct": true
    },
    {
      "question_id": "uuid-q2",
      "selected_index": 3,
      "correct_index": 2,
      "is_correct": false
    }
  ],
  "completed_at": "2024-01-01T12:00:00Z"
}
```

#### `GET /api/v1/quiz/top-scores`

Récupère les meilleurs scores.

**Query Parameters:**
- `limit` (int, default: 10) - Nombre de scores à retourner
- `city_id` (UUID, optional) - Filtrer par ville

**Response 200**
```json
[
  {
    "player_name": "Ahmed",
    "score": 95,
    "city_id": "uuid-here",
    "completed_at": "2024-01-01T12:00:00Z"
  },
  {
    "player_name": "Fatima",
    "score": 92,
    "city_id": "uuid-here",
    "completed_at": "2024-01-01T11:00:00Z"
  }
]
```

---

## Codes d'erreur

| Code | Description |
|------|-------------|
| 200  | OK - Requête réussie |
| 201  | Created - Ressource créée avec succès |
| 204  | No Content - Suppression réussie |
| 400  | Bad Request - Données invalides |
| 401  | Unauthorized - Authentification requise |
| 403  | Forbidden - Permissions insuffisantes |
| 404  | Not Found - Ressource introuvable |
| 422  | Unprocessable Entity - Erreur de validation |
| 429  | Too Many Requests - Rate limit dépassé |
| 500  | Internal Server Error - Erreur serveur |

## Rate Limiting

- **Limite** : 100 requêtes par minute par IP
- **Header** : `X-RateLimit-Remaining`
- **Réponse 429** si dépassement

## CORS

Les origines autorisées sont configurables via `CORS_ORIGINS` dans `.env`. Par défaut :
- `http://localhost:3000` (frontend Next.js en dev)

## Pagination

Les endpoints de liste supportent la pagination via :
- `skip` : nombre d'éléments à sauter
- `limit` : nombre maximum d'éléments à retourner (max: 100)

Exemple :
```
GET /api/v1/cities/?skip=10&limit=20
```

## Validation

Toutes les données d'entrée sont validées avec **Pydantic v2**. En cas d'erreur de validation, l'API retourne une réponse 422 avec le détail des erreurs :

```json
{
  "detail": [
    {
      "loc": ["body", "latitude"],
      "msg": "ensure this value is greater than or equal to -90",
      "type": "value_error.number.not_ge"
    }
  ]
}
```

## Performance

- **Moyenne p50** : < 100ms
- **p95** : < 500ms
- **p99** : < 1s

## Observabilité

### Metrics

Endpoint Prometheus disponible : `GET /metrics`

Métriques exposées :
- `http_requests_total`
- `http_request_duration_seconds`
- `http_requests_in_progress`
- `db_connections_active`

### Logs

Format JSON structuré avec niveaux :
- `DEBUG` : développement
- `INFO` : production
- `WARNING` : avertissements
- `ERROR` : erreurs

## Exemples d'utilisation

### Python (httpx)

```python
import httpx

async with httpx.AsyncClient() as client:
    # Get cities
    response = await client.get("http://localhost:8000/api/v1/cities/")
    cities = response.json()["cities"]
    
    # Submit quiz
    quiz_data = {
        "city_id": "uuid-here",
        "player_name": "Ahmed",
        "answers": [{"question_id": "uuid-q1", "selected_index": 1}]
    }
    response = await client.post(
        "http://localhost:8000/api/v1/quiz/attempt",
        json=quiz_data
    )
    result = response.json()
```

### JavaScript (fetch)

```javascript
// Get cities
const response = await fetch('http://localhost:8000/api/v1/cities/');
const data = await response.json();
console.log(data.cities);

// Submit quiz
const quizData = {
  city_id: 'uuid-here',
  player_name: 'Ahmed',
  answers: [{question_id: 'uuid-q1', selected_index: 1}]
};

const result = await fetch('http://localhost:8000/api/v1/quiz/attempt', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(quizData)
});
const score = await result.json();
```

### cURL

```bash
# Get cities
curl http://localhost:8000/api/v1/cities/

# Get city by slug
curl http://localhost:8000/api/v1/cities/slug/marrakech

# Submit quiz
curl -X POST http://localhost:8000/api/v1/quiz/attempt \
  -H "Content-Type: application/json" \
  -d '{
    "city_id": "uuid-here",
    "player_name": "Ahmed",
    "answers": [{"question_id": "uuid-q1", "selected_index": 1}]
  }'
```

## Versions futures

### V1.1 (Q1 2025)
- Authentification JWT
- Endpoints admin (CRUD complet)
- Upload d'images
- Itinéraires personnalisés
- Favoris utilisateurs

### V1.2 (Q2 2025)
- WebSockets (notifications temps réel)
- GraphQL endpoint (alternative à REST)
- Recherche full-text avancée
- Recommandations IA

---

**🔗 Liens utiles**
- Swagger UI : http://localhost:8000/docs
- ReDoc : http://localhost:8000/redoc
- Prometheus Metrics : http://localhost:8000/metrics
- GitHub : https://github.com/votre-org/MarocTour

