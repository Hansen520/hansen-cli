/* 路由的菜单数据 */
export interface RouterMenus {
  id: string /* 每一项的id 唯一 */;
  name: string /* 菜单名称 */;
  path?: string /* 菜单路径 */;
  icon?: string /* icon名称，以字符串为主 */;
  component?: string /* 文件目录 以 /src/pages/为根目录， example: /src/pages/Home 就是以pages下面的Home文件, 多级目录择不存在  */;
  isParent: boolean /* 是否有父级菜单，除一级菜单以外其他都有 */;
  isHidden?: boolean /* 当前菜单是否隐藏， 如跳转详情而不去显示详情菜单可用，作为额外的备项 */;
  auth?: any[], /* 此为用户角色权限，后续根据复杂度增加去显影菜单 */
  children?: RouterMenus[] /* 子集路由 */;
}

/* 后端响应回来的数据 */
export interface ResultData {
  [key: string]: any;
  success: boolean;
  errorCode: number;
  msg?: string;
  data?: any;
}

/* 请求的枚举 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 401,
  NotFond = 404,
  TIMEOUT = 10000,
  TYPE = "success",
}

/*
 * @description：请求方法
 */
export enum RequestEnum {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

/**
 * @description：常用的contentTyp类型
 */
export enum ContentTypeEnum {
  // json
  JSON = "application/json;charset=UTF-8",
  // text
  TEXT = "text/plain;charset=UTF-8",
  // form-data 一般配合qs
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data 上传
  FORM_DATA = "multipart/form-data;charset=UTF-8",
}
