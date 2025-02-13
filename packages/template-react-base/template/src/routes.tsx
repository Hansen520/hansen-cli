/*
 * @Date: 2025-02-11 15:56:01
 * @Description: description
 */
import path from "path";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router";

const NotFound = lazy(() => import("@/components/NotFound"));
const Login = lazy(() => import("@/pages/Login"));
const ScreenLayout = lazy(() => import("@/layouts/layout"));
const Home = lazy(() => import("@/pages/Home"));
const Other = lazy(() => import("@/pages/Other"));


const routers = [
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>loading</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: <ScreenLayout />,
    children: [
      {
        path: '/home',
        exact: true,
        element: <Home />
      },
      {
        path: '/other',
        exact: true,
        element: <Other />
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const RouterConfig = () => useRoutes(routers);

export default RouterConfig;
