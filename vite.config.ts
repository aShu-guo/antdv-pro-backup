import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { loadEnv } from 'vite';
import type { ConfigEnv, UserConfig } from 'vite';
import { createVitePlugins } from './configs/plugins';

const baseSrc = fileURLToPath(new URL('./src', import.meta.url));

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, fileURLToPath(new URL('./configs/envs', import.meta.url)));

  return {
    envDir: './configs/envs',
    plugins: createVitePlugins(env),
    resolve: {
      alias: [
        { find: 'dayjs', replacement: 'dayjs/esm' },
        { find: /^dayjs\/locale/, replacement: 'dayjs/esm/locale' },
        { find: /^dayjs\/plugin/, replacement: 'dayjs/esm/plugin' },
        {
          find: 'vue-i18n',
          replacement:
            mode === 'development' ? 'vue-i18n/dist/vue-i18n.esm-browser.js' : 'vue-i18n/dist/vue-i18n.esm-bundler.js',
        },
        { find: /^ant-design-vue\/es$/, replacement: 'ant-design-vue/es' },
        { find: /^ant-design-vue\/dist$/, replacement: 'ant-design-vue/dist' },
        { find: /^ant-design-vue\/lib$/, replacement: 'ant-design-vue/es' },
        { find: /^ant-design-vue$/, replacement: 'ant-design-vue/es' },
        { find: 'lodash', replacement: 'lodash-es' },
        { find: '~@', replacement: baseSrc },
        { find: '~', replacement: baseSrc },
        { find: '@', replacement: baseSrc },
        { find: '~#', replacement: resolve(baseSrc, './enums') },
      ],
    },
    build: {
      chunkSizeWarningLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia', 'vue-i18n', '@vueuse/core'],
            antd: ['ant-design-vue', '@ant-design/icons-vue', 'dayjs'],
            // lodash: ['loadsh-es'],
          },
        },
      },
    },
    server: {
      port: 6678,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
        },
      },
    },
  };
};
