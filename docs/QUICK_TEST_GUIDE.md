# Guide Rapide de Test - Fès

## 🚀 Démarrage Rapide pour Tester

### 1. Démarrer les Services

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

**Terminal 3 - Services Docker:**
```bash
docker compose up -d postgres redis
```

### 2. Exécuter les Tests

#### Tests Backend (Pytest)
```bash
cd apps/api
source venv/bin/activate
pytest tests/test_fes.py -v
```

**Résultat attendu :** ✅ 3 tests passent

#### Tests E2E (Playwright)
```bash
cd apps/web
pnpm test:e2e tests/e2e/fes.spec.ts
```

**Résultat attendu :** ✅ 14 tests passent (si serveurs démarrés)

### 3. Test Manuel Rapide

1. **Ouvrir** http://localhost:7001/fr/city/fes
2. **Vérifier** que la page se charge
3. **Scroller** vers le quiz
4. **Compléter** le quiz
5. **Vérifier** le leaderboard

## ✅ Checklist Rapide

- [ ] Backend démarré (port 8000)
- [ ] Frontend démarré (port 7001)
- [ ] PostgreSQL démarré (port 5433)
- [ ] Tests backend passent
- [ ] Tests E2E passent (si serveurs démarrés)
- [ ] Page Fès accessible
- [ ] Quiz fonctionne
- [ ] Leaderboard affiche les scores

## 📋 Tests Disponibles

### Backend
- `test_get_fes_city_by_slug` ✅
- `test_fes_city_exists` ✅
- `test_fes_quiz_top_scores` ✅

### E2E
- 14 tests couvrant navigation, contenu, quiz, leaderboard

### Manuel
- Guide complet dans `docs/TESTING_FES.md`

