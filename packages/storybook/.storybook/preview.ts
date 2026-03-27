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
  },
};

export default preview;
