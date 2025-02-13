/*
 * @Date: 2024-03-01 15:31:21
 * @Description: description
 */
import { useState } from 'react';
import { Grid, NavBar, WaterMark, CountDown, Button } from 'react-vant';
import { ShopO, BackTop, ChatO } from '@react-vant/icons';
import appStore from '@/plugins/useStore';

const textProps = {
  content: 'react-h5',
};

function Example() {
  const [props, setProps] = useState<{ [key: string]: any }>(textProps);
  const [fullPage, setFullPage] = useState(true);
  const [{ global: globalState }, { global: dispatchGlobal }] = appStore();
  return (
    <div>
      <NavBar title="案例" />
      <Grid>
        <Grid.Item icon={<ShopO />} text="文字" />
        <Grid.Item icon={<BackTop />} text="文字" />
        <Grid.Item icon={<ChatO />} text="文字" />
        <Grid.Item icon={<ChatO />} text="文字" />
        <Grid.Item icon={<ShopO />} text="文字" />
        <Grid.Item icon={<BackTop />} text="文字" />
        <Grid.Item icon={<ShopO />} text="文字" />
        <Grid.Item icon={<BackTop />} text="文字" />
      </Grid>
      <CountDown time={30 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />
      <WaterMark {...props} fullPage={fullPage} />
      <span>---------</span><Button
        square
        type="primary"
        onClick={() => {
          dispatchGlobal.setCount(globalState.count + 1);
        }}>
        计数
      </Button>
      {globalState.count}
    </div>
  );
}

export default Example;
