import { RouteRecordRaw } from 'vue-router';
import { AccessEnum } from '~/utils/constant.ts';

export const AccessRoutes = {
  Index: { path: '/access', name: 'Access' },
  Common: { path: '/access/common', name: 'AccessCommon' },
  User: { path: '/access/user', name: 'AccessUser' },
  Admin: { path: '/access/admin', name: 'AccessAdmin' },
};

export const AccessRecords: RouteRecordRaw = {
  ...AccessRoutes.Index,
  redirect: AccessRoutes.Common.path,
  meta: {
    title: '权限模块',
    icon: 'ClusterOutlined',
  },
  children: [
    {
      ...AccessRoutes.Common,
      component: () => import('~/pages/access/common.vue'),
      meta: {
        title: '通用权限',
      },
    },
    {
      ...AccessRoutes.User,
      component: () => import('~/pages/access/user.vue'),
      meta: {
        title: '普通用户',
        access: [AccessEnum.USER, AccessEnum.ADMIN],
      },
    },
    {
      ...AccessRoutes.Admin,
      component: () => import('~/pages/access/admin.vue'),
      meta: {
        title: '管理员',
        access: [AccessEnum.ADMIN],
      },
    },
  ],
};
