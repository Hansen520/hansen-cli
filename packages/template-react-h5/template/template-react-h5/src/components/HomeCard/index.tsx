/*
 * @Date: 2023-11-30 14:23:06
 * @Description: home card
 */
import { Card } from 'react-vant';

interface Props {
  title: string;
  extra?: any;
  children?: any
}
export default ({ title = "标题", extra = null, children }: Props) => {
  return (
    <Card round>
      <Card.Header extra={extra}>{title}</Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
}
