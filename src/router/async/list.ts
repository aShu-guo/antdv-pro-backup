import { RouteRecordRaw } from 'vue-router';
import { basicRouteMap } from '~/router/router-modules.ts';

export const ListRoutes = {
  Index: { path: '/list', name: 'List' },
  CardList: { path: '/list/card-list', name: 'CardList' },
  BasicList: { path: '/list/basic-list', name: 'BasicList' },
  SearchList: { path: '/list/search-list', name: 'SearchList' },
  SearchListArticles: { path: '/list/search-list/articles', name: 'SearchListArticles' },
  SearchListProjects: { path: '/list/search-list/projects', name: 'SearchListProjects' },
  SearchListApplications: { path: '/list/search-list/applications', name: 'SearchListApplications' },
};
export const ListRecords: RouteRecordRaw = {
  ...ListRoutes.Index,
  redirect: ListRoutes.CardList.path,
  component: basicRouteMap.RouteView,
  meta: {
    title: '列表页',
    icon: 'TableOutlined',
    locale: 'menu.list',
  },
  children: [
    {
      ...ListRoutes.CardList,
      component: () => import('~/pages/list/card-list.vue'),
      meta: {
        title: '卡片列表',
        locale: 'menu.list.card-list',
      },
    },
    {
      ...ListRoutes.BasicList,
      name: 'BasicList',
      component: () => import('~/pages/list/basic-list.vue'),
      meta: {
        title: '标准列表',
        locale: 'menu.list.basic-list',
      },
    },
    {
      ...ListRoutes.SearchList,
      component: () => import('~/pages/list/search-list/index.vue'),
      meta: {
        title: '搜索列表',
        locale: 'menu.list.search-list',
      },
      redirect: ListRoutes.SearchListArticles.path,
      children: [
        {
          ...ListRoutes.SearchListArticles,
          component: () => import('~/pages/list/search-list/articles.vue'),
          meta: {
            title: '搜索列表（文章）',
            locale: 'menu.list.search-list.articles',
          },
        },
        {
          ...ListRoutes.SearchListProjects,
          component: () => import('~/pages/list/search-list/projects.vue'),
          meta: {
            title: '搜索列表（项目）',
            locale: 'menu.list.search-list.projects',
          },
        },
        {
          ...ListRoutes.SearchListApplications,
          component: () => import('~/pages/list/search-list/applications.vue'),
          meta: {
            title: '搜索列表（应用）',
            locale: 'menu.list.search-list.applications',
          },
        },
      ],
    },
  ],
};
