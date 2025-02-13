/*
 * @Date: 2023-11-29 10:45:00
 * @Description: 各种工具类库
 */
import qs from 'qs';
import _ from 'lodash-es';
import { GongLu } from '@/typings';
export const setAuth = (auth: string) => {
  window.localStorage.setItem('token', auth);
};

export const getAuth = () => {
  const auth = window.localStorage.getItem('token');
  return auth || '';
};
export const hasAuthed = (key: GongLu.ResourceContent) => {
  const res = JSON.parse(getStorage(GongLu.StorageVal.AuthList) || '[]');

  return res.indexOf(key) > -1;
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

/*
  更新本地存储
*/
export const updateStorage = (key: string, newValue: any) => {
  try {
    const oldValue = getStorage(key);
    const _newValue = typeof newValue === 'string' ? newValue : Object.assign({}, oldValue, newValue);
    setStorage(key, _newValue);
  } catch (error) {
    console.error(error);
  }
};

/* 判断当前月在第几季度 */
export const getQuarter = (month: number) => {
  if (month >= 1 && month <= 3) {
    return 1;
  } else if (month >= 4 && month <= 6) {
    return 2;
  } else if (month >= 7 && month <= 9) {
    return 3;
  } else if (month >= 10 && month <= 12) {
    return 4;
  } else {
    return -1; // 无效的月份
  }
};
export const getCode = () => {
  return window.location.search ? searchObj(window.location.search).code : window.location.pathname.split('/')[2];
};

/* string -> parse */
export function parseQueryString(queryString: string) {
  const params: any = {};

  if (queryString) {
    const keyValuePairs = queryString.slice(1).split('&');

    for (const pair of keyValuePairs) {
      const [key, value] = pair.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  }

  return params;
}
/* parse-> string */
export function stringifyQueryString(params: any) {
  const keyValuePairs = [];

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }

  return keyValuePairs.join('&');
}

/* 获取路径的文件名 */

export const getFileNameByUrl = (url: string) => {
  console.log(url, 110);
  if (!url) return;
  const fileName = (url as any).split('/').pop().split('?')[0];
  return decodeURIComponent(fileName) || '';
};
/**
 * 上传文件封装
 * @param file
 */
export const uploadFormData = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return {
    formData,
    params: {
      fileName: file.name.substring(0, file.name.lastIndexOf('.')),
    },
  };
};

/**
 * @description: 通过文件地址下载文件
 * @param {*} href 下载路径
 * @param {*} fileName 文件名
 */
export const fileDownload = (href: string, fileName: string) => {
  // console.log(href, fileName);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.setAttribute('target', '_blank');
  fileName && a.setAttribute('download', fileName);
  a.href = href;
  a.setAttribute('href', href);
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
    method: 'get',
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
        type: 'application/octet-stream',
      });
      // 将 Blob 对象转为 url
      const link = window.URL.createObjectURL(e);
      const a = document.createElement('a');
      a.href = link;
      a.download = fileName;
      a.click();
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 * @description 金额逗号分隔
 * @type
 * @default
 * @example 1314520.86 => 1,314,520.86
 */
export const formatPrice = function (number: number) {
  /* 设置边界值 */
  if (number === 0) return '0';
  if (number === undefined) return '0';
  // 没有则返回undefined
  if (!number) return undefined;
  let n = number;
  let r = '';
  let temp: any;
  do {
    // 求模的值， 用于获取高三位，这里可能有小数
    const mod = n % 1000;
    // 值是不是大于1，是继续的条件
    n = n / 1000;
    // 高三位
    temp = ~~mod;
    // 1.填充: n > 1 循环未结束， 就要填充为比如 1 => 001
    // 不然temp = ~~mod的时候, 1 001， 就会变成 "11"
    // 2.拼接“,”
    r = (n >= 1 ? ''.concat(temp).padStart(3, '0') : temp) + (r ? ',' + r : '');
  } while (n >= 1);
  const strNumber = number + '';
  const index = strNumber.indexOf('.');
  // 拼接小数部分
  if (index >= 0) {
    r += strNumber.substring(index);
  }
  return r;
};

/* 生成位移标识 */
export const handleData = () => {
  /**
   * 生成 uuid
   * @returns 唯一标识uuid
   */
  function getUuid() {
    const tempUrl = URL.createObjectURL(new Blob());
    const uuid = tempUrl.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
    URL.revokeObjectURL(tempUrl);
    return uuid.substr(uuid.lastIndexOf('/') + 1);
  }

  return {
    getUuid,
  };
};

/**
 * 获取url参数
 * @param search url参数
 */
export const searchObj = (search: string) => {
  const body = JSON.parse(
    '{"'.concat(
      decodeURIComponent(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"'),
      '"}',
    ),
  );
  return body;
};

/* 树转list */
export const treeToList = (list: any[], parents: string | string[]) => {
  let adtaList: any[] = [];
  list.forEach((v) => {
    if (typeof parents === 'string') {
      if (v[parents]) {
        adtaList = [...adtaList, ...treeToList(v[parents], parents)];
      } else {
        adtaList.push(v);
      }
    } else {
      let isHave = false;
      parents.forEach((parent) => {
        if (v[parent]) {
          adtaList = [...adtaList, ...treeToList(v[parent], parents)];
          isHave = true;
        }
      });
      if (!isHave) {
        adtaList.push(v);
      }
    }
  });
  return adtaList;
};

/* 设置窗体高度 */
export const setWindowHeight = () => {
  const windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  if (typeof windowWidth !== 'number') {
    if (document.compatMode === 'CSS1Compat') {
      windowHeight = document.documentElement.clientHeight;
    } else {
      // @ts-ignore
      windowHeight = window.body.clientHeight;
    }
  }
  document.getElementsByTagName('body')[0].style.setProperty('--height-primary', `${windowHeight}px`);
};
export function qsStringify(params: any) {
  for (const key in params) {
    if (params[key] === '') {
      params[key] = null;
    }
  }
  return qs.stringify(params, { skipNulls: true });
}

// 计算百分比
export const toPercent = (num: number, total: number) => {
  if (!num || !total) {
    return '0%';
  }
  const newTotal = total || 1;
  return `${_.ceil(Math.round((num / newTotal) * 10000) / 100.0)}%`;
};


/* 递归平铺算法, 此争对资源做铺平操作 */
export const flatten = (data: any) => {
  let result: any = [];
  for (const item of data) {
    // 将当前节点添加到结果列表
    result.push(item);
    if (item.childResources) {
      // 递归调用 flattenTree 函数以扁平化子树
      result = result.concat(flatten(item.childResources));
    }
  }
  return result;
}
