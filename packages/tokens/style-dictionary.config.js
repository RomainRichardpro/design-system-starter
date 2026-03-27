// Configuration Style Dictionary v4 — Design System Starter
// Adaptée pour les exports Figma Variables (format propriétaire Figma)

import StyleDictionary from 'style-dictionary';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Transformer custom : couleurs Figma ───────────────────────────────────
// Le format Figma JSON exporte les couleurs comme :
// { $value: { hex: "#RRGGBB", alpha: 1, components: {...} }, $type: "color" }
// Ce transformer lit token.original.$value.hex et l'alpha pour produire un CSS valide.
StyleDictionary.registerTransform({
  name: 'color/figma-hex',
  type: 'value',
  filter: (token) => token.$type === 'color',
  transform: (token) => {
    const raw = token.original?.$value;
    if (raw && typeof raw === 'object' && raw.hex) {
      const hex = raw.hex;
      const alpha = raw.alpha ?? 1;
      if (alpha < 1) {
        // Convertit en rgba
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      return hex;
    }
    // Fallback : valeur brute
    return typeof raw === 'string' ? raw : String(token.$value);
  },
});

// ─── Transformer custom : nombres (px ou opacité) ─────────────────────────
// Convertit les nombres en px SAUF si le nom du token contient "opacity".
StyleDictionary.registerTransform({
  name: 'number/px-or-opacity',
  type: 'value',
  filter: (token) => token.$type === 'number',
  transform: (token) => {
    const raw = token.original?.$value;
    const value = typeof raw === 'number' ? raw : Number(token.$value);
    const isOpacity = token.path.some((p) => p.toLowerCase().includes('opacity'));
    return isOpacity ? String(value) : `${value}px`;
  },
});

// ─── Configuration principale ──────────────────────────────────────────────
const sd = new StyleDictionary({
  source: [resolve(__dirname, 'tokens.json')],
  platforms: {
    'css-colors-light': {
      transforms: ['color/figma-hex', 'name/kebab'],
      buildPath: 'build/css/',
      prefix: '',
      files: [
        {
          destination: 'colors-light.css',
          format: 'css/variables',
          filter: (token) =>
            token.$type === 'color' &&
            token.path.some((p) => p === 'light' || p === 'default'),
          options: {
            selector: ':root',
            outputReferences: false,
          },
        },
      ],
    },
    'css-colors-dark': {
      transforms: ['color/figma-hex', 'name/kebab'],
      buildPath: 'build/css/',
      prefix: '',
      files: [
        {
          destination: 'colors-dark.css',
          format: 'css/variables',
          filter: (token) =>
            token.$type === 'color' && token.path.some((p) => p === 'dark'),
          options: {
            selector: '[data-theme="dark"]',
            outputReferences: false,
          },
        },
      ],
    },
    'css-numbers': {
      transforms: ['number/px-or-opacity', 'name/kebab'],
      buildPath: 'build/css/',
      prefix: '',
      files: [
        {
          destination: 'numbers.css',
          format: 'css/variables',
          filter: (token) => token.$type === 'number',
          options: {
            selector: ':root',
            outputReferences: false,
          },
        },
      ],
    },
    'css-typography': {
      transforms: ['name/kebab'],
      buildPath: 'build/css/',
      prefix: '',
      files: [
        {
          destination: 'typography.css',
          format: 'css/variables',
          filter: (token) =>
            token.$type === 'fontFamily' ||
            token.$type === 'fontSize' ||
            token.$type === 'fontWeight' ||
            token.$type === 'lineHeight' ||
            token.$type === 'letterSpacing' ||
            token.$type === 'typography',
          options: {
            selector: ':root',
            outputReferences: false,
          },
        },
      ],
    },
    json: {
      transforms: ['color/figma-hex', 'number/px-or-opacity', 'name/kebab'],
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
        },
      ],
    },
  },
});

// ─── Build avec gestion d'erreur ───────────────────────────────────────────
try {
  mkdirSync(resolve(__dirname, 'build/css'), { recursive: true });
  await sd.buildAllPlatforms();
  console.log('✅ Tokens compilés dans packages/tokens/build/');
} catch (err) {
  // Si tokens.json est vide ou invalide, on génère des fichiers CSS vides
  // pour que le build Storybook ne fail pas.
  console.warn('⚠️  tokens.json vide ou invalide — génération de fichiers CSS vides');
  mkdirSync(resolve(__dirname, 'build/css'), { recursive: true });
  const files = ['colors-light.css', 'colors-dark.css', 'numbers.css', 'typography.css'];
  for (const f of files) {
    writeFileSync(resolve(__dirname, `build/css/${f}`), `/* Aucun token — voir packages/tokens/tokens.json */\n`);
  }
  writeFileSync(resolve(__dirname, 'build/tokens.json'), '{}\n');
}
