# 🐛 Guide de Débogage - Carte Interactive

## Statut Actuel
✅ **Composant MapClient amélioré** avec système de fallback OpenStreetMap
✅ **Configuration .env.local** créée avec clé d'exemple
✅ **Serveur Next.js** en marche sur port 7001

## 🔍 Comment Déboguer

### 1. Ouvrir la Console Développeur
- **Chrome/Edge** : F12 ou Ctrl+Shift+I
- **Firefox** : F12 ou Ctrl+Shift+K
- **Safari** : Cmd+Option+I

### 2. Messages à Rechercher
```
🗺️ Utilisation d'OpenStreetMap (fallback)...
🚀 Initialisation de la carte...
```

### 3. États Possibles

**✅ SUCCÈS - Carte Chargée**
```
🗺️ Utilisation d'OpenStreetMap (fallback)...
🚀 Initialisation de la carte...
(Pas d'erreur MapLibre)
```
➡️ **Résultat** : Carte visible avec marqueurs des 10 villes

**❌ ERREUR - Clé MapTiler Invalide**
```
🗺️ Tentative avec MapTiler...
🚀 Initialisation de la carte...
MapLibre error: [Erreur réseau/authentification]
```
➡️ **Solution** : Système de fallback OpenStreetMap activé

**⚠️ AVERTISSEMENT - Ressources Manquantes**
```
GET /images/marker-icon.png 404 (Not Found)
```
➡️ **Impact** : Marqueurs invisibles mais carte fonctionne

## 🛠️ Actions de Correction

### Si la carte reste en chargement :

1. **Vérifier la console pour les erreurs JavaScript**
2. **Rafraîchir la page** (Ctrl+F5)
3. **Vider le cache** du navigateur

### Si les marqueurs ne s'affichent pas :

1. **Créer l'icône manquante** :
```bash
mkdir -p public/images
# Copier une icône de marqueur 32x32px vers public/images/marker-icon.png
```

2. **Ou modifier le composant** pour utiliser des marqueurs par défaut

### Si OpenStreetMap ne charge pas :
- **Vérifier la connexion internet**
- **Désactiver les bloqueurs de publicité** (peuvent bloquer tile.openstreetmap.org)

## 🎯 URLs de Test

- **Page d'accueil** : http://localhost:7001/fr
- **Carte directe** : http://localhost:7001/fr/map
- **API Docs** : http://localhost:8000/docs (si backend lancé)

## 📊 Performance

### Temps de Chargement Attendu :
- **MapTiler** : ~1-3 secondes
- **OpenStreetMap** : ~2-5 secondes (plus lent mais gratuit)

### Tailles des Ressources :
- **MapLibre GL JS** : ~500KB
- **Style MapTiler** : ~50KB
- **Tuiles OpenStreetMap** : Variable selon zoom

## 🔧 Commandes Utiles

```bash
# Redémarrer le serveur Next.js
cd apps/web && pnpm dev

# Vérifier les variables d'environnement
cat .env.local

# Nettoyer le cache Next.js
rm -rf .next && pnpm dev

# Voir les logs du serveur
# (Regarder dans le terminal où tourne `pnpm dev`)
```
