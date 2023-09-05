import { RouteRecordRaw } from 'vue-router';
import { basicRouteMap } from '~/router/router-modules.ts';

export const MenuRoutes = {
  Index: { path: '/menu', name: 'Menu' },
  Menu1: { path: '/menu/menu1', name: 'MenuMenu11' },
  Menu2: { path: '/menu/menu2', name: 'MenuMenu12' },
  Menu3: { path: '/menu/menu3', name: 'MenuMenu1-1' },
  Menu3Menu1: { path: '/menu/menu3/menu1', name: 'MenuMenu111' },
  Menu3Menu2: { path: '/menu/menu3/menu2', name: 'MenuMenu112' },
};

export const MenuRecords: RouteRecordRaw = {
  ...MenuRoutes.Index,
  redirect: MenuRoutes.Menu1.path,
  meta: {
    title: '菜单',
    icon: 'BarsOutlined',
  },
  component: basicRouteMap.RouteView,
  children: [
    {
      ...MenuRoutes.Menu1,
      component: () => import('~/pages/menu/menu1.vue'),
      meta: {
        title: '菜单1',
      },
    },
    {
      ...MenuRoutes.Menu2,
      component: () => import('~/pages/menu/menu2.vue'),
      meta: {
        title: '菜单2',
      },
    },
    {
      ...MenuRoutes.Menu3,
      redirect: MenuRoutes.Menu3Menu1.path,
      meta: {
        title: '菜单1-1',
      },
      children: [
        {
          ...MenuRoutes.Menu3Menu1,
          component: () => import('~/pages/menu/menu-1-1/menu1.vue'),
          meta: {
            title: '菜单1-1-1',
          },
        },
        {
          ...MenuRoutes.Menu3Menu2,
          component: () => import('~/pages/menu/menu-1-1/menu2.vue'),
          meta: {
            title: '菜单1-1-2',
          },
        },
      ],
    },
  ],
};
