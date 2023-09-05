import { RouteRecordRaw } from 'vue-router';
import { basicRouteMap } from '~/router/router-modules.ts';

export const ResultRoutes = {
  Index: { path: '/result', name: 'Result' },
  Success: { path: '/result/success', name: 'ResultSuccess' },
  Fail: { path: '/result/fail', name: 'ResultFail' },
};

export const ResultRecords: RouteRecordRaw = {
  ...ResultRoutes.Index,
  redirect: ResultRoutes.Success.path,
  component: basicRouteMap.RouteView,
  meta: {
    title: '结果页',
    icon: 'CheckCircleOutlined',
    locale: 'menu.result',
  },
  children: [
    {
      ...ResultRoutes.Success,
      component: () => import('~/pages/result/success.vue'),
      meta: {
        title: '成功页',
        locale: 'menu.result.success',
      },
    },
    {
      ...ResultRoutes.Fail,
      component: () => import('~/pages/result/fail.vue'),
      meta: {
        title: '失败页',
        locale: 'menu.result.fail',
      },
    },
  ],
};
