import {
  TeamOutlined,
  DingdingOutlined,
  WechatOutlined,
  GithubOutlined,
  CoffeeOutlined,
} from '@ant-design/icons';

import { Alert, Checkbox, message } from 'antd';
import React, { useState } from 'react';
import { Link, SelectLang, history, useModel, useIntl } from 'umi';

import { getPageQuery } from '@/utils/utils';
import { SigninParamsType, SigninType, signin } from '@/services/signin';
import SigninFrom from '@/components/Signin';

import { oauth2, getIconNode, App3rdType } from '@/services/oauth2';

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
  const [autoSignin, setAutoSignin] = useState(false);
  const [type, setType] = useState<string>('account');

  const i18n = useIntl();

  const handleSubmit = async (values: SigninParamsType) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await signin({ ...values, type });
      if (msg.status === 'ok') {
        message.success(
          i18n.formatMessage({ id: 'page.auth.signin.func.submit.success' }),
        );
        replaceGoto();
        setTimeout(() => refresh(), 0);
        return;
      }
      // 如果失败去设置用户错误信息
      setUserSigninState(msg);
    } catch (error) {
      message.error(
        i18n.formatMessage({ id: 'page.auth.signin.func.submit.error' }),
      );
    }
    setSubmitting(false);
  };

  const { status, type: loginType } = userSigninState;

  // 第三方登陆应用
  const use3rdApp: {
    [key: string]: App3rdType;
  } = {
    alipay: {
      platform: 'alipay',
      appid: '10000',
      name: '支付宝登陆',
      title: '支付宝',
      signature: '10000',
    },
    wechat: {
      platform: 'wechat',
      appid: '10001',
      name: '微信登陆',
      title: '微信',
      signature: '10001',
    },
  };

  // {getIconNode(app.platform)}
  const get3rdAppNode = (app: App3rdType) => {
    return (
      //<a className={styles.icon} onClick={v => oauth2(app.appid, app.signature)}>
      <TeamOutlined className={styles.icon} />
      //</a>
    );
  };
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
            <Tab
              key="account"
              tab={i18n.formatMessage({
                id: 'page.auth.signin.tabs.user.title',
              })}
            >
              {status === 'error' && loginType === 'account' && !submitting && (
                <SigninMessage
                  content={i18n.formatMessage({
                    id: 'page.auth.signin.tabs.user.error',
                  })}
                />
              )}

              <Username
                name="username"
                placeholder={i18n.formatMessage({
                  id: 'page.auth.signin.tabs.user.username.placeholder',
                })}
                rules={[
                  {
                    required: true,
                    message: i18n.formatMessage({
                      id: 'page.auth.signin.tabs.user.username.message',
                    }),
                  },
                ]}
              />
              <Password
                name="password"
                placeholder={i18n.formatMessage({
                  id: 'page.auth.signin.tabs.user.password.placeholder',
                })}
                rules={[
                  {
                    required: true,
                    message: i18n.formatMessage({
                      id: 'page.auth.signin.tabs.user.password.message',
                    }),
                  },
                ]}
              />
            </Tab>
            <Tab
              key="mobile"
              tab={i18n.formatMessage({
                id: 'page.auth.signin.tabs.mobile.title',
              })}
            >
              {status === 'error' && loginType === 'mobile' && !submitting && (
                <SigninMessage
                  content={i18n.formatMessage({
                    id: 'page.auth.signin.tabs.mobile.error',
                  })}
                />
              )}
              <Mobile
                name="mobile"
                placeholder={i18n.formatMessage({
                  id: 'page.auth.signin.tabs.mobile.mobile.placeholder',
                })}
                rules={[
                  {
                    required: true,
                    message: i18n.formatMessage({
                      id: 'page.auth.signin.tabs.mobile.mobile.1.message',
                    }),
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: i18n.formatMessage({
                      id: 'page.auth.signin.tabs.mobile.mobile.2.message',
                    }),
                  },
                ]}
              />
              <Captcha
                name="captcha"
                placeholder={i18n.formatMessage({
                  id: 'page.auth.signin.tabs.mobile.captcha.placeholder',
                })}
                countDown={120}
                getCaptchaButtonText={i18n.formatMessage({
                  id:
                    'page.auth.signin.tabs.mobile.captcha.getCaptchaButtonText',
                })}
                getCaptchaSecondText={i18n.formatMessage({
                  id:
                    'page.auth.signin.tabs.mobile.captcha.getCaptchaSecondText',
                })}
                rules={[
                  {
                    required: true,
                    message: i18n.formatMessage({
                      id: 'page.auth.signin.tabs.mobile.captcha.message',
                    }),
                  },
                ]}
              />
            </Tab>
            <div>
              <Checkbox
                checked={autoSignin}
                onChange={e => setAutoSignin(e.target.checked)}
              >
                {i18n.formatMessage({
                  id: 'page.auth.signin.check.auto-signin.title',
                })}
              </Checkbox>
              <a style={{ float: 'right' }} href="">
                {i18n.formatMessage({
                  id: 'page.auth.signin.check.forget-password.title',
                })}
              </a>
            </div>
            <Submit loading={submitting}>
              {i18n.formatMessage({
                id: 'page.auth.signin.func.submit.button',
              })}
            </Submit>
            <div className={styles.other}>
              {i18n.formatMessage({ id: 'page.auth.signin.other.title' })}
              <a
                className={styles.icon}
                onClick={v => oauth2(app.appid, app.signature)}
              >
                <TeamOutlined className={styles.icon} />
              </a>
              {get3rdAppNode(use3rdApp[0])}
              {use3rdApp.map((v, i) => {
                get3rdAppNode(v);
              })}
              {/*<Link className={styles.register} to="/user/register">注册账户</Link>*/}
              {/*作为管理平台，不提供自我注册方式*/}
            </div>
          </SigninFrom>
        </div>
      </div>
    </div>
  );
};

export default Signin;
