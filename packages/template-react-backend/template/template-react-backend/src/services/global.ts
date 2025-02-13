import request from '@/request'
import qs from 'qs';

const MOCK_BASE_URL = import.meta.env.VITE_MOCK_BASE_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default {
  async uploadFile(data: any) {
    return await request.post(`${BASE_URL}/backend/system/uploadTencentCloud`, data);
  },
  async getUserInfo(id: string) {
    return await request.get(`${BASE_URL}/backend/enterprise/${id}`);
  },

  async apiLogin(data: any) {
    return await request.post(`${BASE_URL}/user/login`, data);
  },
  async apiGoodList(data: string) {
    return await request.get(`${MOCK_BASE_URL}/api/basic/list?${qs.stringify(data)}`);
  },

};
