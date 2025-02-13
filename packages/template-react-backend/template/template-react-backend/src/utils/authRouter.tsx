/*
 * @Date: 2023-10-11 13:53:06
 * @Description: 路由权限
 */
import { ReactNode } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { getStorage } from "./index";
import { RouterMenus } from "@/types/index";
import { getPermissionList, filterMenus } from './authConfig';
import { asideMenuConfig } from "@/layouts/BasicLayout/menuConfig";
import { cloneDeep } from 'lodash-es';
import store from '@/store';

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} menuList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
export function handleRouter(routerList: RouterMenus[], newArr: string[] = []) {
  
  // const authList = filterMenus(cloneDeep(asideMenuConfig), getPermissionList(global.auth))
  routerList.forEach((item) => {
    typeof item === "object" && item.path && newArr.push(item.path);
    item.children && item.children.length && handleRouter(item.children, newArr);
  });
  return newArr;
}
/**
 * @description 生成的路由动态路由权限，只跳转当前有的菜单, 避免Scss平台跳转
 * */
export const AuthRouter = (props: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const [global] = store.useModel('global');
  // * 判断是否有Token
  const token = getStorage("token");
  if (!token) {
    return <Navigate to={'/login'} replace />;
  }
  // * 过滤掉没有auth的角色权限菜单
  const AuthAsideMenuConfig = filterMenus(cloneDeep(asideMenuConfig), getPermissionList(global.auth))
  // * Dynamic Router(动态路由，根据后端返回的菜单数据生成的一维数组)
  const dynamicRouter = handleRouter(AuthAsideMenuConfig, []);
  // * Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)，获取数据的时候会loading，所有配置首页地址也没问题
  const staticRouter = ["/notAuth", "/login", "*"];
  const routerList = dynamicRouter.concat(staticRouter);
  
  // * 如果访问的地址没有在路由表中重定向到403页面
  if (routerList.indexOf(pathname) === -1) {
    return <Navigate to={'/notAuth'} replace />;
  }
  // * 当前账号有权限返回 Router，正常访问页面
  return props.children;
};

export default AuthRouter;
