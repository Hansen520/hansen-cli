import { memo } from 'react';
import { Card, Image, Cell, Button } from 'react-vant';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import history from '@/utils/history';
import { GongLu } from '@/typings';
import { setAuth, getStorage } from '@/utils';
import styles from './index.module.less';

const Admin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none">
    <g clipPath="url(#clip0_3028_10318)">
      <path
        d="M1.66675 17.4998V15.8331H3.33341V4.02893C3.33341 3.6256 3.62175 3.2806 4.01758 3.20894L11.9109 1.77393C12.1826 1.72393 12.4426 1.90477 12.4917 2.17643C12.4976 2.2056 12.5001 2.23477 12.5001 2.2656V3.33227L15.8334 3.3331C16.2934 3.3331 16.6667 3.70643 16.6667 4.16643V15.8331H18.3334V17.4998H15.0001V4.99977H12.5001V17.4998H1.66675ZM10.8334 3.6631L5.00008 4.72477V15.8331H10.8334V3.6631ZM10.0001 9.16643V10.8331H8.33341V9.16643H10.0001Z"
        fill="#232324"
      />
      <rect
        x="8.33325"
        y="9.1665"
        width="1.66667"
        height="1.66667"
        fill="#3370FF"
      />
    </g>
    <defs>
      <clipPath id="clip0_3028_10318">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Pass = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none">
    <path
      d="M5 6.66683V5.8335C5 3.07207 7.23857 0.833496 10 0.833496C12.7614 0.833496 15 3.07207 15 5.8335V6.66683H16.6667C17.1269 6.66683 17.5 7.03993 17.5 7.50016V17.5002C17.5 17.9604 17.1269 18.3335 16.6667 18.3335H3.33333C2.8731 18.3335 2.5 17.9604 2.5 17.5002V7.50016C2.5 7.03993 2.8731 6.66683 3.33333 6.66683H5ZM15.8333 8.3335H4.16667V16.6668H15.8333V8.3335ZM9.16667 13.1105C8.6685 12.8223 8.33333 12.2837 8.33333 11.6668C8.33333 10.7463 9.0795 10.0002 10 10.0002C10.9205 10.0002 11.6667 10.7463 11.6667 11.6668C11.6667 12.2837 11.3315 12.8223 10.8333 13.1105V15.0002H9.16667V13.1105ZM6.66667 6.66683H13.3333V5.8335C13.3333 3.99255 11.8409 2.50016 10 2.50016C8.15905 2.50016 6.66667 3.99255 6.66667 5.8335V6.66683Z"
      fill="#232324"
    />
    <path
      d="M8.33333 11.6668C8.33333 12.2837 8.6685 12.8223 9.16667 13.1105V15.0002H10.8333V13.1105C11.3315 12.8223 11.6667 12.2837 11.6667 11.6668C11.6667 10.7463 10.9205 10.0002 10 10.0002C9.0795 10.0002 8.33333 10.7463 8.33333 11.6668Z"
      fill="#3370FF"
    />
  </svg>
);



const User = () => {
  const dispatch = useDispatch<Dispatch>();
  const outLogin = () => {
    dispatch.global.userOutLogin();
    setAuth('')
  };
  return (
    <section className={styles.container}>
      <Card className={styles.card}>
        <Card.Body>
          <section className="flex items-center pt-[25px] pl-[20px]">
            <div>
              <Image
                width="64"
                height="64"
                round
                src="https://img.yzcdn.cn/vant/cat.jpeg"
              />
            </div>
            <div className=" text-white ml-[20px]">
              <div className="mb-[8px]">{getStorage(GongLu.StorageVal.UserInfo)}</div>
              <div className="text-gray-300 ">******</div>
            </div>
          </section>
        </Card.Body>
      </Card>
      <section className="mt-[20px]">
        <Cell.Group border={false}>
          <Cell border={false} title="账号" value={getStorage(GongLu.StorageVal.UserInfo)} icon={<Admin />} />
          <Cell border={false} title="密码" value="******" icon={<Pass />} />
        </Cell.Group>
      </section>
      <section className='mt-[20px]'>
        <Button block hairline color="#F5F6F7" onClick={() => outLogin()}>
          <span style={{ color: '#000' }}>退出登录</span>
        </Button>
        <Button block hairline>
          注销账号
        </Button>
      </section>
    </section>
  );
};
export default memo(User);
