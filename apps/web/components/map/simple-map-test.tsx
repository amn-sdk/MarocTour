'use client';

import { useEffect, useRef } from 'react';

export function SimpleMapTest() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('🧪 Test simple - Container:', !!containerRef.current);
    
    // Test d'import dynamique de maplibre-gl
    import('maplibre-gl').then((maplibre) => {
      console.log('✅ MapLibre GL importé dynamiquement:', !!maplibre.default);
      
      if (!containerRef.current) {
        console.error('❌ Container manquant');
        return;
      }

      // Style OpenStreetMap simple
      const simpleStyle = {
        version: 8 as const,
        sources: {
          'osm': {
            type: 'raster' as const,
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'osm',
            type: 'raster' as const,
            source: 'osm'
          }
        ]
      };

      try {
        console.log('🗺️ Création de la carte de test...');
        
        const map = new maplibre.default.Map({
          container: containerRef.current,
          style: simpleStyle,
          center: [-7.6, 31.8],
          zoom: 5
        });

        map.on('load', () => {
          console.log('🎉 Test réussi - Carte chargée!');
        });

        map.on('error', (e) => {
          console.error('❌ Erreur test:', e);
        });

      } catch (error) {
        console.error('❌ Erreur création carte test:', error);
      }

    }).catch((error) => {
      console.error('❌ Erreur import MapLibre GL:', error);
    });
  }, []);

  return (
    <div className="w-full h-[400px] border-2 border-dashed border-gray-300">
      <div ref={containerRef} className="w-full h-full" />
      <p className="text-center mt-2 text-sm text-gray-600">
        Test simple MapLibre GL - Voir console (F12)
      </p>
    </div>
  );
}
