# 🚀 Guide de Démarrage Rapide - MarocTour

Ce guide vous permettra de lancer **MarocTour** localement en quelques minutes !

## ⚡ Démarrage Express (5 minutes)

### Prérequis

Assurez-vous d'avoir installé :
- **Node.js 20+** : https://nodejs.org/
- **Python 3.11+** : https://www.python.org/
- **Docker Desktop** : https://www.docker.com/products/docker-desktop
- **pnpm** : `npm install -g pnpm`

### Étape 1 : Cloner le projet

```bash
git clone https://github.com/votre-org/MarocTour.git
cd MarocTour
```

### Étape 2 : Configuration

```bash
# Frontend : copier le fichier d'environnement
cp apps/web/.env.example apps/web/.env.local

# Éditer apps/web/.env.local et ajouter votre clé MapTiler
# Obtenez une clé gratuite sur : https://www.maptiler.com/
# Remplacez "your_maptiler_key_here" par votre vraie clé

# Backend : copier le fichier d'environnement
cp apps/api/.env.example apps/api/.env
# Pas de modification nécessaire pour un démarrage local
```

### Étape 3 : Installation automatique

```bash
# Installation complète avec Make (recommandé)
make setup

# Ou manuellement :
# 1. Installer les dépendances
cd apps/web && pnpm install && cd ../..
cd apps/api && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && cd ../..

# 2. Démarrer les services Docker
docker-compose up -d

# 3. Initialiser la base de données
cd apps/api
source venv/bin/activate  # Windows: venv\Scripts\activate
alembic upgrade head
python scripts/seed.py
cd ../..
```

### Étape 4 : Lancer l'application

**Terminal 1 - Backend :**
```bash
cd apps/api
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend :**
```bash
cd apps/web
pnpm dev
```

### Étape 5 : Accéder à l'application

🎉 **C'est prêt !**

- 🌍 **Frontend** : http://localhost:3000
- 📡 **API Docs** : http://localhost:8000/docs
- 📊 **Grafana** : http://localhost:3001 (admin/admin)
- 🗄️ **MinIO** : http://localhost:9001 (minioadmin/minioadmin)

## 📚 Prochaines étapes

### Explorer l'application

1. **Page d'accueil** : Découvrez l'interface et les fonctionnalités
2. **Carte interactive** : Naviguez vers `/map` et explorez les villes
3. **Quiz** : Testez vos connaissances avec le quiz sur Nador
4. **API** : Consultez la documentation interactive sur http://localhost:8000/docs

### Développer

```bash
# Créer une nouvelle branche
git checkout -b feature/ma-feature

# Lancer les tests
make test

# Vérifier le code
make lint

# Formater le code
make format
```

### Voir les logs

```bash
# Tous les services Docker
docker-compose logs -f

# Frontend uniquement
cd apps/web && pnpm dev

# Backend uniquement
cd apps/api && uvicorn app.main:app --reload
```

## 🆘 Problèmes Courants

### Port déjà utilisé

```bash
# Trouver le processus utilisant le port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Le tuer
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Docker ne démarre pas

```bash
# Vérifier que Docker est lancé
docker ps

# Redémarrer Docker Desktop si nécessaire
# Puis relancer :
docker-compose down
docker-compose up -d
```

### Erreur de connexion à la DB

```bash
# Attendre que PostgreSQL soit prêt
docker-compose logs postgres

# Réappliquer les migrations
cd apps/api
alembic upgrade head
```

### Clé MapTiler manquante

Si la carte ne s'affiche pas :
1. Vérifiez `apps/web/.env.local`
2. Assurez-vous que `NEXT_PUBLIC_MAPTILER_KEY` est défini
3. Obtenez une clé gratuite sur https://www.maptiler.com/
4. Redémarrez le serveur Next.js

### Erreurs Python

```bash
# Vérifier que le venv est activé
which python  # doit pointer vers ./venv/bin/python

# Réinstaller les dépendances
pip install -r requirements.txt --force-reinstall
```

## 🛠️ Commandes Utiles

```bash
# Voir toutes les commandes disponibles
make help

# Arrêter tous les services
make docker-down

# Nettoyer le projet
make clean

# Voir le statut des services
make status

# Rebuild les images Docker
make build

# Relancer les migrations
make migrate

# Re-peupler la DB
make seed
```

## 📖 Documentation Complète

- [README principal](README.md) - Vue d'ensemble
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - Architecture technique
- [API.md](docs/API.md) - Documentation API
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) - Guide de déploiement
- [CONTRIBUTING.md](CONTRIBUTING.md) - Guide de contribution

## 💬 Besoin d'aide ?

- 📧 Email : dev@maroctour.ma
- 🐛 Issues : https://github.com/votre-org/MarocTour/issues
- 💬 Discussions : https://github.com/votre-org/MarocTour/discussions

---

**Bon développement avec MarocTour ! 🇲🇦✨**

