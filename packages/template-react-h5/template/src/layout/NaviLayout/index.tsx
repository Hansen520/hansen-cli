/*
 * @Date: 2023-11-29 15:30:05
 * @FilePath: /zhousan-mine-h5/src/layout/NaviLayout/index.tsx
 */
import { memo } from 'react';
import { NavBar } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import useSwitch from '@/routers/useSwitch';
import styles from './index.module.less';
const NaviLayout = ({
  children,
  title,
  isClean,
}: {
  children?: any;
  title: string;
  isClean?: boolean;
}) => {
  const nav = useNavigate();
  const sw = useSwitch();
  console.log(sw, 'sw');
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar
        className={isClean ? styles.naviAB : 'bg-white'}
        onBack={() => {
          nav(-1);
        }}>
        {title}
      </NavBar>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
};

export default memo(NaviLayout);
