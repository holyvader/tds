import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

// import { responseInterceptor } from 'http-proxy-middleware';

const API_KEY = process.env.CURRENCY_BEACON_API_KEY || '';
const API_URL = process.env.API_URL || '';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact(), pluginTailwindcss(), pluginTypeCheck()],
  resolve: {
    alias: {
      '@core': './src/core',
      '@designSystem': './src/designSystem',
      '@features': './src/features',
    },
  },
  dev: {
    client: {
      overlay: false,
    },
  },
  html: {
    title: 'Currency Converter',
  },
  source: {
    define: {
      'process.env.API_URL': JSON.stringify(API_URL),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.currencybeacon.com',
        pathRewrite: { '^/api': '/v1' },
        on: {
          proxyReq: (req) => {
            const referer = req.getHeader('referer');
            if (
              typeof referer !== 'string' ||
              (typeof referer === 'string' && !API_URL.startsWith(referer))
            ) {
              // req.destroy(new Error('Unauthorized'));
            }
            req.setHeader('Authorization', `Bearer ${API_KEY}`);
          },
        },
      },
    },
  },
});
