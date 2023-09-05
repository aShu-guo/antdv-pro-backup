import type { RouteRecordRaw } from 'vue-router';
import { AccessRecords } from '~/router/async/access.ts';
import { AccountRecords } from '~/router/async/account.ts';
import { DashboardRecords, DashboardRoutes } from '~/router/async/dashboard.ts';
import { ExceptionRecords } from '~/router/async/exception.ts';
import { FormRecords } from '~/router/async/form.ts';
import { LinkRecords } from '~/router/async/link.ts';
import { ListRecords } from '~/router/async/list.ts';
import { MenuRecords } from '~/router/async/menu.ts';
import { ProfileRecords } from '~/router/async/profile.ts';
import { ResultRecords } from '~/router/async/result.ts';

export const ROOT_ROUTE_REDIRECT_PATH = '/dashboard';

export const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'rootPath',
  redirect: DashboardRoutes.Index.path,
  component: () => import('~/layouts/index.vue'),
  children: [],
};

export default [
  DashboardRecords,
  FormRecords,
  LinkRecords,
  MenuRecords,
  ProfileRecords,
  AccessRecords,
  ExceptionRecords,
  ResultRecords,
  ListRecords,
  AccountRecords,
] as RouteRecordRaw[];
