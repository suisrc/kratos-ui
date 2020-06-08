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
import React, { useState, useEffect } from 'react';
import { Link, history, useModel, useIntl } from 'umi';

import { Sign3rdType, sign3rd, querySign3rdApp } from '@/services/sign3rd';
import { SigninParamsType, SigninType, signin } from '@/services/signin';

import { getPageQuery } from '@/utils/utils';
import LogoIcon from '@/assets/LogoIcon';
import SigninFrom from '@/components/Signin';
import SelectLang from '@/components/SelectLang';

import styles from './style.less';
import gstyle from '@/global.less';

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
  const { refresh } = useModel('@@initialState');
  const [autoSignin, setAutoSignin] = useState(false);
  const [type, setType] = useState<string>('account');

  const [userSigninState, setUserSigninState] = useState<API.SigninStateType>(
    {},
  );
  const [submitting, setSubmitting] = useState(false);

  const [use3rdApps, setUse3rdApps] = useState<Sign3rdType[]>([]);

  const i18n = useIntl();

  useEffect(() => {
    initSign3rd();
  }, []);

  const initSign3rd = async () => {
    try {
      // 初始化第三方登录
      const res = await querySign3rdApp();
      if (res.success) {
        setUse3rdApps([...res.data]);
      }
    } catch (error) {
      // do nothing
    }
  };

  const handleSubmit = async (values: SigninParamsType) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await signin({ ...values, type: SigninType[type] });
      //const {data} = useRequest(() => signin({ ...values, type: SigninType[type] }));
      if (msg.success && msg.data?.status === 'ok') {
        message.success(
          i18n.formatMessage({ id: 'page.auth.signin.func.submit.success' }),
        );
        replaceGoto();
        setTimeout(() => refresh(), 0);
        return;
      }
      if (!msg.success) {
        message.error(
          i18n.formatMessage({ id: 'page.auth.signin.func.submit.error' }),
        );
      } else {
        // 如果失败去设置用户错误信息
        setUserSigninState({ ...msg.data, type });
      }
    } catch (error) {
      message.error(
        i18n.formatMessage({ id: 'page.auth.signin.func.submit.error' }),
      );
    }
    setSubmitting(false);
  };
  const { status, type: loginType } = userSigninState;

  // 第三方登陆
  const App3rdChildren: React.ReactComponentElement<any>[] = [];
  use3rdApps.map((app, index) => {
    let child =
      app.platform === 'wechat' ? (
        <WechatOutlined className={styles.icon} />
      ) : app.platform == 'dingding' ? (
        <DingdingOutlined className={styles.icon} />
      ) : app.platform == 'aliyun' ? (
        <AliyunOutlined className={styles.icon} />
      ) : app.platform == 'github' ? (
        <GithubOutlined className={styles.icon} />
      ) : app.platform == 'gitlab' ? (
        <GitlabOutlined className={styles.icon} />
      ) : (
        <TeamOutlined className={styles.icon} />
      );
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
              <LogoIcon className={styles.logo} />
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
              {type === 'account' && (
                <>
                  <Account
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
                </>
              )}
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
              {type === 'mobile' && (
                <>
                  <Account
                    name="mobile"
                    prefix={<MobileOutlined className={gstyle.prefixIcon} />}
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
                </>
              )}
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
              {App3rdChildren}
            </div>
          </SigninFrom>
        </div>
      </div>
    </div>
  );
};

export default Signin;
