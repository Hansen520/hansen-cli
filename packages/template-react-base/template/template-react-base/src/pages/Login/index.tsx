/*
 * @Date: 2025-02-11 16:04:47
 * @Description: description
 */
import history from '@/lib/history';
import React from 'react';

function Login() {
  return (
    <div onClick={() => history.push('/home')}>
      Login
      <button>跳转</button>
    </div>
  );
}

export default Login;
