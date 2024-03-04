import legacy from '@vitejs/plugin-legacy';
import ViteRestart from 'vite-plugin-restart';
import multiInput from 'rollup-plugin-multi-input';
import copy from 'rollup-plugin-copy';
import PluginCritical from 'rollup-plugin-critical';
import path from 'path';

export default ({command}) => ({
  base: command === 'serve' ? '' : '/dist/',
  publicDir: './public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './public/')
    },
    preserveSymlinks: true,
  },
  build: {
    emptyOutDir: false,
    manifest: true,
    outDir: '../backend/craft/web/dist/',
    rollupOptions: {
      input: ['./src/js/main.js'],
      output: {
        dir: '../backend/craft/web/dist/'
      },
    },
    plugins: [
      multiInput({relative: 'src/'}),
    ],
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    ViteRestart({
      reload: [
        '../backend/craft/templates/**/*',
        './static/*',
      ],
    }),
    copy({
      targets: [
        {src: ['./static/*'], dest: '../backend/craft/web/dist/static/'},
      ],
      verbose: true,
      copyOnce: true,
      hook: 'buildStart'
    }),
    /*
    PluginCritical({
      criticalUrl: 'https://schloss-muenchenwiler.ch',
      criticalBase: '../backend/craft/web/dist/criticalcss/',
      base: '/',
      criticalPages: [
        {uri: '/', template: '_templates/_home'},
      ],
      criticalConfig: {
        ignore: ['@font-face', /url\(/],
      },
    }),
     */
  ],
  server: {
    fs: {
      strict: false
    },
    host: '0.0.0.0',
    origin: 'http://localhost:3000',
    port: 3000,
    strictPort: true,
  }
});
