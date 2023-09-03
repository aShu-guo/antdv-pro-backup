import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Unocss from 'unocss/vite';
import AntdvResolver from 'antdv-component-resolver';
import { viteBuildInfo } from './vite-build-info';
import { ConfigVisualizerConfig } from './visualizer';
import { ConfigImageminPlugin } from './imagemin';

export function createVitePlugins(env: Record<string, string>) {
  const vitePluginList: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core', 'pinia'],
      dts: 'types/auto-imports.d.ts',
      dirs: ['src/stores', 'src/composables'],
    }),
    Components({
      resolvers: [AntdvResolver()],
      dts: 'types/components.d.ts',
      dirs: ['src/components'],
    }),
    Unocss(),
    ConfigImageminPlugin(),
    ConfigVisualizerConfig(),
    viteBuildInfo(env.VITE_APP_NAME),
  ];
  return vitePluginList;
}
