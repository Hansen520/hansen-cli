/*
 * @Date: 2025-02-11 16:04:47
 * @Description: description
 */
import history from '@/lib/history';
import styles from './index.module.scss';

function Login() {
  return (
    <div className={styles.border} onClick={() => history.push('/home')}>
      Login
      <button>跳转</button>
    </div>
  );
}

export default Login;
