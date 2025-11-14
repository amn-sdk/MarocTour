import { test, expect } from '@playwright/test';

test.describe('Page Nador - Navigation et Quiz', () => {
  test.beforeEach(async ({ page }) => {
    // Aller à la page d'accueil
    await page.goto('/');
  });

  test('Navigation depuis la carte vers la page Nador', async ({ page }) => {
    // Aller à la page de la carte
    await page.click('a[href="/map"]');
    await expect(page).toHaveURL(/\/map$/);

    // Attendre que la carte se charge
    await page.waitForSelector('.maplibregl-map', { timeout: 10000 });

    // Chercher le marqueur de Nador et cliquer dessus
    const nadorMarker = page.locator('[data-city-slug="nador"]').first();
    await expect(nadorMarker).toBeVisible();
    await nadorMarker.click();

    // Attendre que le popup apparaisse
    await page.waitForSelector('#send-element-nador', { timeout: 5000 });

    // Cliquer sur le bouton "Send Element" / "Découvrir Nador"
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.click('#send-element-nador')
    ]);

    // Vérifier que la nouvelle page s'ouvre avec la bonne URL
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/\/city\/nador$/);

    // Vérifier le contenu de la page
    await expect(newPage.locator('h1')).toContainText('Nador');
    await expect(newPage.locator('text=Perle du Rif Oriental')).toBeVisible();
  });

  test('Navigation directe vers la page Nador', async ({ page }) => {
    // Aller directement à la page Nador
    await page.goto('/city/nador');

    // Vérifier que la page se charge correctement
    await expect(page.locator('h1')).toContainText('Nador');
    await expect(page.locator('text=Perle du Rif Oriental')).toBeVisible();
  });

  test('Contenu historique de Nador présent', async ({ page }) => {
    await page.goto('/city/nador');

    // Vérifier la section histoire
    await expect(page.locator('#histoire')).toBeVisible();
    await expect(page.locator('text=Histoire de Nador')).toBeVisible();

    // Vérifier qu'au moins quelques sections historiques sont présentes
    await expect(page.locator('text=Antiquité')).toBeVisible();
    await expect(page.locator('text=Moyen-Âge')).toBeVisible();
    await expect(page.locator('text=Protectorat Espagnol')).toBeVisible();
    await expect(page.locator('text=Nador Moderne')).toBeVisible();

    // Vérifier qu'il y a du contenu historique détaillé
    await expect(page.locator('text=Phéniciens')).toBeVisible();
    await expect(page.locator('text=Abdelkrim al-Khattabi')).toBeVisible();
  });

  test('Quiz présent avec 10 questions', async ({ page }) => {
    await page.goto('/city/nador');

    // Naviguer vers la section quiz
    await page.locator('a[href="#quiz"]').click();
    
    // Vérifier que la section quiz est visible
    await expect(page.locator('#quiz')).toBeVisible();
    await expect(page.locator('text=Testez vos Connaissances')).toBeVisible();

    // Vérifier que le quiz s'affiche
    await expect(page.locator('text=Quiz Histoire de Nador')).toBeVisible();
    await expect(page.locator('text=1 / 10')).toBeVisible();

    // Vérifier qu'il y a une question affichée
    const questionElement = page.locator('.quiz-question, h3').first();
    await expect(questionElement).toBeVisible();

    // Vérifier qu'il y a 4 choix de réponse
    const choiceButtons = page.locator('button').filter({ hasText: /^[A-D]\./});
    await expect(choiceButtons).toHaveCount(4);
  });

  test('Fonctionnalité complète du quiz', async ({ page }) => {
    await page.goto('/city/nador');

    // Naviguer vers le quiz
    await page.locator('a[href="#quiz"]').click();

    // Sélectionner une réponse (première option)
    await page.locator('button').filter({ hasText: /^A\./ }).click();

    // Soumettre la réponse
    await page.locator('button:has-text("Soumettre")').click();

    // Vérifier que l'explication apparaît
    await expect(page.locator('text=Explication')).toBeVisible();

    // Passer à la question suivante
    await page.locator('button:has-text("Suivant")').click();

    // Vérifier que la progression a changé
    await expect(page.locator('text=2 / 10')).toBeVisible();
  });

  test('Navigation retour vers la carte', async ({ page }) => {
    await page.goto('/city/nador');

    // Cliquer sur le bouton retour
    await page.locator('a[href="/map"]').first().click();

    // Vérifier qu'on est bien revenu à la carte
    await expect(page).toHaveURL(/\/map$/);
  });

  test('API Nador retourne du JSON valide', async ({ page }) => {
    // Tester l'API directement
    const response = await page.request.get('/api/cities/nador');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    
    // Vérifier la structure des données
    expect(data).toHaveProperty('slug', 'nador');
    expect(data).toHaveProperty('title', 'Nador');
    expect(data).toHaveProperty('hero');
    expect(data).toHaveProperty('history');
    expect(data).toHaveProperty('quiz');
    expect(data).toHaveProperty('meta');

    // Vérifier qu'il y a bien des sections d'histoire
    expect(data.history).toBeInstanceOf(Array);
    expect(data.history.length).toBeGreaterThanOrEqual(5);

    // Vérifier qu'il y a bien 10 questions de quiz
    expect(data.quiz).toBeInstanceOf(Array);
    expect(data.quiz.length).toBe(10);

    // Vérifier la structure d'une question de quiz
    const firstQuestion = data.quiz[0];
    expect(firstQuestion).toHaveProperty('id');
    expect(firstQuestion).toHaveProperty('question');
    expect(firstQuestion).toHaveProperty('choices');
    expect(firstQuestion).toHaveProperty('correct_index');
    expect(firstQuestion).toHaveProperty('explanation');
    expect(firstQuestion.choices).toHaveLength(4);
  });

  test('Responsive design - mobile', async ({ page }) => {
    // Simuler un écran mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/city/nador');

    // Vérifier que les éléments principaux sont visibles sur mobile
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#histoire')).toBeVisible();
    await expect(page.locator('#quiz')).toBeVisible();

    // Vérifier que la navigation mobile fonctionne
    await page.locator('a[href="#quiz"]').click();
    await expect(page.locator('#quiz')).toBeInViewport();
  });

  test('Accessibilité - navigation au clavier', async ({ page }) => {
    await page.goto('/city/nador');

    // Tester la navigation au clavier vers le quiz
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Vérifier qu'on peut naviguer vers le quiz au clavier
    const quizLink = page.locator('a[href="#quiz"]');
    await quizLink.focus();
    await page.keyboard.press('Enter');
    
    await expect(page.locator('#quiz')).toBeInViewport();
  });
});
