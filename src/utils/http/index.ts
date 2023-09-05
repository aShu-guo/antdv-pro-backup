import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ContentTypeEnum, RequestEnum } from '~/utils/http/constant.ts';
import { errorInterceptor, requestInterceptor, responseInterceptor } from '~/utils/http/interceptors.ts';
import { axiosLoading } from './loading';
import type { AxiosOptions, RequestConfigExtra, BizResponse } from '~/utils/http/typing.ts';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API ?? '/',
  timeout: 60000,
  headers: { 'Content-Type': ContentTypeEnum.JSON },
});

instance.interceptors.request.use(requestInterceptor);

instance.interceptors.response.use(responseInterceptor, errorInterceptor);

export default instance;

const instancePromise = <R = any, T = any>(options: AxiosOptions<T> & RequestConfigExtra): Promise<BizResponse<R>> => {
  const { loading } = options;
  return new Promise((resolve, reject) => {
    instance
      .request(options)
      .then((res) => {
        resolve(res as any);
      })
      .catch((e: Error | AxiosError) => {
        reject(e);
      })
      .finally(() => {
        if (loading) axiosLoading.closeLoading();
      });
  });
};

export const useGet = <R = any, T = any>(
  url: string,
  params?: T,
  config?: AxiosRequestConfig & RequestConfigExtra,
): Promise<BizResponse<R>> => {
  const options = {
    url,
    params,
    method: RequestEnum.GET,
    ...config,
  };
  return instancePromise<R, T>(options);
};

export const usePost = <R = any, T = any>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig & RequestConfigExtra,
): Promise<BizResponse<R>> => {
  const options = {
    url,
    data,
    method: RequestEnum.POST,
    ...config,
  };
  return instancePromise<R, T>(options);
};

export const usePut = <R = any, T = any>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig & RequestConfigExtra,
): Promise<BizResponse<R>> => {
  const options = {
    url,
    data,
    method: RequestEnum.PUT,
    ...config,
  };
  return instancePromise<R, T>(options);
};

export const useDelete = <R = any, T = any>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig & RequestConfigExtra,
): Promise<BizResponse<R>> => {
  const options = {
    url,
    data,
    method: RequestEnum.DELETE,
    ...config,
  };
  return instancePromise<R, T>(options);
};
