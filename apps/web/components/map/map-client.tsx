'use client';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import type { City } from '@/data/cities';

interface MapClientProps {
  cities: City[];
  center?: [number, number];
  zoom?: number;
}

export function MapClient({ 
  cities, 
  center = [-7.6, 31.8], 
  zoom = 5.5 
}: MapClientProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;
    if (!apiKey) {
      console.error('MapTiler API key is missing');
      setError('Clé MapTiler manquante');
      return;
    }

    // Initialize map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
      center: center,
      zoom: zoom,
      attributionControl: { compact: true },
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    
    // Add geolocate control
    map.current.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      'top-right'
    );

    // Add fullscreen control
    map.current.addControl(new maplibregl.FullscreenControl(), 'top-right');

    map.current.on('error', (e) => {
      console.error('MapLibre error:', e?.error || e);
      setError('Erreur de chargement de la carte (clé/API).');
      setLoading(false);
    });

    map.current.on('load', () => {
      setLoading(false);
      
      if (!map.current) return;

      // Add markers for each city
      cities.forEach((city) => {
        const popup = new maplibregl.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: false,
        }).setHTML(`
          <div class="p-2">
            <h3 class="font-bold text-lg mb-1">${city.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${city.region}</p>
            <a 
              href="/city/${city.slug}" 
              class="text-sm text-blue-600 hover:underline"
            >
              Voir plus →
            </a>
          </div>
        `);

        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.backgroundImage = 'url(/images/marker-icon.png)';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.backgroundSize = 'contain';
        el.style.cursor = 'pointer';
        el.setAttribute('role', 'button');
        el.setAttribute('aria-label', `Marker for ${city.name}`);
        el.setAttribute('tabindex', '0');

        // Keyboard accessibility
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            popup.addTo(map.current!);
          }
        });

        new maplibregl.Marker({ element: el })
          .setLngLat([city.longitude, city.latitude])
          .setPopup(popup)
          .addTo(map.current!);
      });

      // Fit map to show all cities
      const bounds = new maplibregl.LngLatBounds();
      cities.forEach((city) => {
        bounds.extend([city.longitude, city.latitude]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [cities, center, zoom]);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      {(loading || error) && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <div className="text-center">
            {!error && (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            )}
            <p className="text-muted-foreground">
              {error ?? 'Chargement de la carte...'}
            </p>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}

