#!/usr/bin/env node
/**
 * extract-content.js
 * Reads all TSX component files and outputs a single flat markdown document
 * with every page's copy in reading order — no server required.
 *
 * Usage (from project root):
 *   node scripts/extract-content.js
 *
 * Output: website-content-dump.md
 */

const fs   = require('fs');
const path = require('path');

const ROOT = process.cwd();

// ── HTML entity map ───────────────────────────────────────────────────────────
const ENTITIES = {
  '&mdash;': '—', '&ndash;': '–', '&rsquo;': "’", '&lsquo;': "‘",
  '&rdquo;': '”', '&ldquo;': '“', '&amp;': '&', '&nbsp;': ' ',
  '&middot;': '·', '&rarr;': '→', '&hellip;': '…', '&ntilde;': 'ñ',
  '&apos;': "'", '&uacute;': 'ú', '&iacute;': 'í', '&eacute;': 'é',
  '&aacute;': 'á', '&oacute;': 'ó', '&ccedil;': 'ç',
};

function decode(str) {
  let s = str;
  for (const [k, v] of Object.entries(ENTITIES)) s = s.split(k).join(v);
  // Remove short JSX expressions ({' '}, {/* */}, etc.) but leave longer ones
  s = s.replace(/\{[^}]{0,30}\}/g, '');
  return s.replace(/\s+/g, ' ').trim();
}

function innerText(raw) {
  // Strip inner tags, decode, collapse whitespace
  return decode(raw.replace(/<[^>]+>/g, ' '));
}

// ── Per-file extractor ────────────────────────────────────────────────────────
function extractFile(relPath) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return '_[not found]_';

  let src = fs.readFileSync(abs, 'utf8');

  // Remove noise that shouldn't produce content
  src = src
    .replace(/<svg[\s\S]*?<\/svg>/g, '')       // icon SVGs
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')      // JSX block comments
    .replace(/\/\/[^\n]*/g, '')                // line comments
    .replace(/^import\s[^\n]+$/gm, '')         // import lines
    .replace(/^'use client';\s*/m, '')         // directive
    .replace(/useEffect\([\s\S]*?\},\s*\[[\s\S]*?\]\)/g, ''); // useEffect bodies

  const items = []; // { index: number, level: string, text: string }

  const push = (index, level, raw) => {
    const text = innerText(raw);
    if (text.length >= 3) items.push({ index, level, text });
  };

  // 1. SPECS array — ProductSpecs pattern: { k: '...', v: '...' }
  const specsM = src.match(/const SPECS\s*=\s*\[([\s\S]*?)\];/);
  if (specsM) {
    [...specsM[1].matchAll(/k:\s*'([^']+)'\s*,\s*v:\s*'([^']+)'/g)]
      .forEach(([, k, v], i) => items.push({ index: i, level: 'spec', text: `${k}: ${v}` }));
  }

  // 2. OurMission Row component — index and title props
  [...src.matchAll(/\bindex="([^"]+)"/g)].forEach(m =>
    items.push({ index: m.index, level: 'section', text: m[1] })
  );
  // title="plain string"
  [...src.matchAll(/\btitle="([^"]+)"/g)].forEach(m =>
    push(m.index, 'h2', m[1])
  );
  // title={<>JSX fragment</>}
  [...src.matchAll(/\btitle=\{[\s\n]*<>([\s\S]*?)<\/>/g)].forEach(m =>
    push(m.index, 'h2', m[1])
  );

  // 3. Standard HTML block/inline tags
  for (const [tag, level] of [
    ['h1','h1'],['h2','h2'],['h3','h3'],['h4','h4'],
    ['p','p'],['li','li'],['dt','dt'],['dd','dd'],
  ]) {
    const pat = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'g');
    let m;
    while ((m = pat.exec(src)) !== null) push(m.index, level, m[1]);
  }

  // 4. Eyebrow divs/spans (className contains "eyebrow")
  [...src.matchAll(/className="[^"]*eyebrow[^"]*">([^<{]+)</g)].forEach(m =>
    items.push({ index: m.index, level: 'eyebrow', text: decode(m[1]).trim() })
  );

  // 5. Prop defaults — e.g. text = 'Join the mission.'
  [...src.matchAll(/\w+\s*=\s*'([A-Z][a-zA-Z ,.'!?-]{6,}[.!?])'/g)].forEach(m =>
    items.push({ index: m.index, level: 'p', text: m[1] })
  );

  // Sort by source position, then deduplicate by normalised text
  items.sort((a, b) => a.index - b.index);

  const seen = new Set();
  const out  = [];

  for (const { level, text } of items) {
    const clean = text.trim();
    if (!clean) continue;

    // Deduplicate: use first 80 chars of normalised text as the key
    const key = clean.toLowerCase().replace(/\s+/g, ' ').slice(0, 80);
    if (seen.has(key)) continue;
    seen.add(key);

    if      (level === 'section') out.push(`\n**[Section: ${clean}]**`);
    else if (level === 'h1')      out.push(`\n# ${clean}`);
    else if (level === 'h2')      out.push(`\n## ${clean}`);
    else if (level === 'h3')      out.push(`\n### ${clean}`);
    else if (level === 'h4')      out.push(`\n#### ${clean}`);
    else if (level === 'eyebrow') out.push(`\n_${clean}_`);
    else if (level === 'spec')    out.push(`- ${clean}`);
    else if (level === 'li')      out.push(`• ${clean}`);
    else if (level === 'dt')      out.push(`**${clean}**`);
    else if (level === 'dd')      out.push(`  → ${clean}`);
    else                          out.push(clean);
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

// ── Page map ──────────────────────────────────────────────────────────────────
const PAGES = [
  {
    heading: '# HOME PAGE',
    sections: [
      ['Hero',                                   'components/home/Hero.tsx'],
      ['Card 1 — Real Food',                     'components/home/RealFood.tsx'],
      ['Card 2 — Our First Product',             'components/home/OurFirstProduct.tsx'],
      ['Card 3 — Where It\'s From',              'components/home/WhereItsFrom.tsx'],
      ['Card 4 — The Hands Behind the Harvest',  'components/home/Harvester.tsx'],
      ['Interstitial — Real Food Power',         'components/home/RealFoodPower.tsx'],
      ['Product Specifications',                 'components/home/ProductSpecs.tsx'],
      ['Join CTA',                               'components/JoinCTA.tsx'],
    ],
  },
  {
    heading: '# ABOUT PAGE',
    sections: [
      ['Our Mission (long-scroll)',   'components/about/OurMission.tsx'],
      ['Tab — Our Story',            'components/about/OurStory.tsx'],
      ['Tab — Why It Matters',       'components/about/WhyItMatters.tsx'],
      ['Tab — Get In Touch',         'components/about/GetInTouch.tsx'],
    ],
  },
];

// ── Assemble output ───────────────────────────────────────────────────────────
const lines = [
  '# VivaTTerra — Full Website Content',
  `_Extracted ${new Date().toISOString().slice(0, 10)} from Next.js source files_`,
  '',
  'All readable copy from the VivaTTerra website, extracted in page and section',
  'order from the TSX component files. Source of truth is the repository.',
  '',
];

for (const { heading, sections } of PAGES) {
  lines.push(heading, '');
  for (const [label, file] of sections) {
    lines.push(`---\n## ${label}`, '');
    lines.push(extractFile(file), '');
  }
}

const result = lines.join('\n').replace(/\n{4,}/g, '\n\n\n');
const outPath = path.join(ROOT, 'website-content-dump.md');
fs.writeFileSync(outPath, result, 'utf8');

const lineCount = result.split('\n').length;
const kb = (result.length / 1024).toFixed(1);
console.log(`✓  website-content-dump.md`);
console.log(`   ${lineCount} lines · ${kb} KB`);
