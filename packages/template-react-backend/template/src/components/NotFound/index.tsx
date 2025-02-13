
import { useNavigate} from 'react-router-dom'
import { Result, Button } from 'antd';

export interface Props {
  name?: string;
}

const Greeting = ({ name }: Props) => {
    const navigate = useNavigate()
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="对不起，您访问的资源不存在！"
        extra={<Button type="primary" onClick={() => navigate('/')}>返回首页</Button>}
      />
    </div>
  );
};

export default Greeting;
