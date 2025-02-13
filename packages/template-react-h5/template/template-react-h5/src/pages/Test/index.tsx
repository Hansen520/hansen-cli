/*
 * @Date: 2023-12-05 09:45:29
 * @Description: description
 */
import { Dispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { Button } from 'react-vant';
function Test() {
  const dispatch = useDispatch<Dispatch>();

  return (
    <div>
      {import.meta.env.VITE_ZLB_APP_KEY}
      <Button
        onClick={() => {
          dispatch.global.userLogin({ user: '', pad: '' });
        }}>
        接口测试
      </Button>
      <button id="startbutton">Take photo</button>

      <video id="video" />

      <canvas id="canvas" />
    </div>
  );
}

export default Test;
