export interface BizResponse<T = any> {
  bizCode: number;
  data?: T;
  message: string;
}

export interface RequestConfigExtra {
  token?: boolean; // 发起请求时，是否设置token到header上
  loading?: boolean; // 发起请求时，是否展示loading
}

export interface AxiosOptions<T> {
  url: string;
  params?: T;
  data?: T;
}
