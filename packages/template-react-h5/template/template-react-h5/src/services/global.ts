import { qsStringify } from '@/utils';
import _ from 'lodash-es';

const BASE_URL = import.meta.env.VITE_API_URL;
export default {
  // 文件上传
  async uploadFile(fileParams: any) {
    const params = _.get(fileParams, 'params');
    const data = _.get(fileParams, 'formData');

   
  },
  async getUserInfo(id: string) {
  },
  // 退出登录
  async userLogout() {
  },
  // 登录
  async userLogin(data: any) {
  },
  // 获取电子围栏
  async electronicFence(mineId: string) {}
};
