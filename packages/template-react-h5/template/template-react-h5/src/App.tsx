/*
 * @Date: 2023-11-29 11:27:34
 * @FilePath: /zhousan-mine-h5/src/App.tsx
 */
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import TabBarView from '@/layout/TabBarView';
import RouteRender from '@/routers/RouteRender';
import history from '@/utils/history';
import { Provider } from 'react-redux';
import VConsole from 'vconsole';
import store from './store';
import { ConfigProvider } from 'react-vant';
import { zhCN } from 'react-vant/lib/locale/index';

const { VITE_ENV } = import.meta.env;
if (VITE_ENV !== 'production') {
  const vConsole = new VConsole();
}

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <Router history={history as any}>
            <RouteRender />
            <TabBarView />
          </Router>
        </ConfigProvider>
      </Provider>
    </>
  );
};
export default App;
