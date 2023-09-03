import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { allowList } from '~#/route-allowlist.ts';
import router from '~@/router';

export interface MultiTabItem {
  path: string;
  fullPath: string;
  title: string;
  name?: string;
  icon?: string;
  locale?: string;
  // 判断当前是不是一个固定的标签
  affix?: boolean;
  loading?: boolean;
}

interface MultiTabsStoreProps {
  list: MultiTabItem[];
  activeFullPath: string;
  cacheList: string[];
}

export const useMultiTab = defineStore('multi-tab', {
  state: (): MultiTabsStoreProps => ({
    list: [],
    activeFullPath: '',
    cacheList: [],
  }),
  actions: {
    addItem(route: RouteLocationNormalizedLoaded) {
      if (!route) return;

      // 判断是不是重定向的地址，如果是，那么久不进行处理
      if (route.path.startsWith('/redirect') || route.path.startsWith('/common')) return;
      if (route.path === '/') return;
      if (allowList.includes(route.path)) return;

      // 重置当前的loading为false
      const index = this.list.findIndex((item) => item.fullPath === this.activeFullPath);
      if (index >= 0 && this.list[index].loading) {
        // debugger;
        // 增加一个取消的延迟
        setTimeout(() => {
          this.$patch((state) => {
            // state.list[0].loading = false;
            console.log(state.list[0]);
            state.list.splice(index, 1, { ...state.list[index], loading: false });
          });
        }, 500);
      }

      const appStore = useAppStore();
      if (this.list.some((item) => item.fullPath === route.fullPath)) {
        if (!this.cacheList.includes(route?.name as string) && appStore.layoutSetting.keepAlive) {
          if (route.meta.keepAlive && route.name) {
            this.$patch((state) => {
              state.cacheList.push(route.name as string);
            });
          }
        }
        return;
      }

      const item: MultiTabItem = {
        path: route.path,
        fullPath: route.fullPath,
        title: route.meta.title as string,
        name: route.name as string,
        icon: route.meta.icon,
        affix: route.meta.affix,
        locale: route.meta.locale,
      };
      if (!this.cacheList.includes(item?.name as string) && appStore.layoutSetting.keepAlive) {
        if (route.meta.keepAlive && route.name) {
          this.$patch((state) => {
            state.cacheList.push(route.name as string);
          });
        }
      }

      this.$patch((state) => {
        state.list.push(item);
      });
    },
    close(key: string) {
      const message = useMessage();

      // 判断长度是不是小于等于1，如果是那么这个就不能被关闭
      if (this.list.length <= 1) {
        message.error('不能关闭最后一个标签页');
        return;
      }

      const index = this.list.findIndex((item) => item.fullPath === key);
      if (index < 0) {
        message.error('当前页签不存在无法关闭');
        return;
      }

      const item = this.list[index];
      // 需要判断当前的标签是不是被选中，如果是，还需要判断当前是不是第一个页签，如果是，那么久需要激活上一个页签，如果不是，那就需要激活下一个页签
      if (item.fullPath === this.activeFullPath) {
        const newItem = index === 0 ? this.list[index + 1] : this.list[index - 1];
        this.activeFullPath = newItem.fullPath;
        router.push(newItem.fullPath);
      }

      // 去除缓存
      const appStore = useAppStore();
      if (appStore.layoutSetting.keepAlive && item.name) {
        this.$patch((state) => {
          state.cacheList = state.cacheList.filter((name) => name !== item.name);
        });
      }

      this.$patch((state) => {
        state.list = state.list.filter((item) => item.fullPath !== key);
      });
    },
    refresh(key: string) {
      const index = this.list.findIndex((item) => item.fullPath === key);
      if (index >= 0) {
        const item = this.list[index];

        const index2 = this.cacheList.findIndex((name) => name === item.name);
        this.$patch((state) => {
          // state.list[index].loading = true;
          state.list.splice(index, 1, { ...item, loading: true });
          state.cacheList.splice(index2, 1);
        });
        router.replace(`/redirect/${encodeURIComponent(item.fullPath)}`);
      }
    },
    switchTab(key: string) {
      if (key === this.activeFullPath) return;
      router.push(key);
    },
    closeOther(key: string) {
      this.switchTab(key);
      this.list.forEach((item) => {
        if (item.affix) return;
        if (item.fullPath === key) return;
        this.close(item.fullPath);
      });
    },
    closeLeft(key: string) {
      this.switchTab(key);

      const index = this.list.findIndex((item) => item.fullPath === key);
      const leftList = this.list.slice(0, index);
      leftList.forEach((item) => {
        if (item.affix) return;
        this.close(item.fullPath);
      });
    },
    closeRight(key: string) {
      this.switchTab(key);

      const index = this.list.findIndex((item) => item.fullPath === key);
      const rightList = this.list.slice(index + 1);
      rightList.forEach((item) => {
        if (item.affix) return;
        this.close(item.fullPath);
      });
    },
    clear() {
      this.$reset();
    },
  },
});
/* export const useMultiTab = defineStore('multi-tab', () => {
  const list = ref<MultiTabItem[]>([]);
  const activeFullPath = shallowRef();
  const refreshItem = ref<MultiTabItem | null>(null);
  const appStore = useAppStore();
  const cacheList = ref<string[]>([]);
  const message = useMessage();
  const addItem = (route: RouteLocationNormalizedLoaded) => {
    if (!route) return;
    // 判断是不是重定向的地址，如果是，那么久不进行处理
    if (route.path.startsWith('/redirect') || route.path.startsWith('/common')) return;
    if (route.path === '/') return;
    if (allowList.includes(route.path)) return;
    // 设置当前的loading为false
    if (refreshItem.value) {
      // 增加一个取消的延迟
      setTimeout(() => {
        if (refreshItem.value) {
          refreshItem.value.loading = false;
          refreshItem.value = null;
        }
      }, 500);
    }
    if (list.value.some((item) => item.fullPath === route.fullPath)) {
      if (!cacheList.value.includes(route?.name as string) && appStore.layoutSetting.keepAlive) {
        if (route.meta.keepAlive && route.name) cacheList.value.push(route.name as string);
      }
      return;
    }
    const item: MultiTabItem = {
      path: route.path,
      fullPath: route.fullPath,
      title: route.meta.title as string,
      name: route.name as string,
      icon: route.meta.icon,
      affix: route.meta.affix,
      locale: route.meta.locale,
    };
    if (!cacheList.value.includes(item?.name as string) && appStore.layoutSetting.keepAlive) {
      if (route.meta.keepAlive && route.name) cacheList.value.push(route.name as string);
    }

    list.value.push(item);
  };

  const close = (key: string) => {
    // 判断长度是不是小于等于1，如果是那么这个就不能被关闭
    if (list.value.length <= 1) {
      message.error('不能关闭最后一个标签页');
      return;
    }
    const index = list.value.findIndex((item) => item.fullPath === key);
    if (index < 0) {
      message.error('当前页签不存在无法关闭');
      return;
    }
    const item = list.value[index];
    // 需要判断当前的标签是不是被选中，如果是，还需要判断当前是不是第一个页签，如果是，那么久需要激活上一个页签，如果不是，那就需要激活下一个页签
    if (item.fullPath === activeFullPath.value) {
      const newItem = index === 0 ? list.value[index + 1] : list.value[index - 1];
      activeFullPath.value = newItem.fullPath;
      router.push(newItem.fullPath);
    }
    // 去除缓存
    if (appStore.layoutSetting.keepAlive && item.name) {
      cacheList.value = cacheList.value.filter((name) => name !== item.name);
    }

    list.value = list.value.filter((item) => item.fullPath !== key);
  };

  const refresh = (key: string) => {
    const item = list.value.find((item) => item.fullPath === key);
    if (item) {
      cacheList.value = cacheList.value.filter((name) => name !== item.name);
      item.loading = true;
      refreshItem.value = item;
      router.replace(`/redirect/${encodeURIComponent(item.fullPath)}`);
    }
  };

  const switchTab = (key: string) => {
    if (key === activeFullPath.value) return;
    router.push(key);
  };

  const closeOther = (key: string) => {
    switchTab(key);
    list.value.forEach((item) => {
      if (item.affix) return;
      if (item.fullPath === key) return;
      close(item.fullPath);
    });
  };

  const closeLeft = (key: string) => {
    switchTab(key);

    const index = list.value.findIndex((item) => item.fullPath === key);
    const leftList = list.value.slice(0, index);
    leftList.forEach((item) => {
      if (item.affix) return;
      close(item.fullPath);
    });
  };

  const closeRight = (key: string) => {
    switchTab(key);

    const index = list.value.findIndex((item) => item.fullPath === key);
    const rightList = list.value.slice(index + 1);
    rightList.forEach((item) => {
      if (item.affix) return;
      close(item.fullPath);
    });
  };

  const clear = () => {
    list.value = [];
    cacheList.value = [];
    activeFullPath.value = undefined;
    refreshItem.value = null;
  };
  return {
    list,
    activeFullPath,
    cacheList,
    close,
    clear,
    closeLeft,
    closeRight,
    closeOther,
    refresh,
    switchTab,
    addItem,
  };
}); */
