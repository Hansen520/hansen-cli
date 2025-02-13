
import { createModel } from '@ice/store';
import server from '@/services/global';

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
    async userLogin(params) {
      const data = await server.apiLogin(params);
      if (data) {
        await this.update({
          info: data,
        });
        return data;
      }
    },
    async goodList(params) {
      const data = await server.apiGoodList(params);
      if (data) {
        await this.update({
          listData: data,
        });
      }
    },
  }),
});
