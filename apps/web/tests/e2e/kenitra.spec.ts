// @ts-nocheck

import { test, expect } from '@playwright/test';

test.describe('Carte - Marqueur Kénitra', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Le marqueur Kénitra est visible et le popup est interactif', async ({ page }) => {
    // Aller à la carte
    await page.click('a[href="/map"]');
    await expect(page).toHaveURL(/\/map$/);

    // Attendre le rendu de la carte
    await page.waitForSelector('.maplibregl-map', { timeout: 10000 });

    // Vérifier la présence du marqueur Kénitra
    const marker = page.locator('[data-city-slug="kenitra"]').first();
    await expect(marker).toBeVisible();

    // Cliquer sur le marqueur
    await marker.click();

    // Le popup doit proposer un bouton "Découvrir Kénitra"
    await expect(page.locator('#send-element-kenitra')).toBeVisible();
  });

  test('Navigation depuis la carte vers la page Kénitra', async ({ page }) => {
    await page.click('a[href="/map"]');
    await expect(page).toHaveURL(/\/map$/);

    await page.waitForSelector('.maplibregl-map', { timeout: 10000 });

    const kenitraMarker = page.locator('[data-city-slug="kenitra"]').first();
    await expect(kenitraMarker).toBeVisible();
    await kenitraMarker.click();

    await page.waitForSelector('#send-element-kenitra', { timeout: 5000 });

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.click('#send-element-kenitra'),
    ]);

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/\/city\/kenitra$/);
    await expect(newPage.locator('h1')).toContainText('Kénitra');
  });

  test('Navigation directe vers la page Kénitra', async ({ page }) => {
    await page.goto('/city/kenitra');
    await expect(page.locator('h1')).toContainText('Kénitra');
  });
});


