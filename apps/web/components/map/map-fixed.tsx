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

            new maplibregl.default.Marker({ element: markerElement })
              .setLngLat([city.longitude, city.latitude])
              .addTo(map);
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
