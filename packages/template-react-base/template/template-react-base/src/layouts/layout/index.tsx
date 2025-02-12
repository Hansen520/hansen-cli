/*
 * @Date: 2025-02-12 09:40:03
 * @Description: description
 */
import history from '@/lib/history';
import React from 'react';
import { Outlet } from "react-router-dom";
import style from './index.module.scss';

function Layout() {
  return (
    <div className={style.border}>
      Layout
      <button onClick={() => history.push('/home')}>跳转home</button>
      <button onClick={() => history.push('/other')}>跳转other</button>
      <Outlet />
    </div>
  );
}

export default Layout;
