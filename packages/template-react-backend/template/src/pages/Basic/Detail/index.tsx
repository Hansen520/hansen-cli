import { Statistic } from 'antd';
import { PageContainer, ProDescriptions } from '@ant-design/pro-components';

import styles from './index.module.less';
import appStore from '@/store';
import { get } from 'lodash-es';


enum OrderStatus{
  payed= '待发货',
  pending ='待付款',
  signing ='签署中',
  posted_out ='待收货',
  closed ='交易成功',
  received ='已完成',
  canceled ='已关闭',
}


const Index = () => {
  const [globalState, globalDispatchers] = appStore.useModel('global');
  const detail = get(globalState, 'info') || {};

  return (
    <PageContainer
      ghost
      className={styles.container}
      header={{
        title: '订单详情',
        breadcrumb: {},
      }}
    >

      <ProDescriptions column={2} bordered>
        <ProDescriptions.Item label="运费"><Statistic prefix={'¥'} value={get(detail, 'postFee')} precision={2} /></ProDescriptions.Item>
        <ProDescriptions.Item label="实付款"><Statistic prefix={'¥'} value={get(detail, 'price')} precision={2} /></ProDescriptions.Item>
      </ProDescriptions>
      <ProDescriptions column={2} title="支付信息" style={{ marginTop: '20px' }} bordered>
        <ProDescriptions.Item label="订单状态">{OrderStatus[get(detail, 'status')]}</ProDescriptions.Item>
        <ProDescriptions.Item label="订单编号">{get(detail, 'orderCode')}</ProDescriptions.Item>
        <ProDescriptions.Item label="下单时间">{get(detail, 'createTime')}</ProDescriptions.Item>
        <ProDescriptions.Item label="支付方式">{get(detail, 'payType')}</ProDescriptions.Item>
        <ProDescriptions.Item label="支付时间">{get(detail, 'payedTime')}</ProDescriptions.Item>
      </ProDescriptions>
      <ProDescriptions column={2} title="配送信息" style={{ marginTop: '20px' }} bordered>
        <ProDescriptions.Item label="昵称">{get(detail, 'nickName', '')}</ProDescriptions.Item>
        <ProDescriptions.Item label="姓名">{get(detail, 'realName', '')}</ProDescriptions.Item>
        <ProDescriptions.Item label="联系方式">{get(detail, 'buyerMobile', '')}</ProDescriptions.Item>
        <ProDescriptions.Item label="收货地址">{get(detail, 'address', '')}</ProDescriptions.Item>
        <ProDescriptions.Item label="快递公司">{get(detail, 'expressName', '')}</ProDescriptions.Item>
        <ProDescriptions.Item label="快递单号">{get(detail, 'sendCode', '')}</ProDescriptions.Item>
      </ProDescriptions>
    </PageContainer>
  );
};

export default Index
