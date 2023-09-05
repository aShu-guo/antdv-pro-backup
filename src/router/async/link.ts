import { RouteRecordRaw } from 'vue-router';
import { basicRouteMap } from '~/router/router-modules.ts';

export const LinkRoutes = {
  Index: { path: '/link', name: 'Link' },
  Iframe: { path: '/link/iframe', name: 'LinkIframe' },
  Antdv: { path: '/link/antdv', name: 'LinkAntdv' },
};

export const LinkRecords: RouteRecordRaw = {
  ...LinkRoutes.Index,
  redirect: LinkRoutes.Iframe.path,
  meta: {
    title: '链接',
    icon: 'LinkOutlined',
  },
  component: basicRouteMap.RouteView,
  children: [
    {
      ...LinkRoutes.Iframe,
      component: basicRouteMap.Iframe,
      meta: {
        title: 'AntDesign',
        url: 'https://ant.design/',
      },
    },
    {
      ...LinkRoutes.Antdv,
      component: basicRouteMap.Iframe,
      meta: {
        title: 'AntDesignVue',
        url: 'https://antdv.com/',
      },
    },
    /* {
      path: 'https://www.baidu.com',
      name: 'LinkExternal',
      meta: {
        title: '跳转百度',
        // target: '_self',
      },
    }, */
  ],
};
