# 🏗️ Architecture MarocTour

## 1. Vue d'ensemble

MarocTour est une application web full-stack moderne construite selon une architecture **3-tiers** avec séparation claire des responsabilités :

### Couches principales

```
┌─────────────────────────────────────────────────────────────┐
│                    COUCHE PRÉSENTATION                       │
│                                                              │
│  Next.js 14 (App Router) + React Server Components         │
│  - Pages SSR/SSG                                            │
│  - Composants interactifs (MapLibre GL)                     │
│  - State Management (TanStack Query)                        │
│  - i18n (next-intl)                                         │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST + WebSocket
┌──────────────────────────▼──────────────────────────────────┐
│                    COUCHE LOGIQUE MÉTIER                     │
│                                                              │
│  FastAPI (Python 3.11+)                                     │
│  - Endpoints RESTful (OpenAPI)                              │
│  - Business Logic                                           │
│  - Validation (Pydantic v2)                                 │
│  - Auth & Authorization                                     │
└──────────────────────────┬──────────────────────────────────┘
                           │ SQL + Cache
┌──────────────────────────▼──────────────────────────────────┐
│                    COUCHE DONNÉES                            │
│                                                              │
│  PostgreSQL 16 (Données structurées)                        │
│  Redis 7 (Cache & Sessions)                                 │
│  MinIO (S3-compatible - Assets/Images)                      │
│  MapTiler (Vector Tiles Provider)                           │
└──────────────────────────────────────────────────────────────┘
```

## 2. Choix Technologiques & Justifications

### 2.1 Frontend : Next.js 14

**Choix :** Next.js avec App Router

**Justifications :**
- ✅ **React Server Components** : améliore les perfs (moins de JS client)
- ✅ **SSR/SSG** : meilleur SEO et performances initiales
- ✅ **Routing intégré** : i18n natif avec App Router
- ✅ **Image Optimization** : next/image pour WebP automatique
- ✅ **Edge Runtime** : déploiement Vercel/Cloudflare possible
- ✅ **Écosystème mature** : nombreuses bibliothèques, communauté active

**Alternatives considérées :**
- ❌ **SvelteKit** : moins mature pour i18n, écosystème plus petit
- ❌ **Remix** : excellent mais moins d'optimisations image built-in
- ❌ **Astro** : parfait pour static mais moins pour interactivité (carte)

### 2.2 Backend : FastAPI

**Choix :** FastAPI (Python)

**Justifications :**
- ✅ **Performance** : async/await natif, comparable à Node.js
- ✅ **OpenAPI automatique** : doc interactive built-in
- ✅ **Validation** : Pydantic v2 ultra-performant
- ✅ **Typage fort** : Python 3.11+ avec type hints
- ✅ **Écosystème Python** : librairies ML/data si future IA
- ✅ **Simplicité** : moins de boilerplate que NestJS

**Alternatives considérées :**
- ❌ **NestJS** : excellent mais plus verbeux (decorators), overhead TypeScript
- ❌ **Express** : trop basique, pas de validation built-in
- ❌ **Django REST** : trop lourd pour un simple REST API

### 2.3 Carte : MapLibre GL JS

**Choix :** MapLibre GL JS + MapTiler

**Justifications :**
- ✅ **Open-source** : fork libre de Mapbox GL (BSD license)
- ✅ **Vector tiles** : qualité supérieure, zoom infini
- ✅ **Performances** : GPU-accelerated, WebGL
- ✅ **Customisation** : contrôle total du style
- ✅ **Pas de vendor lock-in** : compatible OpenMapTiles
- ✅ **Gratuit** : MapTiler offre 100k tiles/mois gratuit

**Alternatives considérées :**
- ❌ **Mapbox GL JS** : payant, license propriétaire depuis v2
- ❌ **Leaflet** : raster uniquement (qualité moindre), plus ancien
- ❌ **Google Maps** : coûteux, moins de customisation

### 2.4 Base de données : PostgreSQL

**Choix :** PostgreSQL 16

**Justifications :**
- ✅ **Relationnel** : données structurées (villes, itinéraires)
- ✅ **PostGIS** : extension géospatiale native
- ✅ **Full-text search** : recherche multilingue FR/EN/AR
- ✅ **JSONB** : flexibilité pour données non structurées
- ✅ **Maturité** : 30+ ans, extrêmement stable
- ✅ **Performance** : excellent avec indexation

**Alternatives considérées :**
- ❌ **MongoDB** : moins adapté pour données relationnelles
- ❌ **MySQL** : PostGIS moins mature, full-text search limité
- ❌ **Supabase** : parfait mais on veut contrôle infra

### 2.5 ORM : SQLModel

**Choix :** SQLModel (SQLAlchemy + Pydantic)

**Justifications :**
- ✅ **Typage complet** : validation Pydantic + modèles DB
- ✅ **Une seule définition** : évite duplication modèles
- ✅ **SQLAlchemy 2.0** : performance et type-safety
- ✅ **Simplicité** : moins verbeux que SQLAlchemy pur

**Alternatives considérées :**
- ❌ **Prisma** : excellent mais TypeScript uniquement
- ❌ **SQLAlchemy seul** : plus verbeux, duplication avec Pydantic
- ❌ **Tortoise ORM** : moins mature

## 3. Architecture Détaillée

### 3.1 Frontend (Next.js)

```
apps/web/
├── app/                          # App Router
│   ├── [locale]/                # i18n routing (fr/en/ar)
│   │   ├── page.tsx             # Accueil
│   │   ├── map/page.tsx         # Carte interactive
│   │   ├── city/[slug]/page.tsx # Détail ville
│   │   ├── itineraries/
│   │   ├── quiz/
│   │   └── contact/
│   ├── api/                     # Route handlers Next.js
│   │   └── health/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Map/
│   │   ├── MapClient.tsx        # Client component MapLibre
│   │   ├── Marker.tsx
│   │   └── Cluster.tsx
│   ├── City/
│   │   ├── CityCard.tsx
│   │   ├── CityGallery.tsx
│   │   └── CityHero.tsx
│   ├── ui/                      # shadcn/ui components
│   └── layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── LangSwitcher.tsx
├── lib/
│   ├── api.ts                   # TanStack Query setup
│   ├── utils.ts
│   └── constants.ts
├── messages/                    # i18n
│   ├── fr.json
│   ├── en.json
│   └── ar.json
├── data/
│   ├── cities.geojson          # 10 villes Maroc
│   ├── itineraries.json
│   └── quiz.json
└── public/
    ├── manifest.webmanifest
    ├── robots.txt
    └── images/
```

**Flux de données Frontend :**

```
User Action → React Component → TanStack Query
                                      ↓
                                  API Call
                                      ↓
                              FastAPI Backend
                                      ↓
                              Response (JSON)
                                      ↓
                          Cache + Update UI
```

### 3.2 Backend (FastAPI)

```
apps/api/
├── app/
│   ├── main.py                 # Application FastAPI
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── cities.py
│   │       │   ├── itineraries.py
│   │       │   ├── quiz.py
│   │       │   └── uploads.py
│   │       └── api.py          # Router principal
│   ├── core/
│   │   ├── config.py           # Settings (Pydantic BaseSettings)
│   │   ├── security.py         # JWT, hashing
│   │   ├── deps.py             # Dependencies injection
│   │   └── middleware.py       # CORS, rate limiting
│   ├── models/                 # SQLModel (DB)
│   │   ├── city.py
│   │   ├── itinerary.py
│   │   ├── quiz.py
│   │   └── user.py
│   ├── schemas/                # Pydantic (API)
│   │   ├── city.py
│   │   ├── itinerary.py
│   │   └── quiz.py
│   ├── services/               # Business logic
│   │   ├── city_service.py
│   │   ├── quiz_service.py
│   │   └── storage_service.py
│   └── db/
│       ├── session.py          # SQLModel session
│       └── init_db.py
├── alembic/                    # Migrations
│   ├── versions/
│   └── env.py
├── scripts/
│   └── seed.py                 # Seed data
├── tests/
│   ├── api/
│   ├── services/
│   └── conftest.py
└── requirements.txt
```

**Flux de données Backend :**

```
HTTP Request → FastAPI Router → Validation (Pydantic)
                                        ↓
                                  Service Layer
                                        ↓
                            Database (via SQLModel)
                                        ↓
                            Response Serialization
                                        ↓
                                  HTTP Response
```

### 3.3 Base de Données (PostgreSQL)

**Schéma principal :**

```sql
cities
├── id (UUID, PK)
├── slug (VARCHAR, UNIQUE)
├── name_fr, name_en, name_ar
├── description_fr, description_en, description_ar
├── latitude, longitude (NUMERIC)
├── population (INTEGER)
├── region (VARCHAR)
├── created_at, updated_at (TIMESTAMP)

city_photos
├── id (UUID, PK)
├── city_id (UUID, FK → cities)
├── url (VARCHAR)
├── caption (TEXT)
├── order (INTEGER)

itineraries
├── id (UUID, PK)
├── slug (VARCHAR, UNIQUE)
├── title_fr, title_en, title_ar
├── description_fr, description_en, description_ar
├── duration_days (INTEGER)
├── difficulty (ENUM)
├── city_ids (UUID[])  -- Array de city IDs
├── price_from (DECIMAL)

quiz_questions
├── id (UUID, PK)
├── city_id (UUID, FK → cities)
├── question_fr, question_en, question_ar
├── options (JSONB)  -- [{text_fr, text_en, text_ar}]
├── correct_index (INTEGER)
├── difficulty (ENUM)
├── order (INTEGER)

quiz_attempts
├── id (UUID, PK)
├── player_name (VARCHAR)
├── city_id (UUID, FK → cities)
├── score (INTEGER)
├── answers (JSONB)
├── completed_at (TIMESTAMP)

users (optionnel pour MVP)
├── id (UUID, PK)
├── email (VARCHAR, UNIQUE)
├── hashed_password (VARCHAR)
├── role (ENUM: user, admin)
├── created_at (TIMESTAMP)
```

**Index principaux :**
- `cities.slug` (UNIQUE)
- `cities.latitude, cities.longitude` (GIST - PostGIS)
- `quiz_attempts.score, quiz_attempts.completed_at` (DESC)
- Full-text search : `cities.name_*, cities.description_*`

## 4. Patterns & Pratiques

### 4.1 Separation of Concerns

**Frontend :**
- **Components** : UI pure, props typés
- **Hooks** : logique réutilisable (useFetch, useMap)
- **Services** : appels API (TanStack Query)
- **State** : server state (TanStack) vs UI state (useState)

**Backend :**
- **Routers** : routing, validation basique
- **Services** : business logic, transactions
- **Models** : définition schéma DB
- **Schemas** : validation input/output API

### 4.2 Error Handling

**Frontend :**
```typescript
// TanStack Query + Error Boundary
<QueryErrorBoundary fallback={<ErrorUI />}>
  <CityList />
</QueryErrorBoundary>
```

**Backend :**
```python
# Exception handlers FastAPI
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail}
    )
```

### 4.3 Caching Strategy

**Frontend :**
- TanStack Query : cache 5 min (stale-while-revalidate)
- Next.js : ISR (revalidate: 3600) pour pages villes

**Backend :**
- Redis : cache quiz questions (TTL 1h)
- PostgreSQL : query cache activé

**CDN :**
- Cloudflare : cache images (1 mois)
- MapTiler : cache tiles automatique navigateur

## 5. Sécurité

### 5.1 Frontend

- **CSP strict** : `script-src 'self'; style-src 'self' 'unsafe-inline'`
- **Validation input** : Zod schemas
- **XSS protection** : React escape automatique
- **HTTPS only** : production

### 5.2 Backend

- **CORS** : whitelist origins
- **Rate limiting** : 100 req/min par IP
- **JWT** : access token (15min) + refresh token (7d)
- **SQL injection** : parameterized queries (SQLModel)
- **Input validation** : Pydantic strict

### 5.3 Infrastructure

- **Secrets** : Kubernetes Secrets + Sealed Secrets
- **Network policies** : isoler DB du monde extérieur
- **TLS** : cert-manager + Let's Encrypt
- **Scans** : Trivy (images) + Dependabot (deps)

## 6. Scalabilité

### 6.1 Horizontal Scaling

**Frontend :**
- Stateless (RSC)
- Auto-scaling K8s : 2-10 pods
- CDN pour assets statiques

**Backend :**
- Stateless (JWT)
- Auto-scaling K8s : 3-20 pods
- Load balancer (NGINX Ingress)

**Database :**
- Read replicas (PostgreSQL streaming replication)
- Connection pooling (PgBouncer)

### 6.2 Caching

```
┌─────────┐     ┌─────────┐     ┌──────────────┐     ┌──────────┐
│ Browser │────►│   CDN   │────►│ Next.js Edge │────►│ FastAPI  │
│ Cache   │     │ (CF)    │     │   (Vercel)   │     │ + Redis  │
└─────────┘     └─────────┘     └──────────────┘     └──────────┘
    │               │                   │                    │
    │               │                   │                    ▼
    └───────────────┴───────────────────┴──────────► PostgreSQL
                    (waterfall cache)
```

### 6.3 Performance Budgets

- **Frontend** :
  - FCP < 1.8s
  - LCP < 2.5s
  - TTI < 3.8s
  - Lighthouse score > 90

- **Backend** :
  - p50 < 100ms
  - p95 < 500ms
  - p99 < 1s

- **API payload** : < 1 Mo (eco-conception)

## 7. Observabilité

### 7.1 Logs

- **Format** : JSON structuré
- **Niveaux** : DEBUG (dev), INFO (prod)
- **Agrégation** : Loki
- **Retention** : 30 jours

### 7.2 Metrics

- **Frontend** : Web Vitals → Google Analytics
- **Backend** : Prometheus
  - Request rate, latency, errors
  - DB connections, query duration
  - Cache hit ratio

### 7.3 Traces

- **OpenTelemetry** : frontend + backend
- **Grafana Tempo** : storage
- **Exemplars** : liaison logs ↔ traces

### 7.4 Alertes

- Uptime < 99.5% (PagerDuty)
- Error rate > 1%
- Response time p95 > 1s
- Database connections > 80%

## 8. CI/CD Pipeline

```
┌──────────────┐
│  Git Push    │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────┐
│      GitHub Actions Workflow         │
│                                       │
│  1. Lint (ESLint, Ruff)              │
│  2. Test (Jest, Pytest)              │
│  3. Build (Next, Docker)             │
│  4. Security Scan (Trivy, SAST)      │
│  5. Push images → GHCR               │
│  6. Update Helm values (tag)         │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│          Argo CD (GitOps)            │
│                                       │
│  - Détecte changement Helm repo      │
│  - Sync automatique                  │
│  - Rollout progressif (canary)       │
│  - Healthchecks                      │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│      Kubernetes Cluster (EKS)        │
│                                       │
│  Deployments → ReplicaSets → Pods    │
└──────────────────────────────────────┘
```

## 9. Décisions Architecturales (ADR)

### ADR-001 : Monorepo vs Polyrepo
**Décision** : Monorepo  
**Raison** : Simplicité CI/CD, partage code (types), versioning synchronisé  
**Alternatives** : Polyrepo (overhead gestion deps)

### ADR-002 : REST vs GraphQL
**Décision** : REST  
**Raison** : Simplicité, cache HTTP, OpenAPI standard  
**Alternatives** : GraphQL (over-engineering pour ce cas)

### ADR-003 : SSR vs SPA
**Décision** : SSR (Next.js)  
**Raison** : SEO critique, performance initiale  
**Alternatives** : SPA (SEO difficile)

### ADR-004 : SQL vs NoSQL
**Décision** : SQL (PostgreSQL)  
**Raison** : Données structurées, relations, full-text search  
**Alternatives** : MongoDB (moins adapté)

### ADR-005 : Vector tiles vs Raster
**Décision** : Vector (MapLibre GL)  
**Raison** : Qualité, customisation, performance  
**Alternatives** : Raster (Leaflet, qualité moindre)

---

**Prochaine étape** : voir [API.md](API.md) pour la documentation OpenAPI complète.

