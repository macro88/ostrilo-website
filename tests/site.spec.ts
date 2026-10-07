import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paths = ['', 'security/', 'roadmap/', 'developers/', 'start/', 'privacy/'];

for (const theme of ['light', 'dark'] as const) {
  for (const width of [390, 1440]) {
    test(`${theme} at ${width}px: pages, accessibility, assets, and links`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: theme });
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      for (const path of paths) {
        await page.goto(`./${path}`);
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        ).toBe(true);
        await expect(page.locator('a[href="#"]')).toHaveCount(0);
        for (const image of await page.locator('img:visible').all()) {
          await image.scrollIntoViewIfNeeded();
          await expect
            .poll(() =>
              image.evaluate(
                (element) =>
                  element instanceof HTMLImageElement &&
                  element.complete &&
                  element.naturalWidth > 0,
              ),
            )
            .toBe(true);
        }
        const accessibility = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        expect(accessibility.violations).toEqual([]);
      }
      expect(errors).toEqual([]);
    });
  }
}

test('walkthrough approves, denies, resets, and exposes example JSON', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'Approve example' }).click();
  await expect(page.getByText('You approved this note.')).toBeVisible();
  await expect(page.getByText('This walkthrough creates no keys or signatures.')).toBeVisible();
  await page.getByRole('button', { name: 'Try the other decision' }).click();
  await page.getByRole('button', { name: 'Deny', exact: true }).click();
  await expect(page.getByText('You denied this request.')).toBeVisible();
  await page.getByRole('button', { name: 'Try the other decision' }).click();
  await page.getByText('View example event').click();
  await expect(page.locator('.demo-json pre')).toContainText('"kind": 1');
});

test('navigation, theme, FAQ, and keyboard entry work', async ({ page, browserName }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('./');
  await page.keyboard.press(
    browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab',
  );
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page
    .getByRole('navigation', { name: 'Main navigation', exact: true })
    .getByRole('link', { name: 'Roadmap' })
    .click();
  await expect(page.locator('#next')).toContainText('A recovery path for every key');
  await page.locator('.header-start').click();
  await page.getByText('Do I need an Ostrilo account?').click();
  await expect(page.getByText('No. Your vault lives in the browser.')).toBeVisible();
});

test('only same-origin resources load and no storage or extension is used', async ({
  page,
  context,
}) => {
  const externalRequests: string[] = [];
  const origin = 'http://127.0.0.1:4321';
  page.on('request', (request) => {
    if (!request.url().startsWith(origin)) externalRequests.push(request.url());
  });
  await page.goto('./');
  await page.getByRole('button', { name: 'Approve example' }).click();
  await page.locator('.product-panel').scrollIntoViewIfNeeded();
  expect(externalRequests).toEqual([]);
  expect(await context.cookies()).toEqual([]);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
      hasSigner: 'nostr' in window,
    })),
  ).toEqual({ local: 0, session: 0, hasSigner: false });
});

test('product and navigation remain useful without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4321${process.env.SITE_BASE ?? '/'}`);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Nostr keys.');
  await page.locator('.header-start').click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bring your identity along.');
  await context.close();
});

test('internal destinations, anchors, and crawler metadata resolve', async ({ page, request }) => {
  const destinations = new Set<string>();
  for (const path of paths) {
    await page.goto(`./${path}`);
    const links = await page
      .locator('a[href]')
      .evaluateAll((anchors) =>
        anchors.flatMap((anchor) =>
          anchor instanceof HTMLAnchorElement && anchor.origin === location.origin
            ? [anchor.href]
            : [],
        ),
      );
    for (const link of links) destinations.add(link);
  }
  for (const destination of destinations) {
    const response = await request.get(destination);
    expect(response.status(), destination).toBe(200);
    const hash = new URL(destination).hash;
    if (hash) {
      const exists = await page.evaluate(
        ({ html, hash }) =>
          Boolean(
            new DOMParser()
              .parseFromString(html, 'text/html')
              .getElementById(decodeURIComponent(hash.slice(1))),
          ),
        { html: await response.text(), hash },
      );
      expect(exists, destination).toBe(true);
    }
  }
  const sitemap = await request.get('./sitemap.xml');
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain(process.env.SITE_URL ?? 'https://ostrilo.com');
  const robots = await request.get('./robots.txt');
  expect(await robots.text()).toContain('Sitemap:');
});
