/*
 * @Date: 2025-02-11 15:56:01
 * @Description: description
 */
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router";

const NotFound = lazy(() => import("@/components/NotFound"));
const Login = lazy(() => import("@/pages/Login"));
const ScreenLayout = lazy(() => import("@/layouts/layout"));

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
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const RouterConfig = () => useRoutes(routers);

export default RouterConfig;
