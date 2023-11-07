import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: process.env.NODE_ENV !== 'production',
              fileName: false
            }
          ]
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      external: new RegExp(`/stories/.*`)
    },
    target: 'esnext'
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@components', replacement: '/src/components' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@resources', replacement: '/src/resources' },
      { find: '@store', replacement: '/src/store' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@stories', replacement: '/src/stories' },
      { find: '@network', replacement: '/src/network' },
      { find: '@types', replacement: '/src/types' },
      { find: '@utils', replacement: '/src/utils' }
    ]
  }
});
