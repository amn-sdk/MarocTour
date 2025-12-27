'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Map, Building2, BookOpen, Factory } from 'lucide-react';

export default function FesPageClient() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Fès</h1>
          <div className="flex gap-2">
            <Link href="/map">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la carte
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero visuel */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: 'url(/images/cities/fes.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow">
            Fès, Capitale Spirituelle et Culturelle
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg opacity-95">
            Découvrez la médina millénaire de Fès, l'une des plus anciennes villes impériales du Maroc,
            berceau de la culture et de l'artisanat traditionnel.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/map">
              <Button variant="secondary" className="gap-2">
                <Map className="h-4 w-4" />
                Explorer la carte
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Présentation */}
        <section id="presentation" className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Présentation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 rounded-lg overflow-hidden border bg-card">
              <div
                className="h-56 w-full"
                style={{
                  backgroundImage: 'url(/images/cities/fes.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="p-5 text-muted-foreground">
                Fès est la capitale spirituelle et culturelle du Maroc. Fondée au IXe siècle, elle abrite
                la médina la plus ancienne et la mieux préservée du monde arabe, classée au patrimoine
                mondial de l'UNESCO. Avec une population de plus d'un million d'habitants, Fès est
                un centre majeur de l'artisanat traditionnel, de l'éducation et de la culture islamique.
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border bg-card p-5">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Région</h4>
                  <p className="text-muted-foreground">Fès-Meknès</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Population</h4>
                  <p className="text-muted-foreground">1,150,000 habitants</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Points d'intérêt</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Médina de Fès</li>
                    <li>• Université Al Quaraouiyine</li>
                    <li>• Tanneries</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Points d'intérêt */}
        <section id="highlights" className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Points d'intérêt majeurs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden border bg-card">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="h-6 w-6 text-primary" />
                  <h4 className="text-xl font-semibold">Médina de Fès</h4>
                </div>
                <p className="text-muted-foreground">
                  La médina de Fès el-Bali est l'une des plus grandes zones piétonnes du monde.
                  Ses ruelles labyrinthiques abritent des milliers d'artisans, des mosquées historiques
                  et des palais magnifiques.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border bg-card">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <h4 className="text-xl font-semibold">Université Al Quaraouiyine</h4>
                </div>
                <p className="text-muted-foreground">
                  Fondée en 859, l'Université Al Quaraouiyine est considérée comme la plus ancienne
                  université du monde encore en activité. Elle est un symbole de l'excellence académique
                  et spirituelle du Maroc.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border bg-card">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Factory className="h-6 w-6 text-primary" />
                  <h4 className="text-xl font-semibold">Tanneries</h4>
                </div>
                <p className="text-muted-foreground">
                  Les tanneries de Fès sont parmi les plus anciennes du monde. Le processus de tannage
                  traditionnel utilise des méthodes ancestrales pour créer des cuirs de qualité exceptionnelle,
                  teints avec des colorants naturels.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Histoire */}
        <section id="histoire" className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Histoire</h3>
          <div className="rounded-lg overflow-hidden border bg-card p-6">
            <div className="prose prose-slate max-w-none text-muted-foreground">
              <p className="mb-4">
                Fès a été fondée en 789 par Idris Ier, fondateur de la dynastie idrisside. La ville s'est
                rapidement développée pour devenir un centre religieux, culturel et commercial majeur.
              </p>
              <p className="mb-4">
                Au XIIIe siècle, Fès est devenue la capitale du royaume sous les Mérinides, période
                qui a vu la construction de nombreux monuments emblématiques. La ville a conservé son
                importance culturelle et spirituelle à travers les siècles.
              </p>
              <p>
                Aujourd'hui, Fès est reconnue comme un joyau du patrimoine mondial, préservant
                l'authenticité de son architecture et de ses traditions artisanales millénaires.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

