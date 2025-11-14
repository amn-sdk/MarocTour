import { SimpleMapTest } from '@/components/map/simple-map-test';
import { MapFixed } from '@/components/map/map-fixed';
import { cities } from '@/data/cities';

export default function MapTestPage() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <h1 className="text-3xl font-bold">Test de Diagnostic des Cartes</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">🧪 Test Simple MapLibre GL</h2>
          <SimpleMapTest />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">🗺️ Composant MapClient Original</h2>
          <div className="border rounded-lg p-4">
            <MapFixed cities={cities.slice(0, 3)} />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">📊 Informations de Debug</h2>
          <div className="bg-gray-100 p-4 rounded font-mono text-sm">
            <p>🔍 <strong>Instructions:</strong></p>
            <p>1. Ouvrez la console développeur (F12)</p>
            <p>2. Regardez les logs commençant par 🧪, 🗺️, ✅ ou ❌</p>
            <p>3. Le test simple devrait marcher en premier</p>
            <p>4. Si le test simple marche mais pas MapClient, il y a un problème dans MapClient</p>
            <p>5. Si rien ne marche, il y a un problème d'import ou d'environnement</p>
          </div>
        </section>
      </div>
    </div>
  );
}
