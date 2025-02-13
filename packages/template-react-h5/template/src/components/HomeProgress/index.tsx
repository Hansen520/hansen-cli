/*
 * @Date: 2023-11-30 15:15:04
 * @Description: description
 */
import { Progress } from 'react-vant';
import styles from './index.module.less';

function HomeProgress({ name = '梁横山', percent = 59, data = '89,123,21' }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.name} truncate`}>{name}</div>
      <div className={styles.progress}>
        <Progress
          percentage={percent}
          color={'#3370FF'}
          showPivot={false}
          strokeWidth={5}
        />
      </div>
      <div className={`${styles.data} whitespace-nowrap`}>{data}(千吨)</div>
    </div>
  );
}

export default HomeProgress;
