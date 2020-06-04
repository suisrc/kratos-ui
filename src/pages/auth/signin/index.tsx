import {
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';

import { Alert, Checkbox, message } from 'antd';
import React, { useState } from 'react';
import { Link, SelectLang, history, useModel, useIntl } from 'umi';

import { getPageQuery } from '@/utils/utils';
import { SigninParamsType, fakeAccountSignin } from '@/services/signin';
import SigninFrom from '@/components/Signin';

import styles from './style.less';
import logo from '@/assets/logo.svg';

const { Tab, Username, Password, Mobile, Captcha, Submit } = SigninFrom;

const SigninMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const replaceGoto = () => {
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();
  let { redirect } = params as { redirect: string };
  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#') + 1);
      }
    } else {
      window.location.href = '/';
      return;
    }
  }
  history.replace(redirect || '/');
};

const Signin: React.FC<{}> = () => {
  const [userSigninState, setUserSigninState] = useState<API.SigninStateType>(
    {},
  );
  const [submitting, setSubmitting] = useState(false);

  const { refresh } = useModel('@@initialState');
  const [autoSignin, setAutoSignin] = useState(true);
  const [type, setType] = useState<string>('account');

  const i18n = useIntl();

  const handleSubmit = async (values: SigninParamsType) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await fakeAccountSignin({ ...values, type });
      if (msg.status === 'ok') {
        message.success('登录成功！');
        replaceGoto();
        setTimeout(() => {
          refresh();
        }, 0);
        return;
      }
      // 如果失败去设置用户错误信息
      setUserSigninState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setSubmitting(false);
  };

  const { status, type: loginType } = userSigninState;

  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>
                {i18n.formatMessage({ id: 'page.auth.signin.logo.title' })}
              </span>
            </Link>
          </div>
          <div className={styles.desc}>
            {i18n.formatMessage({ id: 'page.auth.signin.logo.desc' })}
          </div>
        </div>

        <div className={styles.main}>
          <SigninFrom
            activeKey={type}
            onTabChange={setType}
            onSubmit={handleSubmit}
          >
            <Tab key="account" tab="账户密码登录">
              {status === 'error' && loginType === 'account' && !submitting && (
                <SigninMessage content="账户或密码错误（admin/ant.design）" />
              )}

              <Username
                name="username"
                placeholder="用户名: admin or user"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <Password
                name="password"
                placeholder="密码: ant.design"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </Tab>
            <Tab key="mobile" tab="手机号登录">
              {status === 'error' && loginType === 'mobile' && !submitting && (
                <SigninMessage content="验证码错误" />
              )}
              <Mobile
                name="mobile"
                placeholder="手机号"
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <Captcha
                name="captcha"
                placeholder="验证码"
                countDown={120}
                getCaptchaButtonText=""
                getCaptchaSecondText="秒"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
              />
            </Tab>
            <div>
              <Checkbox
                checked={autoSignin}
                onChange={e => setAutoSignin(e.target.checked)}
              >
                自动登录
              </Checkbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码
              </a>
            </div>
            <Submit loading={submitting}>登录</Submit>
            <div className={styles.other}>
              其他登录方式
              <AlipayCircleOutlined className={styles.icon} />
              <TaobaoCircleOutlined className={styles.icon} />
              <WeiboCircleOutlined className={styles.icon} />
              <Link className={styles.register} to="/user/register">
                注册账户
              </Link>
            </div>
          </SigninFrom>
        </div>
      </div>
    </div>
  );
};

export default Signin;
