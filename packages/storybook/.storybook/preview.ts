// Chargement global des tokens CSS dans Storybook
// Requiert d'avoir lancé `make tokens` au préalable.
import '@starter/tokens/css/index';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: [
          'Démarrage',
          [
            'Bienvenue',
            'Prérequis',
            'Étape 1 — Initialisation',
            'Étape 2 — Tokens',
            'Étape 3 — Premier composant',
            'Étape 4 — CI/CD',
            'Étape 5 — Code Connect',
          ],
          'Fondations',
          ['Couleurs', 'Typographie', 'Espacements'],
          'Composants',
        ],
      },
    },
  },
};

export default preview;
