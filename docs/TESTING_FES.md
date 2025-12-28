# Guide de Test - Fès Feature Integration

Ce document décrit les tests à effectuer pour valider l'intégration complète de la fonctionnalité Fès.

## 📋 Tests Automatisés

### Tests E2E (Playwright)

Exécuter les tests end-to-end pour Fès :

```bash
cd apps/web
pnpm test:e2e tests/e2e/fes.spec.ts
```

**Tests couverts :**
- ✅ Navigation depuis la carte
- ✅ Navigation directe vers la page
- ✅ Hero section avec images
- ✅ Contenu historique complet
- ✅ Section présentation
- ✅ Quiz avec 10 questions
- ✅ Fonctionnalité complète du quiz
- ✅ Leaderboard
- ✅ Navigation retour
- ✅ API retourne JSON valide
- ✅ Navigation interne
- ✅ Responsive design
- ✅ Accessibilité clavier

### Tests Backend (Pytest)

Exécuter les tests backend pour Fès :

```bash
cd apps/api
source venv/bin/activate
pytest tests/test_fes.py -v
```

**Tests couverts :**
- ✅ Récupération de Fès par slug
- ✅ Fès présent dans la liste des villes
- ✅ Top scores pour le quiz Fès

## 🧪 Tests Manuels - Parcours Utilisateur Complet

### 1. Navigation et Accès

#### 1.1 Depuis la page d'accueil
- [ ] Aller sur http://localhost:7001
- [ ] Cliquer sur "Carte" ou naviguer vers `/map`
- [ ] Vérifier que le marqueur Fès est visible sur la carte
- [ ] Cliquer sur le marqueur Fès
- [ ] Vérifier que le popup apparaît avec "Découvrir Fès"
- [ ] Cliquer sur "Découvrir Fès"
- [ ] Vérifier la redirection vers `/fr/city/fes`

#### 1.2 Navigation directe
- [ ] Aller directement sur http://localhost:7001/fr/city/fes
- [ ] Vérifier que la page se charge sans erreur
- [ ] Vérifier que le titre "Fès" est visible

### 2. Hero Section

- [ ] Vérifier que les deux images de fond sont visibles (médina et tanneries)
- [ ] Vérifier que le titre "Fès" est lisible
- [ ] Vérifier que le sous-titre "Capitale spirituelle..." est visible
- [ ] Vérifier les 3 badges d'information :
  - [ ] Région Fès-Meknès
  - [ ] 1.15 Millions d'habitants
  - [ ] Capitale Spirituelle
- [ ] Vérifier que le bouton "Retour à la carte" fonctionne

### 3. Navigation Interne

- [ ] Vérifier que la barre de navigation sticky est visible
- [ ] Cliquer sur "Présentation" → Vérifier le scroll vers la section
- [ ] Cliquer sur "Histoire" → Vérifier le scroll vers la section
- [ ] Cliquer sur "Quiz" → Vérifier le scroll vers la section
- [ ] Cliquer sur "Classement" → Vérifier le scroll vers la section

### 4. Section Présentation

- [ ] Vérifier que la section est visible
- [ ] Vérifier le titre "La Capitale Spirituelle"
- [ ] Vérifier que le texte de présentation est complet et lisible
- [ ] Vérifier les mentions importantes :
  - [ ] "789 par Idris Ier"
  - [ ] "patrimoine mondial de l'UNESCO"
  - [ ] "Université Al Quaraouiyine"
  - [ ] "1.15 Millions d'habitants"

### 5. Section Histoire

- [ ] Vérifier que la section est visible
- [ ] Vérifier le titre "Une Histoire Millénaire"
- [ ] Vérifier que les 6 périodes historiques sont présentes :
  - [ ] Fondation par Idris Ier (789)
  - [ ] L'Expansion sous Idris II (808-828)
  - [ ] Fondation de l'Université Al Quaraouiyine (859)
  - [ ] L'Âge d'Or Mérinide (XIIIe-XVe siècles)
  - [ ] Patrimoine Mondial UNESCO (1981)
  - [ ] Fès Aujourd'hui
- [ ] Vérifier que la timeline verticale est visible
- [ ] Vérifier que les cartes historiques sont bien formatées
- [ ] Vérifier que le texte historique est complet et lisible

### 6. Section Quiz

#### 6.1 Affichage du Quiz
- [ ] Vérifier que la section quiz est visible
- [ ] Vérifier le titre "Testez vos Connaissances"
- [ ] Vérifier la description "10 questions"
- [ ] Vérifier que le composant Quiz est chargé

#### 6.2 Fonctionnement du Quiz
- [ ] Entrer un nom de joueur (ex: "Test User")
- [ ] Cliquer sur "Commencer le quiz"
- [ ] Vérifier que la première question s'affiche
- [ ] Vérifier qu'il y a 4 choix de réponse (A, B, C, D)
- [ ] Sélectionner une réponse
- [ ] Cliquer sur "Soumettre"
- [ ] Vérifier que l'explication apparaît
- [ ] Vérifier que la réponse correcte est mise en évidence (vert)
- [ ] Vérifier que la réponse incorrecte est mise en évidence (rouge)
- [ ] Cliquer sur "Suivant"
- [ ] Répéter pour les 10 questions

#### 6.3 Validation des Réponses
- [ ] Répondre correctement à toutes les questions
- [ ] Vérifier que le score final est 10/10 (100%)
- [ ] Répondre incorrectement à quelques questions
- [ ] Vérifier que le score est calculé correctement
- [ ] Vérifier que le temps passé est affiché

#### 6.4 Soumission au Backend
- [ ] Compléter le quiz
- [ ] Ouvrir la console du navigateur (F12)
- [ ] Vérifier qu'il n'y a pas d'erreurs
- [ ] Vérifier le message "Score submitted successfully!" dans la console
- [ ] Vérifier que le score apparaît dans le leaderboard

### 7. Section Leaderboard

#### 7.1 Affichage
- [ ] Vérifier que la section classement est visible
- [ ] Vérifier le titre "Classement - Quiz Fès"
- [ ] Vérifier que le score actuel du joueur est affiché (si un quiz a été complété)

#### 7.2 Fonctionnalités
- [ ] Vérifier que les top 10 scores sont affichés
- [ ] Vérifier le tri (par pourcentage décroissant, puis par temps)
- [ ] Vérifier les icônes de classement (Trophée, Médaille, Award)
- [ ] Vérifier les niveaux de joueur (Expert, Maître, Avancé, etc.)
- [ ] Vérifier les statistiques globales :
  - [ ] Nombre de participants
  - [ ] Score moyen
  - [ ] Temps moyen

#### 7.3 Backend Integration
- [ ] Vérifier que les scores sont chargés depuis le backend
- [ ] Vérifier le fallback vers localStorage si le backend est indisponible
- [ ] Vérifier que les nouveaux scores apparaissent après soumission

### 8. Page Dédiée des Scores

- [ ] Naviguer vers `/fr/quiz/fes/scores`
- [ ] Vérifier que la page se charge correctement
- [ ] Vérifier que le leaderboard est affiché
- [ ] Vérifier que les scores sont les mêmes que sur la page principale

### 9. API Endpoints

#### 9.1 API Frontend
- [ ] Tester `/api/cities/fes`
- [ ] Vérifier que la réponse JSON est valide
- [ ] Vérifier la structure :
  - [ ] `slug: "fes"`
  - [ ] `title: "Fès"`
  - [ ] `hero` avec `title` et `subtitle`
  - [ ] `history` avec 6 éléments
  - [ ] `quiz` avec 10 questions
  - [ ] `meta` avec sources

#### 9.2 API Backend
- [ ] Tester `GET /api/v1/cities/slug/fes`
- [ ] Vérifier que la ville Fès est retournée
- [ ] Tester `GET /api/v1/quiz/top-scores?city_id={fes_city_id}`
- [ ] Vérifier que les scores sont retournés
- [ ] Tester `POST /api/v1/quiz/attempt` avec city_id de Fès
- [ ] Vérifier que le score est enregistré

### 10. Responsive Design

#### 10.1 Mobile (375x667)
- [ ] Vérifier que la page est lisible sur mobile
- [ ] Vérifier que les images s'adaptent
- [ ] Vérifier que la navigation fonctionne
- [ ] Vérifier que le quiz est utilisable
- [ ] Vérifier que le leaderboard est lisible

#### 10.2 Tablette (768x1024)
- [ ] Vérifier que la mise en page est adaptée
- [ ] Vérifier que tous les éléments sont visibles

#### 10.3 Desktop (1920x1080)
- [ ] Vérifier que la mise en page est optimale
- [ ] Vérifier que les images sont nettes

### 11. Accessibilité

- [ ] Tester la navigation au clavier (Tab, Enter)
- [ ] Vérifier que tous les éléments interactifs sont accessibles
- [ ] Vérifier les contrastes de couleurs
- [ ] Tester avec un lecteur d'écran (si disponible)

### 12. Performance

- [ ] Vérifier que la page se charge rapidement (< 3 secondes)
- [ ] Vérifier que les images sont optimisées
- [ ] Vérifier qu'il n'y a pas d'erreurs dans la console
- [ ] Vérifier que les requêtes API sont rapides

### 13. Images

- [ ] Vérifier que `medina.jpg` est chargée (hero gauche)
- [ ] Vérifier que `tanneries.jpg` est chargée (hero droite)
- [ ] Vérifier que `history_foundation.jpg` est chargée (section histoire)
- [ ] Vérifier que les images WebP sont utilisées si disponibles
- [ ] Vérifier que les fallback gradients s'affichent si images manquantes

### 14. Intégration Complète

#### Parcours Utilisateur Complet
1. [ ] Arriver sur la page d'accueil
2. [ ] Naviguer vers la carte
3. [ ] Cliquer sur le marqueur Fès
4. [ ] Arriver sur la page Fès
5. [ ] Lire la présentation
6. [ ] Lire l'histoire
7. [ ] Faire le quiz complet
8. [ ] Voir son score dans le leaderboard
9. [ ] Naviguer vers la page dédiée des scores
10. [ ] Retourner à la carte

## 🐛 Points de Vérification Spécifiques

### Erreurs Communes à Vérifier
- [ ] Pas d'erreurs 404 pour les images
- [ ] Pas d'erreurs CORS dans la console
- [ ] Pas d'erreurs de connexion au backend
- [ ] Pas d'erreurs de validation de formulaire
- [ ] Pas d'erreurs TypeScript/ESLint

### Données à Vérifier
- [ ] Toutes les dates historiques sont correctes
- [ ] Toutes les questions du quiz ont 4 choix
- [ ] Toutes les questions ont une explication
- [ ] Les `correct_index` sont valides (0-3)
- [ ] Les textes sont sans fautes d'orthographe

## ✅ Checklist de Validation Finale

- [ ] Tous les tests E2E passent
- [ ] Tous les tests backend passent
- [ ] Le parcours utilisateur complet fonctionne
- [ ] Aucune erreur dans la console
- [ ] Les images sont chargées correctement
- [ ] Le quiz fonctionne de bout en bout
- [ ] Le leaderboard affiche les scores
- [ ] La soumission au backend fonctionne
- [ ] Le design est responsive
- [ ] L'accessibilité est respectée

## 📝 Notes de Test

**Date du test :** _______________

**Testeur :** _______________

**Environnement :**
- Frontend : http://localhost:7001
- Backend : http://localhost:8000
- Navigateur : _______________

**Résultats :**
- Tests E2E : [ ] Passent [ ] Échouent
- Tests Backend : [ ] Passent [ ] Échouent
- Tests Manuels : [ ] Tous passent [ ] Problèmes identifiés

**Problèmes identifiés :**
1. 
2. 
3. 

**Commentaires :**
_________________________________________________
_________________________________________________

