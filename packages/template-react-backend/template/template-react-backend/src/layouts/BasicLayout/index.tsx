import { ProLayout, DefaultFooter } from "@ant-design/pro-components";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import logo from "@/assets/logo.png";
import { useMount } from 'ahooks';
import { removeStorage, getStorage } from '@/utils/index';
import { loopMenuItem, getPermissionList, filterMenus, filterHidden } from "@/utils/authConfig";
import { cloneDeep } from "lodash-es";
import LayoutTabs from "@/layouts/Tabs";
import { asideMenuConfig } from "./menuConfig";
import store from '@/store';
import useAuth from '@/utils/useAuth';
import styles from "./index.module.less";

export default function BasicLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [global] = store.useModel('global');
  const [auth, setAuth] = useAuth();

  const loginOut = async () => {
    removeStorage("token");
    navigate("/login");
  };

  useMount(() => {
    /* 刷新的时候 */
    const buttonAuth = getStorage('buttonAuth') ? JSON.parse(getStorage('buttonAuth')) : auth;
    setAuth(buttonAuth);
  });
  const menuClick = (item: any) => {
    if (item.key === "logout") {
      loginOut();
    }
  };

  return (
    <ProLayout
      title="模板"
      className={styles.container}
      style={{ minHeight: "100vh" }}
      layout="mix"
      logo={<>LOGO</>}
      fixSiderbar
      fixedHeader
      location={{
        pathname: location.pathname,
      }}
      token={{
        header: {
          colorBgHeader: "#001529",
          colorHeaderTitle: "#fff",
          colorTextMenu: "#fff",
          colorTextRightActionsItem: "#fff",
        },
        sider: {
          colorMenuBackground: "#fff",
          colorBgMenuItemSelected: "#e6f7ff",
          colorTextMenuActive: "##1677ff",
          colorTextMenuItemHover: "#1677ff",
          colorTextMenuSelected: "#1677ff",
          colorTextCollapsedButtonHover: "#1677ff",
        },
      }}
      menuDataRender={() =>
        loopMenuItem(filterHidden(filterMenus(cloneDeep(asideMenuConfig), getPermissionList(global.auth))))
      }
      menuItemRender={(item, defaultDom: any) => {
        if (!item.path) {
          return defaultDom;
        }
        /* 对二级菜单的重写 */
        if (item.isParent) {
          return (
            <Link to={item.path}>
              <Space>
                <span>{item.icon}</span>
                <span>{defaultDom}</span>
              </Space>
            </Link>
          );
        }
        return <Link to={item.path}>{defaultDom}</Link>;
      }}
      avatarProps={{
        src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
        size: "small",
        title: "张三",
        render: (props: any, dom: any) => {
          return (
            <Dropdown
              menu={{
                onClick: menuClick,
                items: [
                  {
                    key: "settings",
                    icon: <SettingOutlined />,
                    label: "个人设置",
                  },
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "退出登录",
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
      menuFooterRender={false}
      footerRender={() => <DefaultFooter copyright="版权所持有" />}
    >
      <LayoutTabs />
      <div className={styles.content}>
        <Outlet />
      </div>
    </ProLayout>
  );
}
