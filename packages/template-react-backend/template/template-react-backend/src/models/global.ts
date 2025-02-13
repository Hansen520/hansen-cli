/*
 * @Date: 2023-10-11 13:53:06
 * @Description: description
 */
import { createModel } from '@ice/store';
import server from '@/services/global';

export default createModel({
  state: {
    info: {
      userName: 'admin55',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    },
    listData: {}, // 列表
    /* 登陆后设置角色权限 */
    auth: { admin: true, person: true },
  },
  reducers: {
    update(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },
  effects: (dispatch) => ({
    // async uploadFile(data) {
    //   const res = await server.uploadFile(data);
    //   return res;
    // },
    // async userInfo(id) {
    //   const data = await server.getUserInfo(id);
    //   if (data) {
    //     await dispatch.user.update({
    //       user: data,
    //     });
    //     return data;
    //   }
    // },
    async userLogin(params) {
      // const data = await server.apiLogin(params);
      // const data = await server.apiLogin(params);
      const data = {userName: '111'}
      if (data) {
        await this.update({
          info: data,
        });
        return data;
      }
    },
    // async sendVerCode(phone) {
    //   const data = await server.getUserInfo(phone);
    //   return data;
    // },
  }),
});
