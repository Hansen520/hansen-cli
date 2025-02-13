/*
 * @Date: 2023-10-11 13:53:06
 * @Description: 权限配置
 */
import { createElement } from "react";
import { isEmpty, intersection } from "lodash-es";
import { RouterMenus } from "@/types/index";
import * as Icon from "@ant-design/icons";
import * as menuIcon from "@/assets/menuIcon/Icon";

const customIcons: { [key: string]: any } = Icon;
/* const customMenuIcon: { [key: string]: any } = menuIcon; * /

/* 递归重置我们所需要的菜单 */
export const loopMenuItem: any = (menus: any) =>
  menus.map(({ icon, children, ...item }: any) => ({
    ...item,
    icon: icon && createElement(customIcons[icon] /*|| customMenuIcon[icon] || customMenuIcon['DocSvg']*/),
    children: children && loopMenuItem(children),
  }));

/* 判断菜单是否有权限 */
export const filterMenus = (list: RouterMenus[], authList: any) => {
  return list.filter((item: RouterMenus) => {
    /* 循环过滤一层 */
    if (item.children) {
      item.children = filterMenus(item.children, authList);
    }
    /* 可以给当前菜单分配对应的用户权限可以用这个 */
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

/* 隐藏此项菜单，作为额外的备注选项 */
export const filterHidden = (list: RouterMenus[]) => {
  return list.filter((item: RouterMenus) => {
    /* 循环过滤一层 */
    if (item.children) {
        item.children = filterHidden(item.children);
      }
    return item.isHidden ? false : true;
  });
};

/* 获取权限列表 */
export const getPermissionList = (auth: any) => {
  const result: string[] = [];
  Object.keys(auth).forEach((item) => {
    if (auth[item]) {
      result.push(item);
    }
  });
  return result;
};
