import { RouteRecordRaw } from 'vue-router';
import { basicRouteMap } from '~/router/router-modules.ts';

export const DashboardRoutes = {
  Index: { path: '/dashboard', name: 'Dashboard' },
  Analysis: { path: '/dashboard/analysis', name: 'DashboardAnalysis' },
};

export const DashboardRecords: RouteRecordRaw = {
  ...DashboardRoutes.Index,
  redirect: DashboardRoutes.Analysis.path,
  component: basicRouteMap.RouteView,
  meta: {
    title: '仪表盘',
    icon: 'DashboardOutlined',
  },
  children: [
    {
      ...DashboardRoutes.Analysis,
      component: () => import('~/pages/dashboard/analysis.vue'),
      meta: {
        title: '分析页',
      },
    },
  ],
};
