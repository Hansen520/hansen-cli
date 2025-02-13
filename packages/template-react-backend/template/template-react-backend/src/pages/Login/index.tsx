import { useRef } from "react";
import { Modal, Input, Form } from "antd";
import { useNavigate } from "react-router-dom";
import logoGl from "@/assets/logo-gl.png";
import styles from "./index.module.less";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { useState } from "react";
import { required, min, max, hasEmpty } from "@/utils/verify";
import { setStorage } from "@/utils";
import useAuth from "@/utils/useAuth";
import { HOME_URL } from '@/contain';
import store from "@/store";

const Index = () => {
  const [global, globalDispatchers] = store.useModel("global");
  const [isAgreeProtocol, setIsAgreeProtocol] = useState<boolean>(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const onFinish = async (value: any) => {
    // try {
    //   if (!isAgreeProtocol) {
    //     message.warning('请阅读并同意用户协议和隐私政策!');
    //     return false;
    //   }
    // } catch (error) {
    //   console.error(error);
    // }

    try {
      const data = await globalDispatchers.userLogin({
        ...value,
      });

      if (data) {
        /* 设置按钮资源点权限 */
        setAuth({ authButtonA: true, authButtonB: true });
        setStorage("token", data.access_token);
        setStorage("buttonAuth", JSON.stringify({ authButtonA: true, authButtonB: true }));
        navigate(HOME_URL);
      }
    } catch (error) {
      Modal.destroyAll();
      console.error(error);
    }
  };

  const goUserProtocol = (e: any) => {
    e.preventDefault();
    // window.open("https://static-files.gonglu.info/guangSha/agreement.html", "_blank");
    return false;
  };
  const goPrivacyPolicy = (e: any) => {
    e.preventDefault();
    return false;
    // window.open("https://static-files.gonglu.info/guangSha/privacy.html", "_blank");
  };
  const isAgreeServer = (e: any) => {
    setIsAgreeProtocol(e.target.checked);
  };
  return (
    <div className={styles.container}>
      <div className={styles.bgImage}>
        <div className={styles.companyInfo}>
          <h1>首页信息</h1>
          <div className={styles.proName}>
            <span>工程项目管理系统</span>
          </div>
          <div className={styles.vision}>
            安全<span>/</span>放心<span>/</span>便捷
          </div>
        </div>
        <div className={styles.companyName}>我的模板</div>
      </div>
      <div className={styles.content}>
        <LoginForm
          onFinish={onFinish}
          logo={logoGl}
          title={"您好，欢迎使用！"}
          submitter={{
            searchConfig: {
              submitText: "登录",
            },
          }}
          autoComplete="off"
          actions={
            <>
              {/* <Checkbox onChange={isAgreeServer}>
                <span>
                  我已阅读并同意
                  <a
                    onClick={(e) => {
                      goUserProtocol(e);
                    }}
                  >
                    《用户服务协议》
                  </a>
                  以及
                  <a
                    onClick={(e) => {
                      goPrivacyPolicy(e);
                    }}
                  >
                    《隐私政策》
                  </a>
                </span>
              </Checkbox> */}
              {/* <div
                className={styles.forgetPass}
                onClick={() => {
                  history?.push('/forgetPassword');
                }}
              >
                忘记密码
              </div> */}
            </>
          }
        >
          <>
            <Input
              style={{
                height: "0",
                width: "0",
                overflow: "hidden",
                padding: "0",
                border: "none",
                position: "absolute",
              }}
              maxLength={11}
            />
            <ProFormText
              name="userName"
              fieldProps={{
                size: "large",
                maxLength: 32,
                bordered: false,
              }}
              placeholder={"请输入账号"}
              rules={[min(4, "账号不能少于4位"), max(32, "账号不能超过32位"), required("请输入账号"), hasEmpty()]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                type: "password",
                maxLength: 32,
                bordered: false,
                autoComplete: "new-password",
              }}
              placeholder={"请输入密码"}
              rules={[required("请输入密码"), min(6, "密码不能少于6位"), max(32, "账号不能超过32位"), hasEmpty()]}
            />
          </>

          <div />
        </LoginForm>
      </div>
    </div>
  );
};

export default Index;
