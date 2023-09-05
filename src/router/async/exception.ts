import { RouteRecordRaw } from 'vue-router';

export const ExceptionRoutes = {
  Index: { path: '/exception', name: 'Exception' },
  Forbidden: { path: '/exception/403', name: 'Exception403' },
  NotFound: { path: '/exception/404', name: 'Exception404' },
  ServiceInternalError: { path: '/exception/500', name: 'Exception500' },
};

export const ExceptionRecords: RouteRecordRaw = {
  ...ExceptionRoutes.Index,
  redirect: ExceptionRoutes.Forbidden.path,
  meta: {
    title: '异常页',
    icon: 'WarningOutlined',
    locale: 'menu.exception',
  },
  children: [
    {
      ...ExceptionRoutes.Forbidden,
      component: () => import('~/pages/exception/403.vue'),
      meta: {
        title: '403',
        locale: 'menu.exception.not-permission',
      },
    },
    {
      ...ExceptionRoutes.NotFound,
      component: () => import('~/pages/exception/404.vue'),
      meta: {
        title: '404',
        locale: 'menu.exception.not-find',
      },
    },
    {
      ...ExceptionRoutes.ServiceInternalError,
      component: () => import('~/pages/exception/500.vue'),
      meta: {
        title: '500',
        locale: 'menu.exception.server-error',
      },
    },
  ],
};
