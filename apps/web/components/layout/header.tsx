'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { MapPin, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
// LangSwitcher removed
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('map'), href: '/map' },
    { name: t('quiz'), href: '/quiz' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-morocco-red" />
          <span className="text-xl font-bold">MarocTour</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => {
            const isActive = pathname.endsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {/* LangSwitcher removed */}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto py-4 px-4 space-y-3">
            {navigation.map((item) => {
              const isActive = pathname.endsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block py-2 text-base font-medium transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

