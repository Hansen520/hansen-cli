/*
 * @Date: 2023-08-14 09:52:44
 * @Description: description
 */
import { RouterMenus } from '@/types/index';

const asideMenuConfig: RouterMenus[] = [
  {
    id: '1',
    name: "首页",
    path: "/home",
    icon: "HomeOutlined",
    component: "/Home",
    isHidden: false, /* 隐藏此菜单 */
    isParent: false,
  },
  {
    id: '2',
    name: "基本页",
    path: "/basic",
    icon: "TableOutlined",
    isParent: false,
    auth: ['admin', 'person'], 
    children: [
      {
        id: '21',
        name: "列表",
        path: "/basic/list",
        icon: "WindowsOutlined",
        component: "/Basic/List",
        auth: ['admin', 'person'], 
        isParent: true,
      },
      {
        id: '22',
        name: "表单",
        path: "/basic/form",
        icon: "DatabaseOutlined",
        component: "/Basic/Form",
        auth: ['admin', 'person'], 
        isParent: true,
      },
      {
        id: '23',
        name: "详情",
        path: "/basic/detail",
        icon: "ReadOutlined",
        component: "/Basic/Detail",
        auth: ['admin', 'person'], 
        isParent: true,
        isHidden: true 
      },
    ],
  },
  {
    id: '3',
    name: "myHook",
    path: "/myHook",
    icon: 'DatabaseOutlined',
    component: "/myHook",
    isParent: false,
    auth: ['admin'],
    isHidden: false,
  },
  {
    id: '4',
    name: "模板测试与菜单配置",
    path: "/test",
    icon: 'ShareAltOutlined',
    component: "/Test",
    isParent: false,
    auth: ['admin'],
    isHidden: false,
  },
  {
    id: '5',
    name: "用户角色权限",
    path: "/auth",
    icon: 'ShareAltOutlined',
    component: "/Auth",
    isParent: false,
    auth: ['superAdmin'],
    isHidden: false,
  }
];

export { asideMenuConfig };
