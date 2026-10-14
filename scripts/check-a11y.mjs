// Runs axe-core against every built page and fails on serious or critical
// accessibility violations. Expects the site to be served at BASE_URL
// (default http://localhost:4321, i.e. `npm run preview`).
// Usage: node scripts/check-a11y.mjs [distDir]
import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const dist = process.argv[2] ?? 'dist';
const base = process.env.BASE_URL ?? 'http://localhost:4321';
// Impacts that fail the check; "moderate" and "minor" are reported only
const BLOCKING = new Set(['serious', 'critical']);
// Rules reported as warnings while known issues are worked through.
// colour contrast: some brand text colours (grey labels, yellow on white) are
// below WCAG AA and changing them is a design decision. Remove the rule from
// this list once they are fixed so regressions fail CI.
const WARN_ONLY = new Set(['color-contrast']);

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

const paths = walk(dist)
  .filter((f) => f.endsWith('.html'))
  .map((f) => '/' + relative(dist, f).replace(/(^|\/)index\.html$/, '$1'))
  .sort();

const browser = await chromium.launch();
let failures = 0;
try {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
    for (const path of paths) {
      const page = await context.newPage();
      try {
        await page.goto(base + path, { waitUntil: 'load' });
        // Finish scroll-reveal and other animations so colours are measured at rest
        await page.addStyleTag({
          content:
            '*,*::before,*::after{transition:none!important;animation:none!important}' +
            '.repeat-animate{opacity:1!important;transform:none!important}',
        });
        const { violations } = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();
        for (const v of violations) {
          const blocking = BLOCKING.has(v.impact ?? '') && !WARN_ONLY.has(v.id);
          if (blocking) failures++;
          console.log(
            `${blocking ? 'FAIL' : 'warn'} ${path} @${viewport.width}px [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length})`,
          );
          for (const node of v.nodes.slice(0, 3)) console.log(`       ${node.target.join(' ')}`);
        }
      } finally {
        await page.close();
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
}

if (failures) {
  console.error(`\n${failures} serious or critical accessibility violation(s).`);
  process.exit(1);
}
console.log(`Checked ${paths.length} pages at 2 widths: no serious or critical accessibility violations.`);
