// @ts-nocheck
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function KenitraPageClient() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
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

      <main className="container mx-auto px-4 py-10 max-w-3xl">
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
      </main>
    </div>
  );
}


