/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_APP_BASE: string;
  readonly VITE_APP_BASE_API: string;
  readonly VITE_APP_BASE_API_DEV: string;
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_BASE_URL_DEV: string;
  readonly VITE_APP_LOAD_ROUTE_WAY: 'FRONTEND' | 'BACKEND';

  readonly VITE_API_HOST: string;
  readonly VITE_OSS_UPLOAD: string;
  readonly VITE_OSS_SHOW: string;
  readonly VITE_MAP_NAME: string;
  readonly VITE_OPEN_MOCK: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
