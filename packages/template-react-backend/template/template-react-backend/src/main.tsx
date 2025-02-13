/*
 * @Date: 2023-10-11 13:53:06
 * @Description: main 总入口
 */
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.less";
import store from "@/store";
import { Provider as ProviderAuth } from "@/utils/useAuth.tsx";
import { ClickToComponent } from "click-to-react-component"; // alt + 鼠标左键找到对应点

const { Provider } = store;
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <>
    {/*<React.StrictMode>*/}
    <ProviderAuth value={{}}>
      <Provider>
        <ClickToComponent />
        <App />
      </Provider>
    </ProviderAuth>
    {/*</React.StrictMode>*/}
  </>
);
