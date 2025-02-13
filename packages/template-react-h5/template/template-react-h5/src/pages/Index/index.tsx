/*
 * @Date: 2023-08-09 09:55:08
 * @Description: description
 */
import { FC, memo } from 'react';
import { Outlet } from 'react-router-dom';
import './index.less';
const Index: FC = () => {
  return (
    <div className="tabbar_page">
      <Outlet />
    </div>
  );
};
export default memo(Index);
