import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const directory = 'test-results/design-review';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
const paths = ['', 'security/', 'roadmap/', 'developers/', 'start/', 'privacy/'];
for (const colorScheme of ['light', 'dark']) {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ colorScheme, viewport: { width, height: 1000 } });
    const page = await context.newPage();
    for (const route of paths) {
      await page.goto(`http://127.0.0.1:4321/${route}`);
      await page.evaluate(() => document.fonts.ready);
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: `${directory}/${route.replace('/', '') || 'home'}-${colorScheme}-${width}-opening.png`,
      });
      await page.screenshot({
        path: `${directory}/${route.replace('/', '') || 'home'}-${colorScheme}-${width}.png`,
        fullPage: true,
      });
    }
    await page.goto('http://127.0.0.1:4321/');
    await page.getByRole('button', { name: 'Approve example' }).click();
    await page.screenshot({ path: `${directory}/approved-${colorScheme}-${width}.png` });
    await page.getByRole('button', { name: 'Try the other decision' }).click();
    await page.getByRole('button', { name: 'Deny', exact: true }).click();
    await page.screenshot({ path: `${directory}/denied-${colorScheme}-${width}.png` });
    await context.close();
  }
}
await browser.close();
process.stdout.write(`Screenshots saved to ${directory}\n`);
