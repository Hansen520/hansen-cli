import {
  ProForm,
  ProFormDigit,
  ProFormTextArea,
  ProFormText,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormDateRangePicker,
  ProFormDatePicker,
  ProFormDateTimeRangePicker,
  ProFormTreeSelect,
  ProFormCheckbox,
  ProFormRadio,
  ProFormSlider,
  ProFormSwitch,
  ProFormUploadButton,
  ProFormUploadDragger,
  ProFormMoney,
  ProFormSegmented
} from '@ant-design/pro-components';
import { required } from '@/utils/verify';
import styles from './index.module.less';

const Form = () => {
  return (
    <section className={styles.container}>
      <ProForm>
        <ProFormText
          name="name"
          label="文本"
          placeholder="请输入"
          fieldProps={{
            maxLength: 128,
          }}
          rules={[required('请输入文本')]}
        />
        <ProFormDigit
          name="number"
          label="4位有效数字"
          fieldProps={{
            maxLength: 4,
            precision: 0,
            max: 1000,
            min: 0,
          }}
          rules={[required('请输入数字')]}
        />
        <ProFormText.Password name="password" label="密码" />
        <ProFormTextArea name="textArea" label="多行文本域" />
        <ProFormDatePicker name="data" label="日期" />
        <ProFormDateTimePicker name="dataPicker" label="多行日期" />
        <ProFormDateRangePicker name="dataRangePicker" label="多行日期" />
        <ProFormDateTimeRangePicker name="dataTimeRangePicker" label="多行时间日期" />
        <ProFormSelect name="select" label="选择" />
        <ProFormTreeSelect name="treeSelect" label="树形选择" />
        <ProFormCheckbox name="checkBox" label="多选" />
        <ProFormRadio.Group name="radioGroup" label="单选组">
        <ProFormRadio />
        </ProFormRadio.Group>
        <ProFormSlider name="slider" label="slider" />
        <ProFormSwitch name="switch" label="开关" />
        <ProFormUploadButton name="button" label="上传按钮" />
        <ProFormUploadDragger name="uploadDragger" label="拖拽上传" />
        <ProFormMoney name="formMoney" label="普通金额" />
        <ProFormSegmented name="segmented" label="分段" />
      </ProForm>
    </section>
  );
};

export default Form;
