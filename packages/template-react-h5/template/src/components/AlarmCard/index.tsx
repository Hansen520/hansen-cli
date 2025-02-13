/*
 * @Date: 2023-12-04 15:38:45
 * @Description: description
 */
import { Card, Flex, Image } from 'react-vant';
import { HandleType } from '@/typings/supervision';
import styles from './index.module.less';

interface Props {
  id: string; // 卡片的id值
  title: string;
  isSupervison?: boolean;
  handleType: HandleType
  bodyColumn?: number; // 列的数量
  dataSource: {
    label: string | number;
    value?: string | number;
    urls?: string[]; // 图片路径集合
    isHidden?: boolean; // 是否可见
  }[]; // 带过来的基础数据项目, 可能的值为字符串或者地址图片类型
  handleClick: (e: any) => void;
  config?: any; // 卡片所有的参数项
}

/* 当前的处理方式 */
const CurrentType = (val: string) => {
  if (val === 'handling') {
    return <div className={styles.type0}>待复核</div>;
  } else if (val === 'handled') {
    return <div className={styles.type1}>已复核</div>;
  } else {
    return '';
  }
};
/* 监管的当前处理方式 */
const CurrentCheckType = (val: string) => {
  if (val === 'rechecking' || val === 'handling' || val === 'unreviewed') {
    return <div className={styles.type0}>待复核</div>;
  } else if (val === 'rechecked' || val === 'handled' || val === 'reviewed') {
    return <div className={styles.type1}>已复核</div>;
  } else if (val === 'returned') {
    return <div className={styles.type0}>已退回</div>;
  } else if (val === 'disposing') {
    return <div className={styles.type0}>待处置</div>;
  } else if (val === 'disposed') {
    return <div className={styles.type1}>已处置</div>;
  } else {
    return '';
  }
};
/* 图片的大于3的处理方式 */
const HandleAIWaringImage = (urls: any) => {
  if (urls && urls.length > 0) {
    if (urls.length > 3) {
      return (
        <Flex gutter={8} wrap="wrap">
          {urls.slice(0, 3).map((url: string, index: number) => (
            <Flex.Item span={8} key={url}>
              <div className="h-[80px] rounded overflow-hidden relative">
                <Image src={url} />
                {index === 2 && <div className={styles.imageHidden}>+{urls.length - 3}</div>}
              </div>
            </Flex.Item>
          ))}
        </Flex>
      );
    } else {
      return (
        <Flex gutter={2} wrap="wrap">
          {urls.map((url: string) => (
            <Flex.Item span={8} key={url}>
              <div className="h-[80px] mb-[10px] rounded overflow-hidden">
                <Image src={url} />
              </div>
            </Flex.Item>
          ))}
        </Flex>
      );
    }
  } else {
    return [];
  }
};
const AlarmCard = ({
  id = '',
  title = '8号挖机',
  isSupervison = false,
  handleType = 'handled',
  dataSource = [
    { label: '矿山名称', value: '梁横山' },
    { label: '设备类型', value: '车辆', isHidden: true },
    { label: '设备状态', value: '离线 ' },
  ],
  bodyColumn = 1,
  config = {},
  handleClick,
}: Props) => {
  return (
    <div className={styles.container} onClick={() => handleClick({ id, title, handleType, dataSource, ...config })}>
      <Card round>
        <Card.Header border extra={!isSupervison ? CurrentType(handleType) : CurrentCheckType(handleType)}>
          <i className={styles.line} />
          {title}
        </Card.Header>
        <Card.Body>
          <Flex gutter={16} wrap="wrap">
            {dataSource &&
              dataSource.length > 0 &&
              dataSource.map(
                (item, index) =>
                  !item.isHidden && (
                    <Flex.Item span={24 / bodyColumn} key={index}>
                      <div className="flex">
                        <div className="mr-[8px] w-[60px]" style={{ color: '#656566' }}>
                          {item.label}
                        </div>
                        <div
                          className="text-[14px] flex flex-wrap justify-between relative"
                          style={{ color: '#232324', flex: 1 }}>
                          {item.value ? item.value : item.urls?.length ? HandleAIWaringImage(item.urls) : []}
                        </div>
                      </div>
                    </Flex.Item>
                  ),
              )}
          </Flex>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AlarmCard;
