// @ts-nocheck
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function KenitraPageClient() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b text-gray-900">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Kénitra</h1>
          <Link href="/map">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la carte
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-3xl text-gray-900">
        <nav aria-label="Navigation interne" className="mb-8 flex gap-4 text-sm text-muted-foreground">
          <a href="#presentation" className="hover:underline">Présentation</a>
          <a href="#histoire" className="hover:underline">Histoire</a>
          <a href="#culture" className="hover:underline">Culture</a>
        </nav>

        <section id="presentation" aria-labelledby="presentation-title" className="mb-8">
          <h2 id="presentation-title" className="text-2xl font-semibold mb-3">Présentation</h2>
          <p className="text-base leading-7 text-muted-foreground">
            Située sur l’oued Sebou et à proximité de l’océan Atlantique, Kénitra est une ville dynamique
            de la région Rabat‑Salé‑Kénitra. Son développement récent s’appuie sur un tissu industriel
            en expansion, une position stratégique sur l’axe ferroviaire et autoroutier nord‑sud, et la
            station balnéaire voisine de Mehdia. La ville bénéficie d’une population jeune et d’un pôle
            universitaire en croissance, tout en restant connectée à des espaces naturels remarquables
            comme la forêt de la Mamora et l’embouchure du Sebou. Caractérisée par une qualité de vie
            accessible, des mobilités efficaces et un écosystème économique diversifié, Kénitra se
            positionne comme une porte d’entrée vers les plaines du Gharb et un lieu de séjour propice
            aux activités de plein air, à la découverte culturelle et aux échanges entre les métropoles
            du littoral atlantique.
          </p>
        </section>

        <section id="histoire" aria-labelledby="histoire-title" className="mb-12">
          <h2 id="histoire-title" className="text-2xl font-semibold mb-3">Histoire de Kénitra</h2>
          <p className="text-base leading-7 text-muted-foreground mb-3">
            L’essor moderne de Kénitra s’est structuré au XXe siècle autour des axes de transport,
            de l’activité portuaire et du développement agricole du Gharb. La ville a progressivement
            diversifié ses fonctions vers l’industrie et l’enseignement supérieur, tout en gardant
            un lien étroit avec son fleuve et l’océan. Aujourd’hui, Kénitra s’affirme comme un pôle
            régional connecté, où cohabitent espaces naturels et dynamique urbaine.
          </p>
          <ul className="list-disc pl-6 text-base leading-7 text-muted-foreground">
            <li>Structuration urbaine au XXe siècle</li>
            <li>Rôle du fleuve Sebou et des infrastructures (rail/autoroute)</li>
            <li>Ouverture vers l’Atlantique et la station de Mehdia</li>
          </ul>
        </section>

        <section id="culture" aria-labelledby="culture-title" className="mb-12">
          <h2 id="culture-title" className="text-2xl font-semibold mb-3">Culture à Kénitra</h2>
          <p className="text-base leading-7 text-muted-foreground mb-3">
            Portée par une population jeune et un réseau associatif actif, la vie culturelle met en
            valeur les pratiques sportives, les événements locaux et les initiatives étudiantes. La
            proximité de la Mamora et du littoral favorise les activités de plein air, tandis que
            l’ancrage académique et la connexion aux grandes villes enrichissent l’offre culturelle.
          </p>
          <ul className="list-disc pl-6 text-base leading-7 text-muted-foreground">
            <li>Vie associative et initiatives étudiantes</li>
            <li>Plages de Mehdia et forêts de la Mamora</li>
            <li>Événements locaux et pratiques sportives</li>
          </ul>
        </section>
      </main>
    </div>
  );
}


