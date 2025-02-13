import request from '@/lib/request';

const MOCK_BASE_URL = import.meta.env.VITE_MOCK_BASE_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default {
  async uploadFile(data: any) {
    return await request.post(`${BASE_URL}/backend/system/uploadTencentCloud`, data);
  },
  async fileFlowDown() {
    return await request.get(
      `${BASE_URL}/contract/list/export`,
      {
        projectId: '29487a87-27c7-4018-8147-71dfa075ea9f',
      },
      {
        withFullResponse: true,
        responseType: 'blob',
        ContentType: 'application/octet-stream',
      }
    );
  },
};
