import { Result, Button } from 'antd';
import { useNavigate} from 'react-router-dom'

const Index = () => {
    const navigate = useNavigate()
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="对不起，您没有权限访问当前页面！"
        extra={<Button type="primary" onClick={() => navigate('/')}>返回首页</Button>}
      />
    </div>
  );
};
export default Index;
