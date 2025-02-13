/*
 * @Date: 2024-02-21 15:42:23
 * @Description: description
 */
import { Card, Space } from "antd";
import { useState } from "react";
import Memo from "./Memo";
import Ref from "./Ref";
import State from "./State";
import styles from "./index.module.less";
import useInterval from "./useInterval";

function MyHook() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(count + 1);
  };

  useInterval(updateCount, 1000);
  return (
    <div className={styles.container}>
      <Space direction="vertical">
        <Card title="测试forwardRef">
          <Ref />
        </Card>
        <Card title="测试immer">
          <State />
        </Card>
        <Card title="测试memo + useMemo + useCallback">
          <Memo />
        </Card>
        <Card title="测试定时器">
          <div>{count}</div>
        </Card>
      </Space>
    </div>
  );
}

export default MyHook;
