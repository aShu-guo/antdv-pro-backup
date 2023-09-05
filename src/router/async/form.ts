import { RouteRecordRaw } from 'vue-router';
import { basicRouteMap } from '~/router/router-modules.ts';

export const FormRoutes = {
  Index: { path: '/form', name: 'Form' },
  Basic: { path: '/form/basic', name: 'FormBasic' },
  Step: { path: '/form/step-form', name: 'FormStep' },
  Advanced: { path: '/form/advanced-form', name: 'FormAdvanced' },
};

export const FormRecords: RouteRecordRaw = {
  ...FormRoutes.Index,
  redirect: FormRoutes.Basic.path,
  component: basicRouteMap.RouteView,
  meta: {
    title: '表单页',
    icon: 'FormOutlined',
  },
  children: [
    {
      ...FormRoutes.Basic,
      component: () => import('~/pages/form/basic-form/index.vue'),
      meta: {
        title: '基础表单',
        locale: 'menu.form.basic-form',
      },
    },
    {
      ...FormRoutes.Step,
      component: () => import('~/pages/form/step-form/index.vue'),
      meta: {
        title: '分步表单',
        locale: 'menu.form.step-form',
      },
    },
    {
      ...FormRoutes.Advanced,
      component: () => import('~/pages/form/advanced-form/index.vue'),
      meta: {
        title: '高级表单',
        locale: 'menu.form.advanced-form',
      },
    },
  ],
};
