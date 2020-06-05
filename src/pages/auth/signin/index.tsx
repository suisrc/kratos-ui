import {
  MobileOutlined,
  TeamOutlined,
  WechatOutlined,
  DingdingOutlined,
  AliyunOutlined,
  GithubOutlined,
  GitlabOutlined,
  //createFromIconfontCN
} from '@ant-design/icons';

import { Alert, Checkbox, message } from 'antd';
import React, { useState } from 'react';
import { Link, SelectLang, history, useModel, useIntl as i18n } from 'umi';

import { getPageQuery } from '@/utils/utils';
import { SigninParamsType, SigninType, signin } from '@/services/signin';
import SigninFrom from '@/components/Signin';

import { sign3rd, Sign3rdType } from '@/services/sign3rd';

import styles from './style.less';
import logo from '@/assets/logo.svg';
import defaultSettings from '../../../../config/defaultSettings';

// https://www.iconfont.cn/
// const IconFont = createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_1866669_dpebghh60di.js',
// });

const { Tab, Account, Password, Captcha, Submit } = SigninFrom;

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
  const [use3rdApps, setUse3rdApps] = useState<Sign3rdType[]>([]);

  const handleSubmit = async (values: SigninParamsType) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await signin({ ...values, type: SigninType[type] });
      if (msg.status === 'ok') {
        message.success(
          i18n().formatMessage({ id: 'page.auth.signin.func.submit.success' }),
        );
        replaceGoto();
        setTimeout(() => refresh(), 0);
        return;
      }
      // 如果失败去设置用户错误信息
      setUserSigninState(msg);
    } catch (error) {
      message.error(
        i18n().formatMessage({ id: 'page.auth.signin.func.submit.error' }),
      );
    }
    setSubmitting(false);
  };

  const { status, type: loginType } = userSigninState;

  // 第三方登陆
  const App3rdChildren: React.ReactComponentElement<any>[] = [];
  use3rdApps.map((app, index) => {
    let child;
    switch (app.platform) {
      case 'wechat':
        child = <WechatOutlined className={styles.icon} />;
        break;
      case 'dingding':
        child = <DingdingOutlined className={styles.icon} />;
        break;
      case 'aliyun':
        child = <AliyunOutlined className={styles.icon} />;
        break;
      case 'github':
        child = <GithubOutlined className={styles.icon} />;
        break;
      case 'gitlab':
        child = <GitlabOutlined className={styles.icon} />;
        break;
      default:
        child = <TeamOutlined className={styles.icon} />;
    }
    App3rdChildren.push(
      // 由于三方登录会直接跳转,所以不再单独处理
      <a key={app.appid} onClick={e => sign3rd(app.appid, app.signature, '')}>
        {child}
      </a>,
    );
  });

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
                {i18n().formatMessage({ id: 'page.auth.signin.logo.title' })}
              </span>
            </Link>
          </div>
          <div className={styles.desc}>
            {i18n().formatMessage({ id: 'page.auth.signin.logo.desc' })}
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
              tab={i18n().formatMessage({
                id: 'page.auth.signin.tabs.user.title',
              })}
            >
              {status === 'error' && loginType === 'account' && !submitting && (
                <SigninMessage
                  content={i18n().formatMessage({
                    id: 'page.auth.signin.tabs.user.error',
                  })}
                />
              )}

              <Account
                name="username"
                placeholder={i18n().formatMessage({
                  id: 'page.auth.signin.tabs.user.username.placeholder',
                })}
                rules={[
                  {
                    required: true,
                    message: i18n().formatMessage({
                      id: 'page.auth.signin.tabs.user.username.message',
                    }),
                  },
                ]}
              />
              <Password
                name="password"
                placeholder={i18n().formatMessage({
                  id: 'page.auth.signin.tabs.user.password.placeholder',
                })}
                rules={[
                  {
                    required: true,
                    message: i18n().formatMessage({
                      id: 'page.auth.signin.tabs.user.password.message',
                    }),
                  },
                ]}
              />
            </Tab>
            <Tab
              key="mobile"
              tab={i18n().formatMessage({
                id: 'page.auth.signin.tabs.mobile.title',
              })}
            >
              {status === 'error' && loginType === 'mobile' && !submitting && (
                <SigninMessage
                  content={i18n().formatMessage({
                    id: 'page.auth.signin.tabs.mobile.error',
                  })}
                />
              )}
              <Account
                name="mobile"
                prefix={
                  <MobileOutlined
                    style={{
                      color: defaultSettings.primaryColor,
                    }}
                    className={styles.prefixIcon}
                  />
                }
                placeholder={i18n().formatMessage({
                  id: 'page.auth.signin.tabs.mobile.mobile.placeholder',
                })}
                rules={[
                  {
                    required: true,
                    message: i18n().formatMessage({
                      id: 'page.auth.signin.tabs.mobile.mobile.1.message',
                    }),
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: i18n().formatMessage({
                      id: 'page.auth.signin.tabs.mobile.mobile.2.message',
                    }),
                  },
                ]}
              />
              <Captcha
                name="captcha"
                placeholder={i18n().formatMessage({
                  id: 'page.auth.signin.tabs.mobile.captcha.placeholder',
                })}
                countDown={120}
                getCaptchaButtonText={i18n().formatMessage({
                  id:
                    'page.auth.signin.tabs.mobile.captcha.getCaptchaButtonText',
                })}
                getCaptchaSecondText={i18n().formatMessage({
                  id:
                    'page.auth.signin.tabs.mobile.captcha.getCaptchaSecondText',
                })}
                rules={[
                  {
                    required: true,
                    message: i18n().formatMessage({
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
                {i18n().formatMessage({
                  id: 'page.auth.signin.check.auto-signin.title',
                })}
              </Checkbox>
              <a style={{ float: 'right' }} href="">
                {i18n().formatMessage({
                  id: 'page.auth.signin.check.forget-password.title',
                })}
              </a>
            </div>
            <Submit loading={submitting}>
              {i18n().formatMessage({
                id: 'page.auth.signin.func.submit.button',
              })}
            </Submit>
            <div className={styles.other}>
              {i18n().formatMessage({ id: 'page.auth.signin.other.title' })}
              {App3rdChildren}
            </div>
          </SigninFrom>
        </div>
      </div>
    </div>
  );
};

export default Signin;
