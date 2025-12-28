# Résumé des Tests - Fès Feature Integration

## ✅ Tests Créés

### 1. Tests E2E (Playwright)
**Fichier :** `apps/web/tests/e2e/fes.spec.ts`

**14 tests créés couvrant :**
- Navigation depuis la carte
- Navigation directe
- Hero section avec images
- Contenu historique (6 périodes)
- Section présentation
- Quiz complet (10 questions)
- Fonctionnalité du quiz
- Leaderboard
- Navigation retour
- Validation API JSON
- Navigation interne
- Responsive design
- Accessibilité clavier
- Images de fond

### 2. Tests Backend (Pytest)
**Fichier :** `apps/api/tests/test_fes.py`

**3 tests créés :**
- Récupération de Fès par slug
- Vérification que Fès existe dans la liste
- Top scores pour le quiz Fès

### 3. Documentation de Test Manuel
**Fichier :** `docs/TESTING_FES.md`

Guide complet avec checklist détaillée pour validation manuelle.

## 🚀 Comment Exécuter les Tests

### Prérequis
1. **Démarrer le backend :**
   ```bash
   cd apps/api
   source venv/bin/activate
   uvicorn app.main:app --reload --port 8000
   ```

2. **Démarrer le frontend :**
   ```bash
   cd apps/web
   pnpm dev
   ```

3. **Démarrer les services Docker :**
   ```bash
   docker compose up -d postgres redis
   ```

### Tests E2E

```bash
cd apps/web
pnpm test:e2e tests/e2e/fes.spec.ts
```

**Ou pour tous les tests E2E :**
```bash
pnpm test:e2e
```

### Tests Backend

```bash
cd apps/api
source venv/bin/activate
pytest tests/test_fes.py -v
```

**Ou pour tous les tests :**
```bash
pytest tests/ -v
```

### Tests avec Makefile

```bash
# Tous les tests
make test

# Tests E2E uniquement
cd apps/web && pnpm test:e2e
```

## 📊 Résultats Attendus

### Tests E2E
- ✅ 14 tests devraient passer
- ⚠️ Certains tests peuvent nécessiter des ajustements selon l'environnement

### Tests Backend
- ✅ 3 tests devraient passer
- ⚠️ Nécessite que Fès soit dans la base de données

## 🔍 Points de Vérification

### Fonctionnalités Testées

1. **Navigation**
   - ✅ Depuis la carte
   - ✅ Directe via URL
   - ✅ Retour à la carte

2. **Contenu**
   - ✅ Hero section
   - ✅ Présentation
   - ✅ Histoire (6 périodes)
   - ✅ Images de fond

3. **Quiz**
   - ✅ Affichage
   - ✅ 10 questions
   - ✅ Validation des réponses
   - ✅ Calcul du score
   - ✅ Soumission au backend

4. **Leaderboard**
   - ✅ Affichage
   - ✅ Tri des scores
   - ✅ Statistiques
   - ✅ Backend integration

5. **API**
   - ✅ Endpoint `/api/cities/fes`
   - ✅ Structure JSON valide
   - ✅ 10 questions de quiz
   - ✅ 6 périodes historiques

6. **Responsive & Accessibilité**
   - ✅ Mobile (375x667)
   - ✅ Tablette (768x1024)
   - ✅ Desktop (1920x1080)
   - ✅ Navigation clavier

## 🐛 Dépannage

### Tests E2E échouent
- Vérifier que le frontend est démarré sur le port 7001
- Vérifier que les sélecteurs CSS sont corrects
- Vérifier les timeouts si la page est lente

### Tests Backend échouent
- Vérifier que le backend est démarré sur le port 8000
- Vérifier que la base de données est accessible
- Vérifier que Fès est dans la base de données (run `make seed`)

### Erreurs de connexion
- Vérifier que Docker est démarré
- Vérifier que PostgreSQL est accessible
- Vérifier les variables d'environnement

## 📝 Checklist de Validation

- [ ] Tests E2E créés et documentés
- [ ] Tests backend créés
- [ ] Documentation de test manuel créée
- [ ] Tests peuvent être exécutés
- [ ] Guide de test disponible
- [ ] Parcours utilisateur documenté

## 🎯 Prochaines Étapes

1. **Exécuter les tests** avec les serveurs démarrés
2. **Corriger les échecs** éventuels
3. **Valider manuellement** avec le guide de test
4. **Documenter les résultats** dans TESTING_FES.md

