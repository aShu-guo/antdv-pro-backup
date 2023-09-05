import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { STORAGE_AUTHORIZE_KEY, useAuthorization } from '~/composables/authorization.ts';
import router from '~/router';
import { axiosLoading } from '~/utils/http/loading.ts';
import { RequestConfigExtra, BizResponse } from '~/utils/http/typing.ts';

export const requestInterceptor = (config: InternalAxiosRequestConfig & RequestConfigExtra) => {
  const token = useAuthorization();
  if (token.value && config.token !== false) config.headers.set(STORAGE_AUTHORIZE_KEY, token.value);

  // 增加多语言的配置
  const { locale } = useI18nLocale();
  config.headers.set('Accept-Language', locale.value ?? 'zh-CN');

  if (config.loading) axiosLoading.addLoading();
  return config;
};

/**
 * 响应拦截器，只返回data
 * @param response
 */
export const responseInterceptor = (response: AxiosResponse): BizResponse | AxiosResponse<any> | Promise<any> | any => {
  return response.data;
};

/**
 * 错误拦截器
 * @param error
 */
export const errorInterceptor = (error: AxiosError): Promise<any> => {
  const token = useAuthorization();
  const notification = useNotification();

  if (error.response) {
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    const { data, status, statusText } = error.response as AxiosResponse<BizResponse>;
    switch (status) {
      case 401:
        notification?.error({
          message: '401',
          description: data?.message || statusText,
          duration: 3,
        });
        /**
         * 这里处理清空用户信息和token的逻辑，后续扩展
         */
        token.value = null;
        router.push({
          path: '/login',
          query: {
            redirect: router.currentRoute.value.fullPath,
          },
        });
        break;
      case 403:
        notification?.error({
          message: '403',
          description: data?.message || statusText,
          duration: 3,
        });
        break;
      case 500:
        notification?.error({
          message: '500',
          description: data?.message || statusText,
          duration: 3,
        });
        break;
      default:
        notification?.error({
          message: '服务错误',
          description: data?.message || statusText,
          duration: 3,
        });
        break;
    }
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应。ex：超时
    notification?.error({
      message: '服务错误',
      description: '请求超时',
      duration: 3,
    });
  } else {
    // 发送请求时出了点问题
    console.error('Error', error.message);
  }
  return Promise.reject(error);
};
