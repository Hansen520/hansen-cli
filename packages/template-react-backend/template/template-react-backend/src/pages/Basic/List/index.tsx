import { useRef, MouseEventHandler } from 'react';
import { PlusOutlined} from '@ant-design/icons';
import { Button, Switch } from 'antd';
import { get } from 'lodash-es';
import { ProTable, ActionType } from '@ant-design/pro-components';
import { useNavigate} from 'react-router-dom'
import styles from './index.module.less';
import store from '@/store';

const Index =  () => {
  const [global, globalDispatcher] = store.useModel('global');
  const [basic, basicDispatch] = store.useModel('basic');
  const actionRef = useRef<ActionType>();

  const navigate = useNavigate()


  const add: MouseEventHandler<HTMLSpanElement> = (value) => {
    // history.push('/basic/form');
  };

  const edit: MouseEventHandler<HTMLSpanElement> = (values) => {
    // history.push('/basic/123654');
  };

  const toDetail: MouseEventHandler<HTMLSpanElement> = (record) => {
    navigate(`/basic/detail`);
  }

  // const del = async (values) => {
  //   const res = await goodsDispatchers.delGoods({
  //     goodsId: get(values, 'goodsId'),
  //   });
  //   if (res) {
  //     message.success('删除成功!');
  //     actionRef.current?.reload();
  //   }
  // };

  const columns: any = [

    {
      title: '商品名称',
      valueType: 'text',
      dataIndex: 'name',
    },
    {
      title: '价格',
      search: false,
      dataIndex: 'price',
    },
    {
      title: '库存',
      search: false,
      dataIndex: 'inventoryAmount',
    },
    {
      title: '销量',
      search: false,
      dataIndex: 'payedCount',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (text, record) => [
        <a  key={record.id} onClick={() => edit(record)}>
          编辑
        </a>,
        <a  key={'22'+ record.id} onClick={() => toDetail(record)}>
          查看详情
        </a>,
      ],
    },
  ];
  return (
    <ProTable
      columns={columns}
      className={styles.tableHeight}
      dataSource={ get(basic, 'listData.rows')}
      actionRef={actionRef}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      form={{
        syncToUrl: (values, type) => {
          return values;
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      request={async (params = {}) => {
        await basicDispatch.goodList({
          ...params,
          current: undefined,
          pageIndex: get(params, 'current'),
        });
        return {};
      }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        total: get(global, 'listData.total', 0),
      }}
      tableRender={(props,dom) => {
        return <div>{dom}</div>
      }}
      size="middle"
      options={false}
      dateFormatter="string"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} onClick={add} type="primary">
          <span>新增</span>
        </Button>,
      ]}
    />
  );
};

export default Index
