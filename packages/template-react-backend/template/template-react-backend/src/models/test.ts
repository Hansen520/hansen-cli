
import { createModel } from '@ice/store';
import server from '@/services/test';

export default createModel({
  state: {
    info: {
      userName: 'admin55',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    },
    listData: { }, // 列表
  },
  reducers: {
    update(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },
  effects: (dispatch) => ({
    async DownFlow() {
      const data = await server.fileFlowDown();
      return data;
    },
  }),
});
