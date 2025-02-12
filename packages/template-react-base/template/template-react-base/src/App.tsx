import RouterConfig from "@/routes";
import { unstable_HistoryRouter as Router, HistoryRouterProps } from "react-router-dom";
import history from "@/lib/history";
import { createBrowserHistory, History } from "history";
import { Provider } from "react-redux";
import store from "@/store/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history as any}>
        <RouterConfig />
      </Router>
    </Provider>
  );
};
export default App;
