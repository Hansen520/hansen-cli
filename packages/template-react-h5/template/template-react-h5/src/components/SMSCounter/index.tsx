/*
 * @Date: 2023-12-05 16:55:32
 * @Description: descriptio
 */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Toast } from 'react-vant';

export let intervalTime: any = null;
export default function SMSCounter() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [smsStatus, setsmsStatus] = useState(1);
  const [smsTick, setsmsTick] = useState(60);
  const [smsLoading,] = useState(false);
  const sendText = useMemo(() => {
    let text = '重新发送';
    if (smsStatus === 1) {
      text = `重新发送(${smsTick}s)`;
    } else if (smsStatus === 2) {
      text = '重新发送';
    }

    return text;
  }, [smsStatus, smsTick]);
  const onAction = async () => {
    const userId = searchParams.get('userId');
    console.log(userId, 29);
    const response = await dispatch.global.getSMS({ userId });
    console.log(response, 31);
    if (response) {
      Toast('验证码发送成功');
      startIntervalTime();
    }
  };
  useEffect(() => {
    startIntervalTime();
    return () => {
      intervalTime && clearInterval(intervalTime);
    };
  }, []);
  const startIntervalTime = () => {
    clearInterval(intervalTime);
    intervalTime = setInterval(() => {
      setsmsTick((v) => {
        if (v < 0) {
          clearInterval(intervalTime);
          return 60;
        }
        setsmsStatus(v === 0 ? 2 : 1);
        return v - 1;
      });
      // setsmsStatus(tick === 0 ? 2 : 1);
    }, 1000);
  };

  return (
    <span
      onClick={() => {
        onAction();
      }}
    >
      {sendText}
    </span>
  );
}
