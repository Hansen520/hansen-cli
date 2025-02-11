import RouterConfig from "@/routes";
import { unstable_HistoryRouter as Router, HistoryRouterProps  } from 'react-router-dom';
import history from '@/lib/history';
import { createBrowserHistory, History } from 'history';

const App = () => {
  return (
      <Router history={history as any}>
        <RouterConfig />
      </Router>
  );
}
export default App;