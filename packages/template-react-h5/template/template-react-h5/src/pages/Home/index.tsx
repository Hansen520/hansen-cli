import { memo } from 'react';
import { NavBar } from 'react-vant';
import styles from './index.module.less';

const Home = () => {
  return (
    <section className={styles.container}>
      <NavBar title="首页" />
      <div className={styles.wrapper}>
        <div>react18 h5模板</div>
        <h5>支持</h5>
        <div className={styles.rotate3dElement}></div>
        <ul>
          <li>typescript</li>
          <li>axios</li>
          <li>less</li>
          <li>tailwind</li>
          <li>lodash</li>
          <li>react-vant</li>
          <li>dayjs</li>
          <li>react-player</li>
          <li>@rematch/core(类似于redux)</li>
        </ul>
      </div>
    </section>
  );
};
export default memo(Home);
