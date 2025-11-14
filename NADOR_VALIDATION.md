# 🔍 Checklist de Validation - Fonctionnalité Nador

## ✅ Checklist de Validation (10 items)

### 1. Navigation depuis la carte
- [ ] Les marqueurs de la carte affichent des popups au clic
- [ ] Le bouton "🏛️ Découvrir [Ville]" est visible dans chaque popup
- [ ] Clic sur le marqueur Nador ouvre une nouvelle page `/city/nador`
- [ ] Support du clavier (Enter/Space) sur les marqueurs

### 2. Page Nador - Structure
- [ ] La page `/city/nador` se charge sans erreur (HTTP 200)
- [ ] Section Hero avec titre "Nador" et sous-titre visible
- [ ] Navigation interne (Histoire, Quiz, Informations) fonctionne
- [ ] Bouton retour vers la carte fonctionne

### 3. Contenu Historique
- [ ] Au moins 5 sections historiques affichées (Antiquité → Moderne)
- [ ] Contenu détaillé pour chaque période (minimum 150 mots par section)
- [ ] Mentions historiques clés : Phéniciens, Abdelkrim, Protectorat espagnol

### 4. Quiz Interactif
- [ ] Quiz avec exactement 10 questions affiché
- [ ] Chaque question a 4 choix de réponse (A, B, C, D)
- [ ] Système de soumission → explication → navigation fonctionne
- [ ] Score final et possibilité de recommencer

### 5. API et Données
- [ ] Endpoint `/api/cities/nador` retourne JSON valide
- [ ] Structure conforme au schéma (slug, title, hero, history, quiz, meta)
- [ ] Toutes les questions ont une explanation cohérente
- [ ] Sources et dernière mise à jour présentes

### 6. Responsive et Accessibilité
- [ ] Page fonctionne sur mobile (viewport 375px)
- [ ] Navigation au clavier possible
- [ ] Attributs ARIA présents sur les éléments interactifs
- [ ] Contraste et lisibilité respectés

### 7. Performance
- [ ] Page se charge en moins de 3 secondes (dev local)
- [ ] Quiz réagit instantanément aux interactions
- [ ] Pas d'erreurs JavaScript dans la console
- [ ] Images optimisées (si présentes)

### 8. Docker Dev
- [ ] `docker-compose -f docker-compose.dev.yml up` lance l'environnement
- [ ] Hot reload fonctionne (modification de fichier → rechargement auto)
- [ ] Application accessible sur http://localhost:7001
- [ ] Bind mounts préservent les `node_modules`

### 9. Tests E2E
- [ ] Tests Playwright passent sans erreur
- [ ] Test de navigation carte → Nador → quiz fonctionne
- [ ] Test API vérifie la structure JSON
- [ ] Tests responsive et accessibilité passent

### 10. Production Ready
- [ ] Métadonnées SEO présentes (title, description, og:image)
- [ ] Pas de `console.log` en production
- [ ] Gestion d'erreur si API échoue
- [ ] Variables d'environnement configurées

## 🛠️ Commandes de Validation

### Démarrage en mode développement
```bash
# Démarrage classique
cd apps/web
npm run dev

# Ou avec Docker
docker-compose -f docker-compose.dev.yml up --build
```

### Tests API
```bash
# Test de l'endpoint Nador
curl -s http://localhost:7001/api/cities/nador | jq .

# Vérification de la structure
curl -s http://localhost:7001/api/cities/nador | jq '.quiz | length'  # Doit retourner 10

# Test de performance
curl -w "@-" -o /dev/null -s http://localhost:7001/city/nador <<< "time_total: %{time_total}s"
```

### Tests E2E
```bash
# Lancer les tests Playwright
cd apps/web
npx playwright test tests/e2e/nador.spec.ts

# Tests en mode interactif
npx playwright test tests/e2e/nador.spec.ts --ui

# Tests avec rapport
npx playwright test tests/e2e/nador.spec.ts --reporter=html
```

### Vérifications Docker
```bash
# Vérifier que les conteneurs sont lancés
docker-compose -f docker-compose.dev.yml ps

# Vérifier les logs
docker-compose -f docker-compose.dev.yml logs web

# Test de santé du conteneur web
docker-compose -f docker-compose.dev.yml exec web curl -f http://localhost:7001/api/cities/nador

# Vérifier le bind mount (hot reload)
docker-compose -f docker-compose.dev.yml exec web ls -la /app/app/city/nador/
```

### Tests de performance
```bash
# Test de charge basique (nécessite apache2-utils)
ab -n 100 -c 10 http://localhost:7001/city/nador

# Analyse bundle (si build disponible)
cd apps/web
npm run build
npm run analyze
```

### Vérifications de contenu
```bash
# Vérifier que le contenu historique est présent
curl -s http://localhost:7001/api/cities/nador | jq '.history[].title'

# Vérifier le nombre de questions
curl -s http://localhost:7001/api/cities/nador | jq '.quiz | length'

# Vérifier les sources
curl -s http://localhost:7001/api/cities/nador | jq '.meta.sources'
```

## 🚨 Résolution des Problèmes Courants

### Erreur: Page ne se charge pas
```bash
# Vérifier que le serveur tourne
curl -I http://localhost:7001/city/nador

# Vérifier les logs Next.js
cd apps/web && npm run dev
```

### Erreur: API ne répond pas
```bash
# Test direct de l'API
curl -v http://localhost:7001/api/cities/nador

# Vérifier la route dans le code
ls -la apps/web/app/api/cities/nador/
```

### Erreur: Quiz ne fonctionne pas
```bash
# Vérifier que les données du quiz sont valides
curl -s http://localhost:7001/api/cities/nador | jq '.quiz[0]'

# Vérifier les composants React
cd apps/web && npm run type-check
```

### Erreur: Docker ne démarre pas
```bash
# Nettoyer et rebuilder
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml build --no-cache
docker-compose -f docker-compose.dev.yml up

# Vérifier les volumes
docker volume ls | grep maroctour
```

### Erreur: Hot reload ne fonctionne pas
```bash
# Vérifier les variables d'environnement dans le conteneur
docker-compose -f docker-compose.dev.yml exec web env | grep CHOKIDAR

# Redémarrer avec polling forcé
docker-compose -f docker-compose.dev.yml restart web
```

## 📊 Métriques de Succès

- **Performance** : Page se charge en < 3s
- **Quiz** : 10 questions avec explications cohérentes
- **Histoire** : 6 sections détaillées (800+ mots total)
- **Tests** : 100% des tests E2E passent
- **Responsive** : Fonctionne sur mobile et desktop
- **Accessibilité** : Score Lighthouse > 90
- **Docker** : Hot reload fonctionne en < 2s

## 🎯 Validation Finale

Une fois tous les éléments cochés :
1. Tester le parcours complet : Carte → Clic Nador → Lecture histoire → Quiz complet
2. Vérifier sur mobile et desktop
3. Lancer la suite de tests E2E
4. Valider les performances et l'accessibilité

**La fonctionnalité est validée si tous les tests passent et l'expérience utilisateur est fluide ! ✅**
