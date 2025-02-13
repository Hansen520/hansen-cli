/*
 * @Date: 2023-11-29 09:15:03
 * @Description: description
 */
import { createModel } from '@rematch/core';
import { RootModel } from '@/store';
import server from '@/services/global';

export const global = createModel<RootModel>()({
  state: {
    miningPermissionInfo: {} as any as {
      mineTotal: number;
      mtZeroMonthTotal: number;
      ltThreeMonthTotal: number;
    },
    count: 0
  },
  reducers: {
    update(state, payload) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    // 文件上传
    async uploadFile(data) {
      const res = await server.uploadFile(data);
      return res;
    },
    // 登录
    async userLogin(payload: any, state) {
      try {
        return await server.userLogin(payload);
      } catch (err) {
        console.error(err);
      }
    },
    // 退出登录
    async userOutLogin() {
      try {
        return await server.userLogout();
      } catch (err) {
        console.error(err);
      }
    },
    // 计数
    async setCount(val) {
      this.update({ count: val });
    }
  }),
});
