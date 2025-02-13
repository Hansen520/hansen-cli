/*
 * @Date: 2023-11-29 10:45:00
 * @Description: description
 */
import { Toast } from 'antd-mobile';
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { GongLu } from '@/typings/index';
import { getAuth, setAuth } from '@/utils';
import history from '@/utils/history';
import _ from 'lodash-es';

const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间（10s）
  timeout: 10000,
  // 跨域时候允许携带凭证
  withCredentials: true,
};

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
        const token: string = getAuth();
        return {
          ...config,
          headers: {
            ...config.headers,
            token,
          },
        };
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    /* 响应拦截 */
    this.service.interceptors.response.use(
      (response: AxiosResponse): any => {
        const { data }: { data: GongLu.ResultData; config: any } = response;
        /* 文件流单独处理, 暂不清除，需配合config.responseType使用 */
        if (Object.prototype.toString.call(response.data) === '[object Blob]') {
          return response.data;
        }
        /* 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错 */
        if (data.code && data.status === GongLu.ResultEnum.OVERDUE) {
          Toast.show({ content: data.message as string });
          // history.push('/login');
          return Promise.reject(data);
        }
        return data.data;
      },
      (error: AxiosError) => {
        /* 401退出鉴权 */
        const code = _.get(error, 'response.data.code');
        if (
          _.get(error, 'response.status') === GongLu.ResultEnum.OVERDUE &&
          code !== 20002
        ) {
          setAuth('');
          // history.push('/login');
          Toast.show({ content: '用户登录已过期，请重新登录' });
          return Promise.reject(error);
        }
        Toast.show({
          content: (_.get(error, 'response.data.message') ||
            '您的网络发生异常，无法连接服务器') as any,
        });
        return Promise.reject(error);
      },
    );
  }

  /* 常用请求方法封装 */
  get(url: string, params?: object, _object = {}): Promise<GongLu.ResultData> {
    return this.service.get(url, { params, ..._object });
  }

  post(url: string, params?: object, _object = {}): Promise<GongLu.ResultData> {
    return this.service.post(url, params, _object);
  }

  put(url: string, params?: object, _object = {}): Promise<GongLu.ResultData> {
    return this.service.put(url, params, _object);
  }

  delete(url: string, params?: any, _object = {}): Promise<GongLu.ResultData> {
    return this.service.delete(url, { params, ..._object });
  }
}
export default new HttpRequest(config as any);
