# 🤝 Guide de Contribution - MarocTour

Merci de votre intérêt pour contribuer à MarocTour ! Ce document explique comment participer au projet.

## 📋 Table des matières

- [Code de Conduite](#code-de-conduite)
- [Comment contribuer](#comment-contribuer)
- [Setup développement](#setup-développement)
- [Workflow Git](#workflow-git)
- [Standards de code](#standards-de-code)
- [Tests](#tests)
- [Pull Requests](#pull-requests)

## Code de Conduite

En participant à ce projet, vous acceptez de respecter notre code de conduite :

- 🤝 Soyez respectueux et inclusif
- 💬 Communiquez de manière constructive
- 🎯 Concentrez-vous sur l'amélioration du projet
- 🚫 Aucune discrimination, harcèlement ou comportement inapproprié

## Comment contribuer

### 🐛 Signaler un bug

1. Vérifiez que le bug n'a pas déjà été signalé dans les [Issues](https://github.com/votre-org/MarocTour/issues)
2. Créez une nouvelle issue avec le template "Bug Report"
3. Décrivez clairement :
   - Le comportement attendu
   - Le comportement observé
   - Les étapes pour reproduire
   - Votre environnement (OS, navigateur, versions)

### ✨ Proposer une nouvelle fonctionnalité

1. Créez une issue avec le template "Feature Request"
2. Décrivez :
   - Le problème que cela résout
   - La solution proposée
   - Des alternatives envisagées
3. Attendez les retours de la communauté avant de coder

### 🔧 Corriger un bug ou ajouter une fonctionnalité

1. Commentez sur l'issue pour indiquer que vous travaillez dessus
2. Forkez le repository
3. Créez une branche depuis `develop`
4. Codez et testez
5. Soumettez une Pull Request

## Setup Développement

### Prérequis

- Node.js 20+
- Python 3.11+
- Docker & Docker Compose
- pnpm 8+

### Installation

```bash
# Cloner votre fork
git clone https://github.com/VOTRE-USERNAME/MarocTour.git
cd MarocTour

# Ajouter le remote upstream
git remote add upstream https://github.com/votre-org/MarocTour.git

# Installation complète
make setup

# Ou manuellement :
make install
make docker-up
make migrate
make seed
```

### Lancer en dev

```bash
# Terminal 1 : Backend
make dev-api

# Terminal 2 : Frontend
make dev-web
```

## Workflow Git

### Branches

- `main` : production (protégée)
- `develop` : développement actif
- `feature/nom-feature` : nouvelles fonctionnalités
- `fix/nom-bug` : corrections de bugs
- `docs/nom-doc` : documentation

### Créer une branche

```bash
# Synchroniser avec upstream
git fetch upstream
git checkout develop
git merge upstream/develop

# Créer votre branche
git checkout -b feature/ma-super-feature
```

### Commits

Utilisez des messages de commit clairs et descriptifs suivant la convention [Conventional Commits](https://www.conventionalcommits.org/) :

```
type(scope): description courte

Description détaillée si nécessaire

Fixes #123
```

**Types** :
- `feat`: nouvelle fonctionnalité
- `fix`: correction de bug
- `docs`: documentation
- `style`: formatage (sans changement de code)
- `refactor`: refactoring
- `test`: ajout/modification de tests
- `chore`: tâches maintenance (deps, config)
- `perf`: amélioration de performance

**Exemples** :
```bash
git commit -m "feat(map): add clustering for city markers"
git commit -m "fix(quiz): correct score calculation"
git commit -m "docs(readme): update installation steps"
```

## Standards de Code

### Frontend (TypeScript/React)

- **Style** : Suivre ESLint config
- **Components** : 
  - Client components marqués `'use client'`
  - Utiliser TypeScript strict
  - Props typées avec interfaces
- **Naming** :
  - Components : PascalCase (`CityCard.tsx`)
  - Fonctions/vars : camelCase
  - Constants : UPPER_SNAKE_CASE
- **Imports** : utiliser les alias `@/`

```typescript
// ✅ Bon
import { Button } from '@/components/ui/button';

export interface CityCardProps {
  city: City;
  onClick?: () => void;
}

export function CityCard({ city, onClick }: CityCardProps) {
  return <div onClick={onClick}>{city.name}</div>;
}

// ❌ Mauvais
import { Button } from '../../components/ui/button'; // pas d'alias
export function citycard(props: any) { ... } // naming + any
```

### Backend (Python/FastAPI)

- **Style** : Black + Ruff
- **Type hints** : obligatoires
- **Naming** :
  - Fonctions/vars : snake_case
  - Classes : PascalCase
  - Constants : UPPER_SNAKE_CASE
- **Docstrings** : format Google

```python
# ✅ Bon
def get_city_by_slug(slug: str, session: Session) -> City | None:
    """
    Get city by slug.
    
    Args:
        slug: City slug
        session: Database session
        
    Returns:
        City object or None if not found
    """
    return session.exec(select(City).where(City.slug == slug)).first()

# ❌ Mauvais
def GetCity(slug): # naming + pas de type hints
    return session.query(City).filter_by(slug=slug).first()
```

### SQL/Migrations

- **Naming** : descriptif et horodaté (Alembic auto)
- **Rollback** : toujours fournir un `downgrade()`
- **Indexes** : ajouter pour colonnes recherchées/FK

## Tests

### Frontend

```bash
# Unit tests
cd apps/web
pnpm test

# E2E tests
pnpm test:e2e
```

**Minimum requis** :
- Tester les interactions principales
- Tester les cas d'erreur
- Au moins 70% de couverture

```typescript
// Exemple test
import { render, screen } from '@testing-library/react';
import { CityCard } from './CityCard';

test('renders city name', () => {
  const city = { id: '1', name: 'Marrakech', ... };
  render(<CityCard city={city} />);
  expect(screen.getByText('Marrakech')).toBeInTheDocument();
});
```

### Backend

```bash
cd apps/api
pytest
pytest --cov  # avec couverture
```

**Minimum requis** :
- Tester tous les endpoints
- Tester validation input
- Tester cas d'erreur
- Au moins 80% de couverture

```python
def test_get_city_by_slug(client: TestClient, session: Session):
    """Test getting city by slug"""
    city = City(slug="test", name_fr="Test", ...)
    session.add(city)
    session.commit()
    
    response = client.get("/api/v1/cities/slug/test")
    assert response.status_code == 200
    assert response.json()["slug"] == "test"
```

## Pull Requests

### Avant de soumettre

- [ ] Code respecte les standards
- [ ] Tests ajoutés/mis à jour
- [ ] Tests passent localement
- [ ] Documentation mise à jour si nécessaire
- [ ] Pas de conflits avec `develop`
- [ ] Commits bien formatés

### Soumettre la PR

1. Push votre branche vers votre fork
2. Créez une PR vers `develop` (pas `main`)
3. Remplissez le template de PR
4. Liez l'issue concernée (`Fixes #123`)
5. Demandez une review

### Template PR

```markdown
## Description
Brève description des changements

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Tests effectués
- [ ] Tests unitaires
- [ ] Tests E2E
- [ ] Tests manuels

## Checklist
- [ ] Code respecte les standards
- [ ] Tests ajoutés
- [ ] Documentation mise à jour
- [ ] Pas de conflits

## Screenshots (si applicable)
[Ajouter captures d'écran]

Fixes #[numéro-issue]
```

### Review

- Soyez patient, les reviews peuvent prendre du temps
- Répondez aux commentaires de manière constructive
- N'hésitez pas à demander des clarifications
- Faites les modifications demandées dans de nouveaux commits

### Merge

Une fois approuvée, votre PR sera mergée par un mainteneur. Merci pour votre contribution ! 🎉

## Ressources

- [Documentation](https://github.com/votre-org/MarocTour/tree/main/docs)
- [Architecture](docs/ARCHITECTURE.md)
- [API](docs/API.md)
- [Deployment](docs/DEPLOYMENT.md)

## Questions ?

- Ouvrez une [Discussion](https://github.com/votre-org/MarocTour/discussions)
- Rejoignez notre [Discord](https://discord.gg/maroctour) (si applicable)
- Contactez-nous : dev@maroctour.ma

---

**Merci de contribuer à MarocTour ! 🇲🇦 ✨**

