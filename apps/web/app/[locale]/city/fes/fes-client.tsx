'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Map, Building2, BookOpen, Factory, Palette, Clock, Landmark } from 'lucide-react';

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

      {/* Hero visuel avec deux images */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Côté gauche - Médina (bleu/ocre) */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700" />
          {/* Côté droit - Tanneries (ocre/rouge) */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-red-900 via-red-800 to-amber-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Fès, Capitale Spirituelle
          </h2>
          <p className="max-w-4xl mx-auto text-lg md:text-xl opacity-95 mb-2">
            La plus ancienne des villes impériales du Maroc
          </p>
          <p className="max-w-3xl mx-auto text-base md:text-lg opacity-90">
            Berceau millénaire de la culture, de l'artisanat et de l'érudition islamique
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/map">
              <Button variant="secondary" size="lg" className="gap-2">
                <Map className="h-5 w-5" />
                Explorer la carte
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Présentation détaillée */}
        <section id="presentation" className="mb-16">
          <h3 className="text-3xl font-bold mb-6">Présentation de Fès</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="col-span-2 rounded-lg overflow-hidden border bg-card shadow-lg">
              <div className="h-72 w-full bg-gradient-to-br from-blue-900 via-amber-800 to-red-900 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40" />
              </div>
              <div className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">Fès</strong> est la capitale spirituelle et culturelle du Maroc, 
                  une ville qui incarne plus de douze siècles d'histoire et de tradition. Fondée en 789 par 
                  <strong className="text-foreground"> Idris Ier</strong>, elle abrite la médina la plus ancienne 
                  et la mieux préservée du monde arabe, classée au <strong className="text-foreground">patrimoine 
                  mondial de l'UNESCO</strong> depuis 1981.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Avec une population de plus d'un million d'habitants, Fès est un centre majeur de 
                  l'artisanat traditionnel, de l'éducation et de la culture islamique. La ville se distingue 
                  par son architecture andalouse, ses médersas (écoles coraniques) historiques, et ses 
                  souks animés où se perpétuent des métiers ancestraux.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Fès est également le berceau de l'<strong className="text-foreground">Universitée Al Quaraouiyine</strong>, 
                  fondée en 859, considérée comme la plus ancienne université du monde encore en activité. 
                  Cette institution millénaire a façonné l'identité intellectuelle et spirituelle de la ville.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden border bg-card p-6 shadow-lg">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Map className="h-5 w-5 text-primary" />
                      Région
                    </h4>
                    <p className="text-muted-foreground">Fès-Meknès</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Fondation
                    </h4>
                    <p className="text-muted-foreground">789 après J.-C.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Population</h4>
                    <p className="text-muted-foreground text-2xl font-semibold">1,150,000</p>
                    <p className="text-muted-foreground text-sm">habitants</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border bg-card p-6 shadow-lg">
                <h4 className="font-bold text-lg mb-4">Points d'intérêt</h4>
                <ul className="text-muted-foreground space-y-3">
                  <li className="flex items-start gap-2">
                    <Building2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Médina de Fès el-Bali</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BookOpen className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Université Al Quaraouiyine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Factory className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Tanneries traditionnelles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Landmark className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Mosquée Al-Qaraouiyine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Palette className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Artisanat traditionnel</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Histoire détaillée avec images */}
        <section id="histoire" className="mb-16">
          <h3 className="text-3xl font-bold mb-6">Histoire de Fès</h3>
          <div className="space-y-8">
            {/* Période Idrisside */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg overflow-hidden border bg-card shadow-lg">
                <div className="h-48 w-full bg-gradient-to-br from-amber-700 via-amber-600 to-amber-500" />
                <div className="p-5">
                  <h4 className="text-xl font-semibold mb-3">Fondation (789)</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    <strong className="text-foreground">Fès a été fondée en 789 par Idris Ier</strong>, 
                    fondateur de la dynastie idrisside. La ville s'est rapidement développée pour devenir 
                    un centre religieux, culturel et commercial majeur, attirant des savants, des artisans 
                    et des commerçants de tout le monde musulman.
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border bg-card shadow-lg">
                <div className="h-48 w-full bg-gradient-to-br from-blue-800 via-blue-700 to-amber-600" />
                <div className="p-5">
                  <h4 className="text-xl font-semibold mb-3">L'âge d'or Mérinide (XIIIe-XVe)</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Au <strong className="text-foreground">XIIIe siècle</strong>, Fès est devenue la capitale 
                    du royaume sous les Mérinides. Cette période a vu la construction de nombreux monuments 
                    emblématiques, médersas, palais et mosquées qui font aujourd'hui la renommée de la ville.
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border bg-card shadow-lg">
                <div className="h-48 w-full bg-gradient-to-br from-red-800 via-amber-700 to-blue-800" />
                <div className="p-5">
                  <h4 className="text-xl font-semibold mb-3">Patrimoine mondial</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Aujourd'hui, Fès est reconnue comme un <strong className="text-foreground">joyau du 
                    patrimoine mondial</strong>, préservant l'authenticité de son architecture et de ses 
                    traditions artisanales millénaires. La médina reste un témoignage vivant de l'histoire 
                    et de la culture marocaines.
                  </p>
                </div>
              </div>
            </div>

            {/* Texte historique détaillé */}
            <div className="rounded-lg overflow-hidden border bg-card p-8 shadow-lg">
              <div className="prose prose-slate max-w-none">
                <h4 className="text-2xl font-semibold mb-4 text-foreground">Une histoire millénaire</h4>
                <div className="text-muted-foreground space-y-4 leading-relaxed">
                  <p>
                    L'histoire de Fès est une saga de plus de douze siècles qui a façonné l'identité du Maroc. 
                    La ville a été fondée sur les rives de l'oued Fès par <strong className="text-foreground">Idris Ier</strong>, 
                    qui a choisi cet emplacement stratégique pour établir sa capitale. Sous son fils <strong className="text-foreground">Idris II</strong>, 
                    la ville s'est agrandie avec l'arrivée de réfugiés andalous et kairouanais, enrichissant 
                    la diversité culturelle et artisanale de Fès.
                  </p>
                  <p>
                    Au <strong className="text-foreground">XIIIe siècle</strong>, la dynastie mérinide a transformé Fès en un 
                    centre intellectuel et artistique de premier plan. Les souverains mérinides ont construit 
                    de magnifiques médersas comme la Médersa Bou Inania et la Médersa Attarine, véritables 
                    chefs-d'œuvre de l'architecture islamique. Cette période a également vu l'expansion de 
                    l'Université Al Quaraouiyine, qui attirait des étudiants de tout le monde musulman.
                  </p>
                  <p>
                    Au fil des siècles, Fès a conservé son importance culturelle et spirituelle, résistant 
                    aux changements politiques et aux influences extérieures. La médina, avec ses 9 000 ruelles, 
                    ses 300 mosquées et ses centaines de fondouks (caravansérails), reste un labyrinthe vivant 
                    où se perpétuent des traditions ancestrales. Aujourd'hui, Fès est non seulement un musée 
                    à ciel ouvert mais aussi une ville dynamique qui continue d'inspirer artistes, érudits et 
                    visiteurs du monde entier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Culture et Artisanat */}
        <section id="culture" className="mb-16">
          <h3 className="text-3xl font-bold mb-6">Culture & Artisanat</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden border bg-card shadow-lg">
              <div className="h-64 w-full bg-gradient-to-br from-purple-800 via-amber-700 to-red-700" />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Palette className="h-6 w-6 text-primary" />
                  Artisanat traditionnel
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Fès est réputée pour son artisanat d'exception. Les souks de la médina abritent des 
                  maîtres artisans spécialisés dans la <strong className="text-foreground">poterie bleue de Fès</strong>, 
                  la <strong className="text-foreground">broderie</strong>, la <strong className="text-foreground">maroquinerie</strong>, 
                  et le <strong className="text-foreground">travail du cuir</strong>. Les techniques ancestrales se transmettent 
                  de génération en génération, préservant un savoir-faire unique au monde.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border bg-card shadow-lg">
              <div className="h-64 w-full bg-gradient-to-br from-blue-900 via-purple-800 to-amber-800" />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Landmark className="h-6 w-6 text-primary" />
                  Vie culturelle
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  La vie culturelle de Fès est rythmée par des festivals de musique sacrée, des célébrations 
                  religieuses, et des événements artistiques. Le <strong className="text-foreground">Festival 
                  des Musiques Sacrées du Monde</strong> attire chaque année des artistes et visiteurs du monde 
                  entier. La ville vibre également au rythme des traditions soufies et des confréries religieuses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Points d'intérêt détaillés */}
        <section id="highlights" className="mb-16">
          <h3 className="text-3xl font-bold mb-6">Points d'intérêt majeurs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden border bg-card shadow-lg">
              <div className="h-48 w-full bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600" />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="h-6 w-6 text-primary" />
                  <h4 className="text-xl font-semibold">Médina de Fès el-Bali</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  La médina de Fès el-Bali est l'une des plus grandes zones piétonnes du monde, avec ses 
                  <strong className="text-foreground"> 9 000 ruelles labyrinthiques</strong>. Elle abrite des 
                  milliers d'artisans, des mosquées historiques, des palais magnifiques et des fondouks 
                  (caravansérails) qui témoignent de la richesse commerciale passée de la ville.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border bg-card shadow-lg">
              <div className="h-48 w-full bg-gradient-to-br from-blue-900 via-blue-800 to-amber-700" />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <h4 className="text-xl font-semibold">Université Al Quaraouiyine</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Fondée en <strong className="text-foreground">859 par Fatima al-Fihriya</strong>, l'Université 
                  Al Quaraouiyine est considérée comme la plus ancienne université du monde encore en activité. 
                  Elle est un symbole de l'excellence académique et spirituelle du Maroc, ayant formé de 
                  nombreux érudits et penseurs à travers les siècles.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border bg-card shadow-lg">
              <div className="h-48 w-full bg-gradient-to-br from-red-900 via-red-800 to-amber-800" />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Factory className="h-6 w-6 text-primary" />
                  <h4 className="text-xl font-semibold">Tanneries de Fès</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Les tanneries de Fès, notamment les <strong className="text-foreground">Tanneries Chouara</strong>, 
                  sont parmi les plus anciennes du monde. Le processus de tannage traditionnel utilise des méthodes 
                  ancestrales pour créer des cuirs de qualité exceptionnelle, teints avec des colorants naturels 
                  dans des cuves en pierre.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
