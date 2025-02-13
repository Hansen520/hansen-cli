/*
 * @Date: 2023-12-01 15:28:09
 * @Description: description
 */
import { useState } from 'react';
import { Picker } from 'antd-mobile';
import { hooks } from 'react-vant';
import { CloseOutline, CheckOutline, DownOutline } from 'antd-mobile-icons';

function SelectPicker({
  options = [],
  handleConfirm
}: {
  options: { label: string; value: any }[][];
  handleConfirm: (e: any) => void
}) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<(any)[]>(['{"quarter":"4","year":2023}']);

  hooks.useMount(() => {
    if (options) {
      setValue([options[0][0].value])
    }
  });
  return (
    <>
      <div
        onClick={() => {
          setVisible(true);
        }}>
        <>
          <div className={'text-[12px]'}>
            <span className={'mr-[4px]'} style={{ color: '#656566' }}>
              {JSON.parse(value[0]).year}年第{JSON.parse(value[0]).quarter}季度
            </span>
            <DownOutline />
          </div>
        </>
      </div>
      <Picker
        columns={options}
        visible={visible}
        confirmText={'确定'}
        cancelText={<CloseOutline style={{ color: '#666' }} />}
        title="选择时间"
        mouseWheel={true}
        onClose={() => {
          setVisible(false);
        }}
        onSelect={(e) => {
          setValue(e);
        }}
        value={value}
        onConfirm={(v: any) => {
          setValue(v);
          handleConfirm(v);
        }}
      />
    </>
  );
}

export default SelectPicker;
