import { useRef, useState, useMemo, useEffect, ReactNode } from "react";
import { debounce } from "lodash-es";
import type { ProColumns, ActionType } from "@ant-design/pro-components";
import appStore from "@/store";
import LocationOperateModal from "./widget";
import { TableData } from "./mock";
import styles from "./index.module.less";
import { Divider, Popconfirm, Input, Image, message, Space, FormInstance } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import {
  LightFilter,
  PageContainer,
  ProFormText,
  ProFormSelect,
  ProTable,
} from "@ant-design/pro-components";
import { verifyPhone } from "@/utils/verify";
// import person from '@/services/person';

const { Search } = Input;
export default () => {
  // const [projectState, projectActions] = appStore.useModel('project');
  const actionRef = useRef<ActionType>();
  // const { projectList } = projectState;
  const [filter, setFilter] = useState<any>();
  const formRef = useRef<FormInstance>();
  const [searchValue, setSearchValue] = useState({
    productId: "",
    name: "",
    post: "",
    phone: "",
  });
  const reload = () => {
    actionRef.current?.reload();
  };

  // useEffect(() => {
  //   projectActions.getProjectList({ pageSize: 100000, pageIndex: 1 });
  // }, []);

  const columns: ProColumns[] = [
    // {
    //   title: '编号',
    //   dataIndex: 'numberNo',
    //   ellipsis: true,
    // },
    {
      title: "照片",
      dataIndex: "photoUrl",
      ellipsis: true,
      render: (text: ReactNode, record) => <Image width={80} src={record.photoUrl} alt={record.photoUrl} />,
    },
    {
      title: "姓名",
      dataIndex: "name",
      ellipsis: true,
      search: false,
    },
    {
      title: "电话",
      dataIndex: "mobile",
      ellipsis: true,
      search: false,
    },
    {
      title: "岗位",
      dataIndex: "post",
      ellipsis: true,
      search: false,
    },
    {
      title: "工种",
      dataIndex: "jobType",
      ellipsis: true,
      search: false,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      search: false,
    },

    {
      title: "操作",
      search: false,
      render: (text, record) => [
        <>
          <LocationOperateModal rowData={record} reload={reload} />
          <Popconfirm
            title="确认删除吗？"
            onConfirm={async () => {
              // const res = await personActions.deletePersonnel(record?.id);
              // res && reload();
            }}
          >
            <a style={{ marginLeft: "10px", color: "red" }}>删除</a>
          </Popconfirm>
        </>,
      ],
    },
  ];

  // const option = useMemo(() => {
  //   if (projectList.rows && projectList.rows.length) {
  //     return projectList.rows.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item.id,
  //       };
  //     });
  //   }
  //   return [];
  // }, [projectList]);

  const option = [
    {
      label: "项目1",
      value: "1",
    },
  ];

  const query = debounce((value, type) => {
    setTimeout(() => {
      setSearchValue((pre) => {
        return {
          productId: type === "projectId" ? value : pre.productId,
          name: type === "name" ? value : pre.name,
          post: type === "post" ? value : pre.post,
          phone: type === "phone" ? value : pre.phone,
        };
      });
    }, 0);
    reload && reload();
  }, 2000);

  return (
    <PageContainer
      ghost
      className={styles.container}
      header={{
        title: "人员管理",
        breadcrumb: {},
      }}
    >
      <Divider />
      <div className={styles.search}>
        <LocationOperateModal reload={reload} />
        <LightFilter
          formRef={formRef}
          bordered
          collapseLabel={<FilterOutlined />}
          onFinish={async (values) => setFilter(values)}
        >
          <Space>
            <ProFormSelect
              fieldProps={{ style: { width: 200 }, options: option, onChange: (e) => query(e, "projectId") }}
              name="projectId"
              label="项目名称:"
            />
            <ProFormText
              name="name"
              label="姓名："
              fieldProps={{
                onChange: (e) => query(e.target.value, "name"),
              }}
              placeholder={"请输入姓名"}
            />
            <ProFormText
              fieldProps={{
                onChange: (e) => query(e.target.value, "post"),
              }}
              name="position"
              label="岗位："
              placeholder={"请输入岗位"}
            />
            <ProFormText
              fieldProps={{
                onChange: (e) => query(e.target.value, "phone"),
              }}
              rules={[verifyPhone()]}
              name="phone"
              label="手机号："
              placeholder={"请输入手机号"}
            />
          </Space>
        </LightFilter>
      </div>
      <ProTable
        columns={columns}
        search={false}
        dataSource={TableData}
        form={{
          syncToUrl: (values, type) => {
            return values;
          },
          syncToInitialValues: false,
          defaultCollapsed: false,
          labelAlign: "left",
        }}
        // headerTitle="矿区列表"
        rowKey="id"
        actionRef={actionRef}
        request={async (params = {}) => {
          // await personActions.getPersonnelList({
          //   ...params,
          //   current: undefined,
          //   pageNo: _.get(params, 'current'),
          //   ...searchValue
          // });
          return {};
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          showQuickJumper: false,
          total: TableData.length,
        }}
        options={false}
        dateFormatter="string"
        // toolBarRender={() => [
        //   <Auth authKey="BACKZY20240000000000000064">
        //     <OperateModal reload={reload} />
        //   </Auth>,
        // ]}
      />
    </PageContainer>
  );
};
