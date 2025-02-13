/*
 * @Date: 2023-08-09 09:55:08
 * @Description: description
 */
import '@/assets/css/common.less';
import 'lib-flexible';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from '@/App';

import { setWindowHeight } from './utils';

setWindowHeight();
window.onresize = () => {
  setWindowHeight();
};
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
