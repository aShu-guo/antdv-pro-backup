import { RouteRecordRaw } from 'vue-router';
import { basicRouteMap } from '~/router/router-modules.ts';

export const AccountRoutes = {
  Index: { path: '/account', name: 'Account' },
  Center: { path: '/account/center', name: 'AccountCenter' },
  Settings: { path: '/account/settings', name: 'AccountSettings' },
};

export const AccountRecords: RouteRecordRaw = {
  ...AccountRoutes.Index,
  redirect: AccountRoutes.Center.path,
  component: basicRouteMap.RouteView,
  meta: {
    title: '个人页',
    icon: 'UserOutlined',
    locale: 'menu.account',
  },
  children: [
    {
      ...AccountRoutes.Center,
      component: () => import('~/pages/account/center.vue'),
      meta: {
        title: '个人主页',
        locale: 'menu.account.center',
      },
    },
    {
      ...AccountRoutes.Settings,
      component: () => import('~/pages/account/settings.vue'),
      meta: {
        title: '个人设置',
        locale: 'menu.account.settings',
      },
    },
  ],
};
