# 🇲🇦 MarocTour - Plateforme de Découverte Touristique du Maroc

> Application full-stack moderne avec carte interactive, itinéraires touristiques et quiz culturels.

## 📋 Vue d'ensemble

MarocTour est une plateforme web permettant de découvrir les villes et régions du Maroc à travers une carte interactive vectorielle, des itinéraires personnalisés et des quiz culturels. L'application supporte le multilinguisme (FR/EN/AR) et offre une expérience optimale sur tous les appareils.

## 🏙️ Villes Implémentées

Actuellement, **5 villes marocaines** sont entièrement fonctionnelles avec pages dédiées, quiz interactifs et leaderboards :

| Ville | Page Dédiée | Quiz | Leaderboard | Images | Statut |
|-------|-------------|------|-------------|--------|--------|
| **Fès** | ✅ | ✅ (10 questions) | ✅ | ✅ | Production |
| **Nador** | ✅ | ✅ (10 questions) | ✅ | ✅ | Production |
| **Casablanca** | ✅ | ✅ (10 questions) | ✅ | ✅ | Production |
| **Kénitra** | ✅ | ✅ (10 questions) | ✅ | ✅ | Production |
| **Meknès** | ✅ | ✅ (10 questions) | ✅ | ✅ | Production |

Chaque ville dispose de :
- 📜 Contenu historique enrichi avec timeline
- 🖼️ Images historiques authentiques
- 🎯 Quiz interactif de 10 questions
- 🏆 Système de classement (leaderboard)
- 🌍 Intégration complète avec le backend

## 🏗️ Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Next.js App   │◄────►│   FastAPI       │◄────►│   PostgreSQL    │
│   (Frontend)    │      │   (Backend)     │      │   (Database)    │
│                 │      │                 │      │                 │
│  - SSR/RSC      │      │  - OpenAPI      │      │  - SQLModel     │
│  - MapLibre GL  │      │  - Validation   │      │  - Migrations   │
│  - TanStack Q   │      │  - Auth         │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
         │                        │                         │
         │                        │                         │
         ▼                        ▼                         ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   MapTiler      │      │   MinIO (S3)    │      │   Redis         │
│   (Tiles)       │      │   (Storage)     │      │   (Cache)       │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

## 🚀 Stack Technologique

### Frontend
- **Next.js 14** (App Router, RSC, TypeScript)
- **Tailwind CSS** + **shadcn/ui**
- **MapLibre GL JS** (cartes vectorielles)
- **TanStack Query** (state management)
- **next-intl** (i18n FR/EN/AR)
- **PWA** (Workbox)

### Backend
- **FastAPI** (Python 3.11+)
- **SQLModel** (ORM)
- **Pydantic v2** (validation)
- **Uvicorn** + **Gunicorn**
- **Alembic** (migrations)

### Base de données & Storage
- **PostgreSQL 16**
- **Redis 7** (cache & sessions)
- **MinIO** (S3-compatible object storage)

### DevOps & Infrastructure
- **Docker** + **Docker Compose**
- **Kubernetes** + **Helm**
- **GitHub Actions** (CI/CD)
- **Argo CD** (GitOps)
- **Prometheus** + **Grafana** (monitoring)
- **Loki** + **Tempo** (logs & traces)

## 📁 Structure du Projet

```
MarocTour/
├── apps/
│   ├── web/                    # Frontend Next.js
│   │   ├── app/                # App Router pages
│   │   ├── components/         # Composants React
│   │   ├── lib/                # Utilitaires
│   │   ├── public/             # Assets statiques
│   │   ├── messages/           # Fichiers i18n
│   │   └── data/               # Données statiques (GeoJSON, etc.)
│   └── api/                    # Backend FastAPI
│       ├── app/
│       │   ├── api/            # Endpoints
│       │   ├── core/           # Config & sécurité
│       │   ├── models/         # Modèles DB
│       │   ├── schemas/        # Schémas Pydantic
│       │   └── services/       # Logique métier
│       ├── alembic/            # Migrations
│       └── tests/              # Tests backend
├── packages/
│   └── ui/                     # Design system partagé (optionnel)
├── infra/
│   ├── helm/                   # Charts Helm
│   │   ├── maroctour-web/
│   │   ├── maroctour-api/
│   │   └── postgres/
│   ├── k8s/                    # Manifests K8s bruts
│   └── terraform/              # Infrastructure as Code
├── scripts/                    # Scripts utilitaires
│   ├── seed.py
│   └── deploy.sh
├── docs/                       # Documentation
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── DEPLOYMENT.md
├── .github/
│   └── workflows/              # GitHub Actions
├── docker-compose.yml          # Dev local
└── README.md                   # Ce fichier
```

## 🛠️ Prérequis

- **Node.js** 20+ & **pnpm** 8+
- **Python** 3.11+
- **Docker** & **Docker Compose**
- **PostgreSQL** 16+ (ou via Docker)
- Clé API **MapTiler** (gratuite : https://www.maptiler.com/)

## ⚡ Démarrage Rapide

### 1. Cloner et installer les dépendances

```bash
# Cloner le repo
git clone https://github.com/votre-org/MarocTour.git
cd MarocTour

# Frontend
cd apps/web
pnpm install
cp .env.example .env.local
# Éditer .env.local avec votre clé MapTiler

# Backend
cd ../api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

### 2. Démarrer les services via Docker Compose

```bash
# À la racine du projet
docker-compose up -d

# Vérifier que tout tourne
docker-compose ps
```

Cela démarre :
- PostgreSQL (port 5432)
- Redis (port 6379)
- MinIO (port 9000)
- Prometheus (port 9090)
- Grafana (port 3001)

### 3. Initialiser la base de données

```bash
cd apps/api

# Appliquer les migrations
alembic upgrade head

# Peupler avec des données de démo
python scripts/seed.py
```

### 4. Lancer l'application

**Terminal 1 - Backend:**
```bash
cd apps/api
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd apps/web
pnpm dev
```

Accédez à :
- 🌍 **Frontend** : http://localhost:3000
- 📡 **API Docs** : http://localhost:8000/docs
- 📊 **Grafana** : http://localhost:3001 (admin/admin)

## 🔑 Variables d'Environnement

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MAPTILER_KEY=votre_cle_ici
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend (.env)

```env
DATABASE_URL=postgresql://maroctour:maroctour@localhost:5432/maroctour
REDIS_URL=redis://localhost:6379/0
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
SECRET_KEY=votre_secret_jwt_super_long_et_securise
```

## 🧪 Tests

### Frontend
```bash
cd apps/web
pnpm test              # Tests unitaires
pnpm test:e2e          # Tests E2E Playwright
pnpm lint              # Linter
```

### Backend
```bash
cd apps/api
pytest                 # Tous les tests
pytest --cov           # Avec couverture
pytest -v tests/api/   # Tests API uniquement
```

## 🐳 Docker

### Build des images

```bash
# Frontend
docker build -t maroctour-web:latest -f apps/web/Dockerfile .

# Backend
docker build -t maroctour-api:latest -f apps/api/Dockerfile .
```

### Push vers GitHub Container Registry

```bash
docker tag maroctour-web:latest ghcr.io/votre-org/maroctour-web:latest
docker push ghcr.io/votre-org/maroctour-web:latest

docker tag maroctour-api:latest ghcr.io/votre-org/maroctour-api:latest
docker push ghcr.io/votre-org/maroctour-api:latest
```

## ☸️ Déploiement Kubernetes

### Local (Minikube)

```bash
# Démarrer Minikube
minikube start --cpus=4 --memory=8192

# Installer avec Helm
helm install maroctour infra/helm/maroctour \
  --set web.image.tag=latest \
  --set api.image.tag=latest

# Port-forward pour accéder
kubectl port-forward svc/maroctour-web 3000:80
```

### Production (EKS/GKE/AKS)

Voir [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) pour le guide complet.

## 📊 Monitoring

- **Prometheus** : http://localhost:9090
- **Grafana** : http://localhost:3001
- **MinIO Console** : http://localhost:9001

Dashboards préconfigurés :
- Application Metrics
- Database Performance
- API Response Times
- Map Tile Load Times

## 🔒 Sécurité

- ✅ HTTPS obligatoire en production
- ✅ CSP (Content Security Policy) stricte
- ✅ CORS configuré
- ✅ Rate limiting (100 req/min par IP)
- ✅ Validation stricte des inputs (Zod + Pydantic)
- ✅ Secrets via variables d'environnement
- ✅ Scan des dépendances (Dependabot + Trivy)
- ✅ Headers de sécurité (HSTS, X-Frame-Options, etc.)

## 🌍 Internationalisation

L'application supporte 3 langues :
- 🇫🇷 Français (défaut)
- 🇬🇧 English
- 🇲🇦 العربية (Arabe)

Les routes sont préfixées : `/fr/...`, `/en/...`, `/ar/...`

## 🎨 Thème & Design

- Mode clair/sombre automatique
- Design system basé sur shadcn/ui
- Couleurs : palette Maroc (rouge #C1272D, vert #006233, or #FFD700)
- Typographie : Inter (UI) + Amiri (titres arabes)
- Responsive : mobile-first

## 📱 Progressive Web App

L'application peut être installée comme PWA :
- Manifest configuré
- Service Worker (Workbox)
- Cache des pages clés
- Mode hors-ligne partiel

## 🗺️ Carte Interactive

- **MapLibre GL JS** avec tiles vectorielles
- 10 villes principales du Maroc
- Clustering automatique
- Popups accessibles
- Géolocalisation utilisateur
- Contrôles zoom/pan/fullscreen
- Support clavier (accessibilité)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour les guidelines.

## 📄 Licence

MIT License - voir [LICENSE](LICENSE)

## 👥 Équipe

- Développement : Votre équipe
- Design : Votre designer
- DevOps : Votre SRE

## 📞 Support

- 📧 Email : support@maroctour.ma
- 📖 Documentation : https://docs.maroctour.ma
- 🐛 Issues : https://github.com/votre-org/MarocTour/issues

## 🗓️ Roadmap

### MVP (Actuel)
- [x] Carte interactive avec 10 villes
- [x] Pages ville
- [x] Quiz culturels
- [x] i18n FR/EN/AR
- [x] API REST
- [x] CI/CD

### V1.0 (Q1 2025)
- [ ] Auth utilisateurs (OAuth2)
- [ ] Sauvegarde favoris/itinéraires
- [ ] CMS Headless (Sanity)
- [ ] Paiements (réservations)
- [ ] Notifications push

### V1.1+ (Q2 2025)
- [ ] App mobile (React Native)
- [ ] IA recommandations
- [ ] Mode 100% hors-ligne
- [ ] AR (réalité augmentée)
- [ ] Gamification avancée

---

**🎉 Bon développement avec MarocTour !**

---

# 🎓 Projet DevOps Final (ESIEE)

Ce projet respecte la structure demandée pour le projet final DevOps.

## 🏗 Structure du Repo

- `apps/api` : Backend (FastAPI + Python) - correspond au dossier `backend/` du sujet.
- `apps/web` : Frontend (Next.js) - correspond au dossier `frontend/` du sujet.
- `k8s/` : Manifests Kubernetes (Deployment, Service, ConfigMap, Secret).
- `.github/workflows/` : Pipelines CI/CD.

## ☸️ Kubernetes (Raw Manifests)

Les manifests se trouvent dans `k8s/`.
Pour déployer :

```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/postgres-service.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

## 🔄 CI/CD Pipelines

Trois workflows GitHub Actions sont configurés pour automatiser le cycle de vie de développement :

### 1. 🧪 App Tests (`app-tests.yml`)
Déclenché à chaque `push` sur toutes les branches et `pull_request`.
- **Backend Job** :
  - Setup Python 3.11
  - Installation des dépendances (`pip install`)
  - Exécution des tests unitaires avec `pytest`
- **Frontend Job** :
  - Setup Node.js 20
  - Installation des dépendances (`pnpm install`)
  - Linting (`pnpm lint`) et Build (`pnpm build`)
  - Tests unitaires (`pnpm test`)

### 2. 🐳 Build and Push (`build-and-push.yml`)
Déclenché uniquement sur les push vers `main` ou les tags (`v*`).
- Connexion au registre de conteneurs (Docker Hub / GHCR)
- Build des images Docker optimisées (multi-stage)
  - `maroctour-web:latest`
  - `maroctour-api:latest`
- Push des images vers le registre
- Scan de vulnérabilités (Trivy)

### 3. 🚀 Deploy to Kubernetes (`deploy-k8s.yml`)
Déclenché après le succès du build.
- Configuration de `kubectl` avec le cluster cible
- Mise à jour des images dans les déploiements
- Application des manifests (`kubectl apply`)
- Vérification du rollout (`kubectl rollout status`)

### 🔑 Gestion des Secrets
Les informations sensibles sont stockées dans les GitHub Secrets :
- `DOCKER_USERNAME` / `DOCKER_PASSWORD`
- `KUBE_CONFIG` (pour l'accès au cluster)
- `POSTGRES_PASSWORD`



