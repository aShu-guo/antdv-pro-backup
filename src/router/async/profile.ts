import { RouteRecordRaw } from 'vue-router';
import { basicRouteMap } from '~/router/router-modules.ts';

export const ProfileRoutes = {
  Index: { path: '/profile', name: 'profile' },
  Basic: { path: '/profile/basic', name: 'ProfileBasic' },
};

export const ProfileRecords: RouteRecordRaw = {
  ...ProfileRoutes.Index,
  redirect: ProfileRoutes.Basic.path,
  component: basicRouteMap.RouteView,
  meta: {
    title: 'menu.profile',
    icon: 'profile',
    locale: 'menu.profile',
  },
  children: [
    {
      ...ProfileRoutes.Basic,
      component: () => import('~/pages/profile/basic/index.vue'),
      meta: {
        title: 'menu.profile.basic',
        locale: 'menu.profile.basic',
      },
    },
  ],
};
