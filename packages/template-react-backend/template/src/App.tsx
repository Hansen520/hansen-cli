/*
 * @Date: 2023-10-11 13:53:06
 * @Description: App.tsx
 */
import { unstable_HistoryRouter as Router } from "react-router-dom";
import history from '@/utils/history';
import RouterConfig from "./routers";


const App = () => (
  <Router history={history as any}>
    <RouterConfig />
  </Router>
);
export default App;
