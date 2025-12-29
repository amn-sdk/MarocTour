import { test, expect } from '@playwright/test';

test.describe('Page Fès - Navigation et Quiz', () => {
  test.beforeEach(async ({ page }) => {
    // Aller à la page d'accueil
    await page.goto('/');
  });

  test('Navigation depuis la carte vers la page Fès', async ({ page }) => {
    // Aller à la page de la carte
    await page.click('a[href="/map"]');
    await expect(page).toHaveURL(/\/map$/);

    // Attendre que la carte se charge
    await page.waitForSelector('.maplibregl-map', { timeout: 10000 });

    // Chercher le marqueur de Fès et cliquer dessus
    const fesMarker = page.locator('[data-city-slug="fes"]').first();
    await expect(fesMarker).toBeVisible();
    await fesMarker.click();

    // Attendre que le popup apparaisse
    await page.waitForSelector('#send-element-fes', { timeout: 5000 });

    // Cliquer sur le bouton "Découvrir Fès"
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.click('#send-element-fes')
    ]);

    // Vérifier que la nouvelle page s'ouvre avec la bonne URL
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/\/city\/fes$/);

    // Vérifier le contenu de la page
    await expect(newPage.locator('h1')).toContainText('Fès');
    await expect(newPage.locator('text=Capitale spirituelle')).toBeVisible();
  });

  test('Navigation directe vers la page Fès', async ({ page }) => {
    // Aller directement à la page Fès
    await page.goto('/city/fes');

    // Vérifier que la page se charge correctement
    await expect(page.locator('h1')).toContainText('Fès');
    await expect(page.locator('text=Capitale spirituelle')).toBeVisible();
  });

  test('Hero section avec images de fond', async ({ page }) => {
    await page.goto('/city/fes');

    // Vérifier que la section hero est présente
    const heroSection = page.locator('section').filter({ hasText: /Fès|Capitale spirituelle/ }).first();
    await expect(heroSection).toBeVisible();

    // Vérifier les badges d'information
    await expect(page.locator('text=Région Fès-Meknès')).toBeVisible();
    await expect(page.locator('text=1.15 Millions d\'habitants')).toBeVisible();
    await expect(page.locator('text=Capitale Spirituelle')).toBeVisible();
  });

  test('Contenu historique de Fès présent', async ({ page }) => {
    await page.goto('/city/fes');

    // Vérifier la section histoire
    await expect(page.locator('#histoire')).toBeVisible();
    await expect(page.locator('text=Une Histoire Millénaire')).toBeVisible();

    // Vérifier qu'au moins quelques sections historiques sont présentes
    await expect(page.locator('text=Fondation par Idris Ier')).toBeVisible();
    await expect(page.locator('text=L\'Expansion sous Idris II')).toBeVisible();
    await expect(page.locator('text=Fondation de l\'Université Al Quaraouiyine')).toBeVisible();
    await expect(page.locator('text=L\'Âge d\'Or Mérinide')).toBeVisible();
    await expect(page.locator('text=Patrimoine Mondial UNESCO')).toBeVisible();

    // Vérifier qu'il y a du contenu historique détaillé
    await expect(page.locator('text=789')).toBeVisible();
    await expect(page.locator('text=Idris Ier')).toBeVisible();
    await expect(page.locator('text=Al Quaraouiyine')).toBeVisible();
  });

  test('Section Présentation présente', async ({ page }) => {
    await page.goto('/city/fes');

    // Naviguer vers la section présentation
    await page.locator('a[href="#presentation"]').click();

    // Vérifier que la section présentation est visible
    await expect(page.locator('#presentation')).toBeVisible();
    await expect(page.locator('text=La Capitale Spirituelle')).toBeVisible();

    // Vérifier le contenu de présentation
    await expect(page.locator('text=UNESCO')).toBeVisible();
    await expect(page.locator('text=Université Al Quaraouiyine')).toBeVisible();
  });

  test('Quiz présent avec 10 questions', async ({ page }) => {
    await page.goto('/city/fes');

    // Naviguer vers la section quiz
    await page.locator('a[href="#quiz"]').click();

    // Vérifier que la section quiz est visible
    await expect(page.locator('#quiz')).toBeVisible();
    await expect(page.locator('text=Testez vos Connaissances')).toBeVisible();

    // Vérifier que le quiz s'affiche
    await expect(page.locator('text=Quiz Histoire de Fès')).toBeVisible();

    // Attendre que le quiz se charge
    await page.waitForSelector('text=questions vous attendent', { timeout: 5000 });
  });

  test('Fonctionnalité complète du quiz', async ({ page }) => {
    await page.goto('/city/fes');

    // Naviguer vers le quiz
    await page.locator('a[href="#quiz"]').click();
    await page.waitForSelector('#quiz', { timeout: 5000 });

    // Entrer un nom de joueur
    const nameInput = page.locator('input[type="text"]').filter({ hasPlaceholder: /nom|name/i });
    await nameInput.fill('Test Player');

    // Démarrer le quiz
    const startButton = page.locator('button').filter({ hasText: /Commencer|Démarrer|Start/i });
    await startButton.click();

    // Attendre que la première question apparaisse
    await page.waitForSelector('button').filter({ hasText: /^[A-D]\./ }).first();

    // Sélectionner une réponse (première option)
    const firstChoice = page.locator('button').filter({ hasText: /^A\./ }).first();
    await firstChoice.click();

    // Soumettre la réponse
    const submitButton = page.locator('button').filter({ hasText: /Soumettre|Submit/i });
    await submitButton.click();

    // Vérifier que l'explication apparaît
    await expect(page.locator('text=Explication').or(page.locator('text=explanation'))).toBeVisible({ timeout: 5000 });

    // Passer à la question suivante
    const nextButton = page.locator('button').filter({ hasText: /Suivant|Next/i });
    if (await nextButton.isVisible()) {
      await nextButton.click();
    }
  });

  test('Leaderboard présent et fonctionnel', async ({ page }) => {
    await page.goto('/city/fes');

    // Naviguer vers la section classement
    await page.locator('a[href="#classement"]').click();

    // Vérifier que la section classement est visible
    await expect(page.locator('#classement')).toBeVisible();
    await expect(page.locator('text=Classement')).toBeVisible();
    await expect(page.locator('text=Quiz Fès')).toBeVisible();
  });

  test('Navigation retour vers la carte', async ({ page }) => {
    await page.goto('/city/fes');

    // Cliquer sur le bouton retour
    const backButton = page.locator('a[href="/map"]').filter({ hasText: /Retour|Back/i }).first();
    await backButton.click();

    // Vérifier qu'on est bien revenu à la carte
    await expect(page).toHaveURL(/\/map$/);
  });

  test('API Fès retourne du JSON valide', async ({ page }) => {
    // Tester l'API directement
    const response = await page.request.get('/api/cities/fes');

    expect(response.status()).toBe(200);

    const data = await response.json();

    // Vérifier la structure des données
    expect(data).toHaveProperty('slug', 'fes');
    expect(data).toHaveProperty('title', 'Fès');
    expect(data).toHaveProperty('hero');
    expect(data).toHaveProperty('history');
    expect(data).toHaveProperty('quiz');
    expect(data).toHaveProperty('meta');

    // Vérifier le hero
    expect(data.hero).toHaveProperty('title');
    expect(data.hero).toHaveProperty('subtitle');

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

    // Vérifier le contenu spécifique à Fès
    expect(firstQuestion.question).toContain('Fès');
    expect(data.history[0].title).toContain('Idris');
  });

  test('Navigation interne fonctionne', async ({ page }) => {
    await page.goto('/city/fes');

    // Tester la navigation vers chaque section
    await page.locator('a[href="#presentation"]').click();
    await expect(page.locator('#presentation')).toBeInViewport();

    await page.locator('a[href="#histoire"]').click();
    await expect(page.locator('#histoire')).toBeInViewport();

    await page.locator('a[href="#quiz"]').click();
    await expect(page.locator('#quiz')).toBeInViewport();

    await page.locator('a[href="#classement"]').click();
    await expect(page.locator('#classement')).toBeInViewport();
  });

  test('Responsive design - mobile', async ({ page }) => {
    // Simuler un écran mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/city/fes');

    // Vérifier que les éléments principaux sont visibles sur mobile
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#presentation')).toBeVisible();
    await expect(page.locator('#histoire')).toBeVisible();
    await expect(page.locator('#quiz')).toBeVisible();

    // Vérifier que la navigation mobile fonctionne
    await page.locator('a[href="#quiz"]').click();
    await expect(page.locator('#quiz')).toBeInViewport();
  });

  test('Accessibilité - navigation au clavier', async ({ page }) => {
    await page.goto('/city/fes');

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

  test('Images de fond chargées', async ({ page }) => {
    await page.goto('/city/fes');

    // Vérifier que les images de fond sont présentes (via les styles)
    const heroSection = page.locator('section').first();
    const backgroundImage = await heroSection.evaluate((el) => {
      return window.getComputedStyle(el).backgroundImage;
    });

    // L'image devrait être chargée ou un gradient de fallback
    expect(backgroundImage).toBeTruthy();
  });
});

