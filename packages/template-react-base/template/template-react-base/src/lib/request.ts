/*
 * @Date: 2023-09-27 13:35:33
 * @Description: description
 */

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ResultData {
    [key: string]: any;
    success: boolean;
    errorCode: number;
    msg?: string;
    data?: any;
  }

const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间（10s）
  timeout: 10000,
  // 跨域时候允许携带凭证
  withCredentials: true,
};

declare const fileFlow: boolean;
/* 用于是否请求文件流的判断 */
interface FileFlow {
  fileFlow: boolean;
}
class HttpRequest {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig & FileFlow) {
    /* 实例化axios */
    this.service = axios.create(config);
    /* 请求拦截 */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig): any => {
        return {
          ...config,
          headers: {
            ...config.headers,
          },
        };
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    /* 响应拦截 */
    this.service.interceptors.response.use(
      (response: AxiosResponse): any => {
        const data = response.data;
        return data.data;
      },
      (error: AxiosError) => {
        Promise.reject("您的网络发生异常，无法连接服务器");
        
        return Promise.reject(error);
      }
    );
  }
  /* 常用请求方法封装 */
  get(url: string, params?: object, _object = {}): Promise<ResultData> {
    return this.service.get(url, { params, ..._object });
  }
  post(url: string, params?: object, _object = {}): Promise<ResultData> {
    return this.service.post(url, params, _object);
  }
  put(url: string, params?: object, _object = {}): Promise<ResultData> {
    return this.service.put(url, params, _object);
  }
  delete(url: string, params?: any, _object = {}): Promise<ResultData> {
    return this.service.delete(url, { params, ..._object });
  }
}
export default new HttpRequest(config as any);
