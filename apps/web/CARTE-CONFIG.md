# 🗺️ Configuration de la Carte Interactive

## Problème : Carte ne s'affiche pas

Si la carte ne s'affiche pas, c'est probablement parce que la **clé MapTiler** n'est pas configurée.

## ⚡ Solution Rapide (2 minutes)

### Option 1: Script automatique
```bash
cd apps/web
./setup-map.sh
```

### Option 2: Configuration manuelle

1. **Obtenir une clé gratuite MapTiler:**
   - 🌍 Aller sur: https://www.maptiler.com/
   - 📝 Créer un compte gratuit (limite: 100,000 chargements/mois)
   - 🔑 Copier votre clé API

2. **Configurer la clé:**
   ```bash
   cd apps/web
   echo "NEXT_PUBLIC_MAPTILER_KEY=votre_clé_ici" > .env.local
   ```

3. **Redémarrer le serveur:**
   ```bash
   pnpm dev
   ```

4. **Tester:**
   - 🌐 Ouvrir: http://localhost:7001/map
   - ✅ La carte devrait maintenant s'afficher avec les villes du Maroc

## 🔍 Vérification

### Console du navigateur (F12):
- ❌ `MapTiler API key is missing` → Clé manquante
- ❌ `MapLibre error` → Clé invalide ou problème réseau  
- ✅ Pas d'erreur + carte visible → Tout fonctionne

### Interface utilisateur:
- ❌ Message "Clé MapTiler manquante" → Suivre les étapes ci-dessus
- ❌ Message "Erreur de chargement de la carte" → Vérifier la clé
- ✅ Carte interactive avec marqueurs → Parfait!

## 🎯 Fonctionnalités de la Carte

Une fois configurée, la carte affiche:

- **10 villes principales du Maroc** avec marqueurs personnalisés
- **Popups interactifs** avec infos sur chaque ville
- **Contrôles de navigation** (zoom, pan)
- **Géolocalisation** utilisateur
- **Mode plein écran**
- **Responsive design** (mobile-friendly)

## 🛠️ Dépannage

### Erreur "Failed to fetch"
```bash
# Vérifier la connexion internet
ping api.maptiler.com
```

### Erreur "Invalid API key"
```bash
# Vérifier que la clé est correcte dans .env.local
cat .env.local
```

### Port déjà utilisé
```bash
# Le serveur tourne sur le port 7001 (pas 3000)
lsof -i :7001
```

## 📊 Limites Gratuites MapTiler

- **100,000 chargements de carte/mois** (largement suffisant pour le développement)
- **Pas de limite sur les marqueurs** ou fonctionnalités
- **Upgrade possible** si nécessaire plus tard

## 🔗 Liens Utiles

- [MapTiler Dashboard](https://cloud.maptiler.com/)
- [MapLibre GL JS Docs](https://maplibre.org/maplibre-gl-js-docs/)
- [Code source de la carte](./components/map/map-client.tsx)
