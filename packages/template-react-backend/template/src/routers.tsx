/*
 * @Date: 2023-08-14 09:52:44
 * @Description: description
 */
import { lazy, Suspense } from "react";
import { Skeleton } from "antd";
import Layout from "@/layouts/BasicLayout";
import { AuthRouter } from "@/utils/authRouter";
import { HOME_URL } from "@/contain";
import { Navigate, useRoutes } from "react-router-dom";
import { asideMenuConfig } from "@/layouts/BasicLayout/menuConfig";

const Login = lazy(() => import(/* chunkName: Login */ "@/pages/Login"));
const NotFound = lazy(() => import(/* chunkName: NotFound */ "@/components/NotFound"));
const NotAuth = lazy(() => import(/* chunkName: NotAuth */ "@/components/NotAuth"));

const modules: any = import.meta.glob("./pages/**/*.tsx");
const formatRoute = function (routerMenu: any, menu: any = []) {
  for (let i = 0; i < routerMenu.length; i++) {
    const routerItem = routerMenu[i];
    if (routerItem.component) {
      const RouteComponent = lazy(/* @vite-ignore  */ modules[`./pages${routerItem.component}/index.tsx`]);
      const temp = {
        path: routerItem.path,
        element: (
          <AuthRouter key={i}>
            <Suspense fallback={<Skeleton />}>
              <RouteComponent />
            </Suspense>
          </AuthRouter>
        ),
      };
      menu.push(temp);
    }

    if (routerItem.children && routerItem.children.length > 0) {
      //递归生成子菜单的路由
      formatRoute(routerItem.children, menu);
    }
  }
  return menu;
};


const routers = [
  {
    path: "/login",
    element: (
      <Suspense fallback={<Skeleton />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: <Navigate to={HOME_URL} />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      ...formatRoute(asideMenuConfig),
      /* 无权限页面403 */
      {
        path: "/notAuth",
        element: <NotAuth />,
      },
      /* /testAuth 为模拟scss平台另一个租户的路由 */
      {
        path: "/testAuth",
        element: <NotAuth />,
      },
      /* 其他未匹配的路由定位到这个页面 */
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const RouterConfig = () => useRoutes(routers);

export default RouterConfig;
