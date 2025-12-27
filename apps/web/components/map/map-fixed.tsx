'use client';

import { useEffect, useRef, useState } from 'react';
import type { City } from '@/data/cities';

interface MapFixedProps {
  cities: City[];
  center?: [number, number];
  zoom?: number;
}

export function MapFixed({ 
  cities, 
  center = [-7.6, 31.8], 
  zoom = 5.5 
}: MapFixedProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Import dynamique pour éviter les problèmes SSR
    const initMap = async () => {
      try {
        console.log('🚀 Import dynamique de MapLibre GL...');
        const maplibregl = await import('maplibre-gl');
        console.log('✅ MapLibre GL importé avec succès');

        if (!mapContainer.current) {
          throw new Error('Container non trouvé');
        }

        console.log('🗺️ Initialisation de la carte...');

        // Configuration OpenStreetMap simple et robuste
        const map = new maplibregl.default.Map({
          container: mapContainer.current,
          style: {
            version: 8,
            sources: {
              'osm-tiles': {
                type: 'raster',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution: '© OpenStreetMap contributors'
              }
            },
            layers: [
              {
                id: 'osm-tiles',
                type: 'raster',
                source: 'osm-tiles'
              }
            ]
          },
          center: center,
          zoom: zoom
        });

        console.log('🎯 Carte créée, attente du chargement...');

        // Timer de sécurité - forcer l'arrêt du loading après 10 secondes
        const loadingTimeout = setTimeout(() => {
          console.log('⏰ Timeout atteint, arrêt du loading forcé');
          setLoading(false);
        }, 10000);

        map.on('load', () => {
          console.log('🎉 Carte chargée avec succès!');
          clearTimeout(loadingTimeout);
          setLoading(false);

          // Ajouter les marqueurs
          cities.forEach((city, index) => {
            console.log(`📍 Ajout marqueur ${index + 1}/${cities.length}: ${city.name}`);
            
            // Marqueur simple avec couleur
            const markerElement = document.createElement('div');
            markerElement.style.width = '20px';
            markerElement.style.height = '20px';
            markerElement.style.backgroundColor = '#dc2626';
            markerElement.style.borderRadius = '50%';
            markerElement.style.border = '2px solid white';
            markerElement.style.cursor = 'pointer';
            markerElement.title = city.name;
            markerElement.setAttribute('data-city-slug', city.slug);
            markerElement.setAttribute('aria-label', `Marqueur pour ${city.name}`);
            markerElement.setAttribute('tabindex', '0');

            // Popup avec bouton de navigation
            const popup = new maplibregl.default.Popup({
              offset: 25,
              closeButton: true,
              closeOnClick: false,
            }).setHTML(`
              <div class="p-3 min-w-[200px]">
                <h3 class="font-bold text-lg mb-2">${city.name}</h3>
                <p class="text-sm text-gray-600 mb-3">${city.region}</p>
                <p class="text-xs text-gray-500 mb-3">Population: ${city.population?.toLocaleString()}</p>
                <button 
                  id="send-element-${city.slug}"
                  class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                  data-city-slug="${city.slug}"
                >
                  🏛️ Découvrir ${city.name}
                </button>
              </div>
            `);

            const marker = new maplibregl.default.Marker({ element: markerElement })
              .setLngLat([city.longitude, city.latitude])
              .setPopup(popup)
              .addTo(map);

            // Navigation au clic sur le marqueur ou bouton
            const handleNavigation = () => {
              // Récupérer la locale depuis l'URL actuelle
              const currentPath = window.location.pathname;
              const localeMatch = currentPath.match(/^\/(fr|en|ar)/);
              const locale = localeMatch ? localeMatch[1] : 'fr';
              const cityUrl = `/${locale}/city/${city.slug}`;
              console.log(`🚀 Navigation vers ${cityUrl}`);
              window.location.href = cityUrl;
            };

            // Clic sur le marqueur
            markerElement.addEventListener('click', handleNavigation);
            
            // Support clavier sur le marqueur
            markerElement.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavigation();
              }
            });

            // Clic sur le bouton "Send Element" dans le popup
            popup.on('open', () => {
              const sendButton = document.getElementById(`send-element-${city.slug}`);
              if (sendButton) {
                sendButton.addEventListener('click', handleNavigation);
              }
            });
          });

          console.log('✅ Tous les marqueurs ajoutés');
        });

        map.on('error', (e) => {
          console.error('❌ Erreur MapLibre:', e);
          clearTimeout(loadingTimeout);
          setError('Erreur de chargement de la carte');
          setLoading(false);
        });

      } catch (error) {
        console.error('❌ Erreur critique:', error);
        setError(`Erreur: ${error}`);
        setLoading(false);
      }
    };

    initMap();
  }, [cities, center, zoom]);

  if (error) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-red-50 border border-red-200 rounded-lg">
        <div className="text-center text-red-600">
          <p className="font-semibold">Erreur de chargement de la carte</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden border">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Chargement de la carte...</p>
            <p className="text-xs text-gray-500 mt-1">OpenStreetMap</p>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
