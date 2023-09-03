<script setup lang="ts">
const appStore = useAppStore();
const { themeConfig: theme } = storeToRefs(appStore);
const { antd } = useI18nLocale();

// 如果加载进来是暗色模式，就切换到暗色模式
if (isDark.value) appStore.toggleTheme('dark');

// 监听isDark的变化
const unwatch = watch(isDark, () => {
  if (isDark.value) appStore.toggleTheme('dark');
  else appStore.toggleTheme('light');
});

onUnmounted(() => {
  unwatch();
});
</script>

<template>
  <a-config-provider :theme="theme" :locale="antd">
    <a-app class="h-full font-chinese antialiased">
      <TokenProvider>
        <RouterView />
      </TokenProvider>
    </a-app>
  </a-config-provider>
</template>
