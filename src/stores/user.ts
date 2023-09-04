import { RouteRecordRaw } from 'vue-router';
import { logoutApi } from '~@/api/common/login';
import { getRouteMenusApi } from '~@/api/common/menu';
import type { UserInfo } from '~@/api/common/user';
import { getUserInfoApi } from '~@/api/common/user';
import type { MenuData } from '~@/layouts/basic-layout/typing';
import { rootRoute } from '~@/router/dynamic-routes';
import { generateFlatRoutes, generateRoutes, generateTreeRoutes } from '~@/router/generate-route';
import { DYNAMIC_LOAD_WAY, DynamicLoadEnum } from '~@/utils/constant';

export const useUserStore = defineStore('user', {
  state: (): {
    routerData: RouteRecordRaw | null;
    menuData: MenuData;
  } & UserInfo => ({
    routerData: null,
    menuData: [],
    // 用户信息
    id: '',
    username: '',
    avatar: '',
    nickname: '',
    roles: [],
  }),
  actions: {
    async getMenuRoutes() {
      const { data } = await getRouteMenusApi();
      return generateTreeRoutes(data ?? []);
    },
    async generateDynamicRoutes() {
      const dynamicLoadWay = DYNAMIC_LOAD_WAY === DynamicLoadEnum.BACKEND ? this.getMenuRoutes : generateRoutes;
      const { menuData, routeData } = await dynamicLoadWay();

      this.$patch((state) => {
        state.menuData = menuData;
        state.routerData = {
          ...rootRoute,
          children: generateFlatRoutes(routeData),
        };
      });
      return this.routerData;
    },
    async getUserInfo() {
      const { data } = await getUserInfoApi();
      if (data) {
        this.$patch((state) => {
          state.id = data.id;
          state.username = data.username;
          state.avatar = data.avatar;
          state.nickname = data.nickname;
          state.roles = data.roles;
        });
      }
    },
    async logout() {
      // 退出登录
      // 1. 清空用户信息
      const token = useAuthorization();
      try {
        await logoutApi();
      } finally {
        this.$reset();
        token.value = null;
      }
    },
  },
});
