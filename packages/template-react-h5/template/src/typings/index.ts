/*
 * @Date: 2023-11-29 15:03:02
 * @FilePath: /zhousan-mine-h5/src/typings/index.ts
 */
import { ComponentClass, FunctionComponent, ReactNode } from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export namespace GongLu {
  // switch
  export type SwitchType = 'right' | 'bottom' | 'scroll' | 'fade';
  type TabBarType = {
    icon: string;
    title: string;
  };
  export interface RouteConfig {
    routes?: RouteConfig[]; // 子列表
    tabBars?: (RouteConfig & TabBarType)[];
    isTabIndex?: boolean;
    sceneMode?: SwitchType;
    title?: string;
    path: string;
    component: ComponentClass<any> | FunctionComponent<any>;
  }
  export type RouteTabBar = RouteConfig & TabBarType;

  // notice
  export interface NoticeProps {
    key?: string;
    content?: string;
    type: 'loading' | 'success' | 'fail' | 'warning' | 'info';
    duration: number;
    onClose?: () => void;
  }

  export interface NotifiCationRef {
    // add notice
    addNotice: (notice: NoticeProps) => () => void;
    // removeAll notice
    removeAll: () => void;
  }
  export interface NotifiCation extends NotifiCationRef {
    destroy: () => void;
  }
  export interface NotifiCationProps {
    transitionTime?: number;
    duration?: number;
  }

  export type AnimatedSwitchProps = Omit<CSSTransitionProps<any>, 'addEndListener'> & {
    children?: ReactNode;
    primaryKey: string | number | null;
    type?: SwitchType;
    backClassName?: string;
    forwardClassName?: string;
  };

  export interface VirListProps {
    list: any[];
    itemH: number;
    itemRender: (key: any, val: any) => ReactNode;
    wrapNum?: number;
    loadMoreHieght?: number;
    height?: number;
    wrapperClass?: string;
    isEndLoad?: boolean;
    refreshHeight?: number;
    pageSize?: number;
  }

  /* 请求的枚举 */
  export enum ResultEnum {
    SUCCESS = 200,
    ERROR = 500,
    OVERDUE = 401,
    NotFond = 404,
    TIMEOUT = 10000,
    TYPE = 'success',
  }

  /*
   * @description：请求方法
   */
  export enum RequestEnum {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
  }

  /* 后端响应回来的数据 */
  export interface ResultData {
    [key: string]: any;
    success: boolean;
    errorCode: number;
    msg?: string;
    data?: any;
    status?: number;
  }

  export type RequestResponse = {
    code: number;
    data: any;
    message: string;
  };

  export interface IPaginationResponse {
    total: number;
    page: number;
    size: number;
  }

  export enum StorageVal {
    AlarmStorage = 'AlarmStorage' /* 报警存储 */,
    UserInfo = 'UserInfo' /* 用户信息 */,
    AuthList = 'authList' /* 用户信息 */,
  }
}
