import appStore from "@/store";
import { hasEmpty, max } from "@/utils/verify";
import { PlusOutlined } from "@ant-design/icons";
import type { ProFormInstance } from "@ant-design/pro-components";
import { ProForm, DrawerForm, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Button, Col, message, Row, Upload } from "antd";
import { useWatch } from "antd/lib/form/Form";
import { get } from "lodash-es";
import { useEffect, useRef, useState } from "react";
import { verifyPhone } from "@/utils/verify";
import styles from "../index.module.less";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: "8px" }}>上传</div>
  </div>
);
export default (props: any) => {
  const { rowData, reload } = props;
  // const [projectState, projectActions] = appStore.useModel('project');
  // const [personState, personActions] = appStore.useModel('person');
  const [imageUrl, setImageUrl] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [global, globalDispatchers] = appStore.useModel("global");
  const triggerClick = async () => {
    setVisible(true);
  };

  const modalFormRef = useRef<ProFormInstance>();

  const UploadProps = {
    listType: "picture-card",
    accept: "image/*",
    maxCount: props.maxCount || 1,
    showUploadList: { showPreviewIcon: false },
    beforeUpload: (file: File) => {
      const isLit = file.size / 1024 / 1024 < 100;
      if (!isLit) {
        message.warning("文件最大支持100M上传，请重新上传~");
        return false;
      }
    },
    onRemove: () => {
      setImageUrl("");
    },
    customRequest: async (option) => {
      try {
        const file = option.file as File;
        const res = await 0;
        setImageUrl(res.url);
        if (res) {
          option.onSuccess(res);
        } else {
          option.onError("上传失败");
        }
      } catch (e) {
        console.log("上传失败", e);

        option.onError();
      }
    },
    ...props.uploadParams,
  };

  const handleChange = (e) => {
    console.log(e, 144);
  };
  return (
    <>
      <DrawerForm
        title={rowData?.id ? "编辑" : "添加"}
        width={920}
        open={visible}
        layout="vertical"
        formRef={modalFormRef}
        autoFocusFirstInput
        drawerProps={{
          destroyOnClose: true,
          maskClosable: false,
          className: styles.modelContainer,
          onClose: () => setVisible(false),
        }}
        onOpenChange={async (bool) => {
          console.log(rowData, "rowData");
          if (bool && rowData?.id) {
            // const res = await personActions.getPersonnelDetail(rowData?.id);
            // if (res) {
            //   modalFormRef.current?.setFieldsValue({
            //     ...res,
            //     projectId: res.projectId,
            //     photoUrl: [{ response: { url: res.photoUrl }, url: res.photoUrl }]
            //   });
            // }
          }
        }}
        onFinish={async (values) => {
          const param = { ...values, projectId: values.projectId, photoUrl: values?.photoUrl[0]?.response?.url || "" };
          console.log(rowData, values, 175);
          // if (rowData?.id) {
          //   await personActions.editPersonnel({id: rowData?.id, ...param});
          //   message.success('编辑成功');
          // } else {
          //   await personActions.addPersonnel(param);
          //   message.success('添加成功');
          // }
          setVisible(false);
          setImageUrl("");
          reload();
          return Promise.resolve();
        }}
      >
        <div style={{ color: "#000000", fontSize: 14, fontWeight: 700, marginBottom: "10px" }}> 基础信息</div>
        <Row gutter={24}>
          <Col span={12}>
            <ProFormSelect
              name="projectId"
              // disabled={rowData?.id}
              label="项目名称"
              placeholder="请输入项目名称"
              request={async () => {
                const res = await projectServer.getProjectList({ pageIndex: 1, pageSize: 1000 });
                return Promise.resolve(get(res, "rows", []).map((item) => ({ label: item.name, value: item.id })));
              }}
              rules={[{ required: true, message: "请输入项目名称" }, hasEmpty(), max(128, "项目名称不应超过128字符")]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              rules={[{ required: true }]}
              name="name"
              // disabled={rowData?.id}
              label="姓名"
              placeholder="请输入姓名"
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <ProFormText
              rules={[{ required: true }, verifyPhone()]}
              name="mobile"
              // disabled={rowData?.id}
              label="手机号"
              placeholder="请输入手机号"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              rules={[{ required: true }]}
              name="post"
              // disabled={rowData?.id}
              label="岗位"
              placeholder="请输入岗位"
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <ProFormText name="jobType" label="工种" placeholder="请输入工种" />
          </Col>
          <Col span={12}>
            <ProForm.Item
              label="照片"
              required
              name={"photoUrl"}
              valuePropName="fileList"
              rules={[{ required: true, message: "请上传照片" }]}
              getValueFromEvent={normFile}
            >
              <Upload onChange={handleChange} maxCount={1} {...UploadProps} listType="picture-card">
                {imageUrl ? null : (
                  <div>
                    <PlusOutlined />
                  </div>
                )}
              </Upload>
            </ProForm.Item>
          </Col>
        </Row>

        {/* <Divider />

        <Button
          type="primary"
          onClick={() => {
            setLocationList([
              ...locationsList,
              {
                id: nanoid(),
              },
            ]);
          }}
        >
          添加
        </Button> */}
        <br />
      </DrawerForm>
      {rowData?.id ? (
        <a onClick={triggerClick}>编辑</a>
      ) : (
        <Button type="primary" onClick={triggerClick}>
          <PlusOutlined /> 添加
        </Button>
      )}
    </>
  );
};
