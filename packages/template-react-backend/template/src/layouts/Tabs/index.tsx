/*
 * @Date: 2023-10-11 13:53:06
 * @Description: description
 */
import { useEffect, useState } from "react";
import { Tabs } from "antd";
import styles from "./index.module.less";
import { asideMenuConfig } from "@/layouts/BasicLayout/menuConfig";
import { RouterMenus } from '@/types/index';
import { searchRoute } from "@/utils";
import { cloneDeep } from 'lodash-es';
import { filterMenus, getPermissionList } from '@/utils/authConfig';
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_URL } from '@/contain';
import store from '@/store';

const LayoutTabs = (props: any) => {
  const { pathname } = useLocation();
  const [tabsList, setTabsList] = useState<any>([{ label: "首页", key: HOME_URL, closable: false }]);
  const navigate = useNavigate();
  const [activeValue, setActiveValue] = useState<string>(pathname);
  const [globalState] = store.useModel('global');

  useEffect(() => {
    addTabs();
  }, [pathname]);

  // click tabs
  const clickTabs = (path: string) => {
    navigate(path);
  };

  const addTabs = () => {
    const AuthAsideMenuConfig = filterMenus(cloneDeep(asideMenuConfig), getPermissionList(globalState.auth))
    const route = searchRoute(pathname, AuthAsideMenuConfig) as RouterMenus;
    let newTabsList = cloneDeep(tabsList); // 深克隆
    if (tabsList.every((item: any) => item.key !== route.path)) {
      newTabsList.push({ label: route.name, key: route.path });
    }
    setTabsList(newTabsList);
    setActiveValue(pathname);
  };

  const onEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: "add" | "remove") => {
    if (action === 'remove') {
      if (targetKey === '/') return;
      /* 删除的是当前的标签 */
      if (pathname === targetKey) {
        tabsList.forEach((item: any, index: number) => {
          if (item.key !== pathname) return;
          const nextTab = tabsList[index + 1] || tabsList[index - 1];
          if (!nextTab) return;
          navigate(nextTab.key);
        });
      }
      setTabsList(tabsList.filter((item: any) => item.key !== targetKey));
      setActiveValue(pathname);
    }
  };

  return (
    <div className={styles.tabs}>
      <Tabs
        animated
        destroyInactiveTabPane
        hideAdd
        type="editable-card"
        onEdit={onEdit}
        onChange={clickTabs}
        items={tabsList}
        activeKey={activeValue}
      />
    </div>
  );
};

export default LayoutTabs;
