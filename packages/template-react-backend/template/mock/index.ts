import {MockMethod} from "vite-plugin-mock"

const index: Array<MockMethod> = [
  {
    url: '/mock/api/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        success: true,
        data: {
          token: 'JhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb25nbHVfdG9rZW',
          userName:'工路信息'
        },
      }
    }
  },
  {
    // 接口路径
    url: '/mock/api/basic/list',
    // 接口方法
    method: 'get',
    // 模拟时长
    timeout:500,
    // 返回数据
    response: () => {
      return {
        code: 200,
        message: 'success',
        success: true,
        data: {
          hasNextPage:false,
          total:5,
          rows:[
            {
              id:'1',
              name:'链条',
              price:2345.55,
              inventoryAmount:123,
              payedCount:16,
            },
            {
              id:'2',
              name:'链条',
              price:2345.55,
              inventoryAmount:123,
              payedCount:16,
            },
            {
              id:'3',
              name:'链条',
              price:2345.55,
              inventoryAmount:123,
              payedCount:16,
            },
            {
              id:'4',
              name:'链条',
              price:2345.55,
              inventoryAmount:123,
              payedCount:16,
            },
            {
              id:'5',
              name:'链条',
              price:2345.55,
              inventoryAmount:123,
              payedCount:16,
            },
          ]
        }
      }
    }
  }
]

export default index
