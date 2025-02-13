/*
 * @Date: 2023-11-29 10:45:00
 * @Description: 返回
 */
import { memo } from 'react';
import styles from './index.module.less';

const HeaderView = () => {
  return (
    <div className={styles.tabBar}>
      <span>返回</span>
    </div>
  );
};

export default memo(HeaderView);
 