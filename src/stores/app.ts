import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import { theme as antdTheme } from 'ant-design-vue/es';
import type { ContentWidth, LayoutType, ThemeType } from '~@/layouts/basic-layout/typing';
import type { AnimationNameValueType } from '~@/config/default-setting';
import defaultSetting from '~@/config/default-setting';

export interface LayoutSetting {
  title?: string;
  logo?: string;
  theme: ThemeType;
  collapsed: boolean;
  drawerVisible: boolean;
  colorPrimary?: string;
  layout?: LayoutType;
  contentWidth?: ContentWidth;
  fixedHeader?: boolean;
  fixedSider?: boolean;
  splitMenus?: boolean;
  header?: boolean;
  footer?: boolean;
  menu?: boolean;
  menuHeader?: boolean;
  colorWeak?: boolean;
  multiTab?: boolean;
  multiTabFixed?: boolean;
  headerHeight?: number;
  copyright?: string;
  keepAlive?: boolean;
  accordionMode?: boolean;
  animationName?: AnimationNameValueType;
}

export const useAppStore = defineStore('app', {
  state: (): { layoutSetting: LayoutSetting } & { themeConfig: ThemeConfig } => ({
    layoutSetting: defaultSetting,
    themeConfig: {
      algorithm: antdTheme.defaultAlgorithm,
      token: {
        colorBgContainer: '#fff',
        colorPrimary: defaultSetting.colorPrimary,
      },
      components: {},
    },
  }),
  actions: {
    toggleTheme(theme: ThemeType) {
      if (this.layoutSetting.theme === theme) return;

      this.layoutSetting.theme = theme;

      switch (this.layoutSetting.theme) {
        case 'light':
        case 'inverted':
          toggleDark(false);

          if (this.themeConfig.token) this.themeConfig.token.colorBgContainer = '#fff';
          if (this.themeConfig.components?.Menu) delete this.themeConfig.components.Menu;
          this.themeConfig.algorithm = antdTheme.defaultAlgorithm;
          break;
        case 'dark':
          toggleDark(true);
          if (this.themeConfig.token) this.themeConfig.token.colorBgContainer = 'rgb(36, 37, 37)';
          if (this.themeConfig.components) {
            this.$patch({
              themeConfig: {
                algorithm: antdTheme.darkAlgorithm,
                components: {
                  ...this.themeConfig.components,
                  Menu: {
                    colorItemBg: 'rgb(36, 37, 37)',
                    colorSubItemBg: 'rgb(36, 37, 37)',
                    menuSubMenuBg: 'rgb(36, 37, 37)',
                  } as any,
                },
              },
            });
          }
          break;
      }
    },
    toggleDrawerVisible(visible: boolean) {
      this.layoutSetting.drawerVisible = visible;
    },
    toggleColorPrimary(color: string) {
      this.layoutSetting.colorPrimary = color;
      if (this.themeConfig.token) this.themeConfig.token.colorPrimary = color;
    },
    toggleCollapsed(collapsed: boolean) {
      this.layoutSetting.collapsed = collapsed;
    },
    toggleLayout(layout: LayoutType) {
      if (this.layoutSetting.theme === 'inverted' && layout === 'mix') this.layoutSetting.theme = 'light';

      if (layout !== 'mix') this.layoutSetting.splitMenus = false;

      if (layout === 'top') this.layoutSetting.contentWidth = 'Fixed';
      else this.layoutSetting.contentWidth = 'Fluid';

      this.layoutSetting.layout = layout;
    },
    changeSettingLayout(key: keyof LayoutSetting, value: any) {
      if (key === 'theme') this.toggleTheme(value as ThemeType);
      else if (key === 'colorPrimary') this.toggleColorPrimary(value);
      else if (key === 'layout') this.toggleLayout(value as LayoutType);
      else if (key in this.layoutSetting) {
        this.$patch({ layoutSetting: { [key]: value } });
      }
    },
  },
});
