/*
 * @Date: 2023-08-09 09:55:08
 * @Description: description
 */

import { GongLu } from '@/typings';
import { lazy } from 'react';
const List = lazy(
  () => import(/* chunkName: List */ '@/pages/List'),
);
const Example = lazy(
  () => import(/* chunkName: Example */ '@/pages/Example'),
);
const Home = lazy(() => import(/* chunkName: Home */ '@/pages/Home'));
const Index = lazy(() => import(/* chunkName: Index */ '@/pages/Index'));
const User = lazy(() => import(/* chunkName: User */ '@/pages/User'));


const NoFound = lazy(
  () => import(/* chunkName: NoFound */ '../components/NoFound'),
);
const Test = lazy(() => import(/* chunkName: Test */ '@/pages/Test'));
export const TabBarList: GongLu.RouteTabBar[] = [
  {
    path: '/',
    component: Home,
    icon: 'white-home',
    sceneMode: 'scroll',
    title: '首页',
  },
  {
    path: '/list',
    component: List,
    icon: 'white-mine',
    sceneMode: 'scroll',
    title: '列表',
  },
  {
    path: '/example',
    component: Example,
    icon: 'white-supervision',
    sceneMode: 'scroll',
    title: '示例',
  },
  {
    path: '/user',
    component: User,
    icon: 'white-user',
    sceneMode: 'scroll',
    title: '我的',
  },
];

const routes: GongLu.RouteConfig[] = [
  {
    path: '/',
    component: Index,
    tabBars: TabBarList,
  },

  {
    path: '/test',
    component: Test,
  },
  {
    path: '*',
    component: NoFound,
  },
];

export default [...routes];
