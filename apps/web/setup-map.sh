#!/bin/bash

# Script de configuration automatique de MapTiler pour MarocTour
# Usage: ./setup-map.sh [your_maptiler_key]

echo "🗺️  Configuration de MapTiler pour MarocTour"
echo "==========================================="

# Vérifier si une clé est fournie en argument
if [ ! -z "$1" ]; then
    MAPTILER_KEY="$1"
    echo "✅ Clé fournie en argument"
else
    # Demander la clé à l'utilisateur
    echo ""
    echo "Pour configurer la carte, vous avez besoin d'une clé MapTiler gratuite."
    echo "📍 Rendez-vous sur: https://www.maptiler.com/"
    echo "📍 Créez un compte gratuit"
    echo "📍 Copiez votre clé API"
    echo ""
    read -p "Entrez votre clé MapTiler: " MAPTILER_KEY
fi

# Vérifier que la clé n'est pas vide
if [ -z "$MAPTILER_KEY" ]; then
    echo "❌ Erreur: Clé MapTiler manquante"
    echo "Utilisez: ./setup-map.sh YOUR_KEY"
    echo "Ou relancez le script et entrez votre clé"
    exit 1
fi

# Créer le fichier .env.local
echo "NEXT_PUBLIC_MAPTILER_KEY=$MAPTILER_KEY" > .env.local

echo ""
echo "✅ Configuration terminée!"
echo "📁 Fichier .env.local créé avec votre clé"
echo ""
echo "🚀 Prochaines étapes:"
echo "   1. Démarrez le serveur: pnpm dev"
echo "   2. Ouvrez: http://localhost:7001/map"
echo "   3. La carte devrait maintenant s'afficher!"
echo ""
echo "🔧 En cas de problème:"
echo "   - Vérifiez que votre clé est valide"
echo "   - Regardez la console du navigateur (F12)"
echo "   - Relancez ce script avec une nouvelle clé"
