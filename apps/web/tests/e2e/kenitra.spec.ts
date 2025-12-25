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
});


