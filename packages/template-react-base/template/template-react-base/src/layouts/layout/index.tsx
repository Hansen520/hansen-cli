import history from '@/lib/history';
import React from 'react';

function Layout() {
  return (
    <div>
      Layout
      <div onClick={() => history.push('/login')}>跳转login</div>
    </div>
  );
}

export default Layout;
