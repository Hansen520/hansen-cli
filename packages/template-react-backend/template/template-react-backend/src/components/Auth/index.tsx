import useAuth from '@/utils/useAuth';

/**
 * 组件操作权限
 * @param children 子元素
 * @param authKey
 * @constructor
 */
const Auth = ({ children, authKey }: { children: any, authKey: string }) => {
  const [auth] = useAuth();
  /* 判断是否有权限 */
  const hasAuth = auth[authKey];
  /* 有权限时直接渲染内容 */
  if (hasAuth) {
    return children;
  } else {
    /* 无权限时显示指定 UI, ''可以为不显示 */
    return '';
  }
}

export default Auth;
