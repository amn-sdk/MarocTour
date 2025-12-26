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
        <p className="text-lg text-muted-foreground">
          Bienvenue sur la page de Kénitra. Cette page sera enrichie prochainement.
        </p>
      </main>
    </div>
  );
}


