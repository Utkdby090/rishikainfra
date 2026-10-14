// Fails when a built page links to a local page or asset that doesn't exist.
// Usage: node scripts/check-links.mjs [distDir]
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const ATTR = /\b(?:href|src|poster)="([^"]*)"/g;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

function decode(url) {
  const unescaped = url.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
  try {
    return decodeURI(unescaped);
  } catch {
    return unescaped;
  }
}

function resolves(path) {
  const target = join(dist, path);
  if (existsSync(target) && statSync(target).isFile()) return true;
  return existsSync(join(target, 'index.html')) || existsSync(`${target.replace(/\/$/, '')}.html`);
}

const missing = new Map();
const pages = walk(dist).filter((f) => f.endsWith('.html'));

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const [, raw] of html.matchAll(ATTR)) {
    // Only site-absolute paths; external URLs, anchors, mailto: and tel: are skipped
    if (!raw.startsWith('/') || raw.startsWith('//')) continue;
    const path = decode(raw.split(/[?#]/)[0]);
    if (!resolves(path)) {
      const from = relative(dist, page);
      missing.set(path, [...(missing.get(path) ?? []), from]);
    }
  }
}

if (missing.size) {
  console.error(`Broken internal links (${missing.size}):`);
  for (const [path, from] of missing) console.error(`  ${path}  <- ${[...new Set(from)].slice(0, 3).join(', ')}`);
  process.exit(1);
}
console.log(`Checked ${pages.length} pages: no broken internal links.`);
