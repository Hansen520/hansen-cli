import { isEmpty, intersection } from "lodash-es";
import { RouterMenus } from "@/types/index";
/**
 * 休眠
 * @param time
 */
export const sleep = (time = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/**
 * 数组转树
 * @param list
 */
export const listToTree = (list: any) => {
  const result: any = [];
  const map: any = new Map();
  list.forEach((item: any) => {
    map[item.value] = item;
  });

  list.forEach((item: any) => {
    if (item.parentId !== null) {
      map[item.parentId].children ? map[item.parentId].children.push(item) : (map[item.parentId].children = [item]);
    } else {
      result.push(item as never);
    }
  });

  return result;
};

/**
 * 左侧导航栏菜单过滤
 * auth不设置默认都有权限
 * @param list
 * @param auth
 */
export const filterMenus = (list: any, authList: any) => {
  return list.filter((item: any) => {
    if (item.children) {
      item.children = filterMenus(item.children, authList);
    }
    if (!isEmpty(item.auth)) {
      // 判断是否有交集
      if (!isEmpty(intersection(authList, item.auth))) {
        return true;
      }
      return false;
    }
    return true;
  });
};

/**
 * 获取权限列表
 * @param auth
 */
export const getPermissionList = (auth: any) => {
  const result: string[] = [];
  Object.keys(auth).forEach((item) => {
    if (auth[item]) {
      result.push(item);
    }
  });
  return result;
};

/**
 * @description 获取本地存储
 * @param {string} key
 * @return {*}
 */
export const getStorage = (key: string) => {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(window.localStorage.getItem(key) as string);
  } catch (error) {
    return value;
  }
};

/**
 * @description 设置本地存储
 * @param {string} key
 * @param {any} value
 * @return {*}
 */
export const setStorage = (key: string, value: any): any => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * @description 移除某个本地存储
 * @param {string} key
 * @return {*}
 */
export const removeStorage = (key: string) => {
  window.localStorage.removeItem(key);
};

/**
 * @description 清空本地存储
 * @return {*}
 */
export const clearStorage = () => {
  window.localStorage.clear();
};

/**
 * @description: 通过文件地址下载文件
 * @param {*} href 下载路径
 * @param {*} fileName 文件名
 */
export const fileDownload = async (href: string, fileName: string) => {
  const a = document.createElement("a");
  a.style.display = "none";
  a.setAttribute("target", "_self");
  /*
   * download的属性是HTML5新增的属性
   * href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。
   * 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式
   * 所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)
   */
  fileName && a.setAttribute("download", fileName);
  a.href = href;
  a.setAttribute("href", href);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  return true;
};

/**
 * @description: 通过文件地址下载文件
 * @param {*} url 下载路径
 * @param {*} fileName 文件名
 * @description 通过blob转换直接下载文件
 */
export const fileDownloadByType = (url: string, fileName: string) => {
  fetch(url, {
    method: "get",
  })
    .then((res) => {
      if (res.status !== 200) {
        return res.json();
      }
      return res.arrayBuffer();
    })
    .then((blobRes) => {
      // 生成 Blob 对象，设置 type 等信息
      const e = new Blob([blobRes], {
        type: "application/octet-stream",
      });
      // 将 Blob 对象转为 url
      const link = window.URL.createObjectURL(e);
      const a = document.createElement("a");
      a.href = link;
      a.download = fileName;
      a.click();
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 * @description: 通过后端接口下载文件
 * @param {*} filename 文件名
 * @param {*} blobContent 后端返回二进制流数据
 * @param {*} type 文件类型
 *
 */
export const fileDownloadByRes = (
  filename: string,
  blobContent: any,
  type = "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
) => {
  const blob = new Blob([blobContent], { type: `application/${type};charset=utf-8` });
  // 获取heads中的filename文件名
  const downloadElement = document.createElement("a");
  // 创建下载的链接
  const href = window.URL.createObjectURL(blob);
  downloadElement.href = href;
  // 下载后文件名
  downloadElement.download = filename;
  document.body.appendChild(downloadElement);
  // 点击下载
  downloadElement.click();
  // 下载完成移除元素
  document.body.removeChild(downloadElement);
  // 释放掉blob对象
  window.URL.revokeObjectURL(href);
};

/**
 * @description: 滑滚动页面到顶部
 */
export const scrollToTop = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, scrollTop - scrollTop / 8);
  }
};

/**
 * @description: 滚动到页面底部
 */
export const scrollToBottom = () => {
  window.scrollTo(0, document.documentElement.clientHeight);
};

/**
 * @description: 获取随机字符串  len为字符串长度
 * @param {*} len
 */
export const randomString = (len: number) => {
  const chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789";
  const strLen = chars.length;
  let randomStr = "";
  for (let i = 0; i < len; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * strLen));
  }
  return randomStr;
};

/**
 * @description: 生成指定范围随机数
 * @param {*} min
 * @param {*} max
 */
export const randomRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * @description: 数组中获取随机数
 * @param {*} arr
 */
export const randomNum = (arr: any) => arr[Math.floor(Math.random() * arr.length)];

/**
 * @description 递归查询对应的路由项目
 * @param {String} key 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (key: string, routes: RouterMenus[] = []) => {
  let result = {};
  for (let item of routes) {
    if (item.path === key) return item;
    if (item.children) {
      const res = searchRoute(key, item.children);
      if (Object.keys(res).length) result = res;
    }
  }
  return result;
};

/**
 * 多组数据的并发请求
 * @param uid uid
 * @param max 最多并发请求数量
 * @param fn 请求的函数
 * @example requestUserProfile(1, () => {})('226')
 */
export const requestUserProfile = (max: number = 2, fn: (uid: string) => any) => {
  /* 缓存resolve */
  const promiseArr: any = [];
  /* 当前的请求数量 */
  let requestCount = 0;
  /* 执行下一个请求 */
  const execNext = async (uid: string) => {
    try {
      requestCount++;
      return await fn(uid);
    } catch (error) {
      console.error(error);
    } finally {
      requestCount--;
      promiseArr.length && promiseArr.shift()(); // 执行下一个请求
    }
  };

  return async (uid: string = "1") => {
    if (requestCount < max) {
      return execNext(uid);
    } else {
      /* 生成一个 pending 状态的 promise，等待前面的请求完成后执行 */
      return new Promise((resolve) => promiseArr.push(resolve)).then(() => {
        execNext(uid);
      });
    }
  };
};
