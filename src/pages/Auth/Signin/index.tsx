import {
  MobileOutlined,
  TeamOutlined,
  //UserSwitchOutlined,
  //WechatOutlined,
  //DingdingOutlined,
  //AliyunOutlined,
  //GithubOutlined,
  //GitlabOutlined,
  //createFromIconfontCN
} from '@ant-design/icons';

import { Alert, Checkbox, message } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useModel, useIntl, useRequest } from 'umi';

import { Sign3rdType, sign3rd, querySign3rdApp } from '@/services/signin3rd';
import { SigninParamsType, queryCaptcha } from '@/services/signin';

import LogoIcon from '@/assets/LogoIcon';
import SigninFrom from '@/components/Signin';
import SelectLang from '@/components/SelectLang';
import Footer from '@/components/Footer';

import { getIcon } from '@/components/IconFont';

import { getRedirectPage } from '@/utils/utils';
// import PageLoading from '@/components/PageLoading';

import styles from './style.less';
import gstyle from '@/global.less';
import SelectRole, { RoleItemType } from '@/components/Signin/SelectRole';

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

const Signin: React.FC<{}> = () => {
  //const { initialState } = useModel('@@initialState');
  //console.log(initialState?.isSignin);

  const { signin } = useModel('useAuthUser');

  const [autoSignin, setAutoSignin] = useState(false);
  const [type, setType] = useState<string>('account');
  const [code, setCode] = useState<string>();

  const [signinState, setSigninState] = useState<API.SigninStateType>({});
  const [submitting, setSubmitting] = useState(false);

  const i18n = useIntl();

  // if (!submitting && /*autoSignin &&*/ isSignin) {
  //   replaceGoto();
  //   //return <PageLoading />;
  // }

  const handleSubmit = async (params: any) => {
    setSubmitting(true);
    try {
      // 登录
      const loginType = type; // 暂存当前的登陆方式
      let values: SigninParamsType = {};
      if (loginType === 'account') {
        values = {
          ...values,
          username: params.username,
          password: params.password,
        };
      } else if (loginType === 'mobile') {
        values = {
          ...values,
          username: params.mobile,
          captcha: params.captcha,
          code: code,
        };
      }
      const msg = await signin(values);
      //const {data} = useRequest(() => signin({ ...values, type: SigninType[type] }));
      if (msg.success && msg.data?.status === 'ok') {
        message.success(
          i18n.formatMessage({ id: 'page.auth.signin.func.submit.success' }),
        );
        //TODO 🍜🍜🍜 一碗热汤面,来压压惊
        //TODO 🍜🍜🍜 一碗热汤面,来压压惊
        //TODO 🍜🍜🍜 一碗热汤面,来压压惊
        // replaceGoto(); 重定向内容在/wrappers/noauth中完成
        // setTimeout(() => refresh(), 0); // 使用initialState模式,刷新全局用户信息
        return;
      } else if (!msg.success && !msg.errorMessage) {
        setSigninState({});
        message.error(
          i18n.formatMessage({ id: 'page.auth.signin.func.submit.error' }),
        );
      } else {
        // 如果失败去设置用户错误信息
        setSigninState({
          status: 'error',
          type: loginType,
          message: msg.errorMessage,
        });
      }
    } catch (error) {
      setSigninState({});
      message.error(
        i18n.formatMessage({ id: 'page.auth.signin.func.submit.error' }),
      );
    }
    setSubmitting(false);
  };
  // 发送验证码
  const handleCaptcha = async (params: any) => {
    const res = await queryCaptcha(params);
    if (res.success && res.data?.status === 'ok') {
      message.success(
        i18n.formatMessage({ id: 'page.auth.signin.func.captcha.success' }),
      );
      // 缓存签名code内容
      setCode(res.data.code);
    } else if (!res.success && !res.errorMessage) {
      message.error(
        i18n.formatMessage({ id: 'page.auth.signin.func.captcha.error' }),
      );
    } else {
      message.error(res.errorMessage);
    }
    return res;
  };
  const { status, type: loginType, roles, message: loginMessage } = signinState;
  // const  clearRoles = () => {
  //   if (roles?.length) setSigninState({...signinState, roles: undefined});
  // };

  const { data: use3rdApps } = useRequest(querySign3rdApp, {
    cacheKey: 'signin-use-3rd-apps',
  });
  const { run: goto3rd } = useRequest(sign3rd, { manual: true });

  // 如果有角色的清空下出现
  //const [roles, setRoles] = useState<RoleItemType[]>([]);
  //const [roles, setRoles] = useState<any>([{id: '1', name: '213'}]);

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
                  content={
                    loginMessage ||
                    i18n.formatMessage({
                      id: 'page.auth.signin.tabs.user.error',
                    })
                  }
                />
              )}
              {type === 'account' && (
                <>
                  <Account
                    name="username"
                    // disabled: roles?.length,
                    // onChange={clearRoles}
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
                  content={
                    loginMessage ||
                    i18n.formatMessage({
                      id: 'page.auth.signin.tabs.mobile.error',
                    })
                  }
                />
              )}
              {type === 'mobile' && (
                <>
                  <Account
                    name="mobile"
                    // onChange={clearRoles}
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
                    accountField="mobile"
                    queryCaptcha={mobile => handleCaptcha({ mobile })}
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
            {((roles as any)?.length || false) && (
              <div>
                <SelectRole
                  name="role"
                  //prefix={<UserSwitchOutlined className={gstyle.prefixIcon} />}
                  placeholder={i18n.formatMessage({
                    id: 'page.auth.signin.select.role.placeholder',
                    defaultMessage: 'Select Role',
                  })}
                  rules={[
                    {
                      required: true,
                      message: i18n.formatMessage({
                        id: 'page.auth.signin.select.role.message',
                        defaultMessage: 'Select Role',
                      }),
                    },
                  ]}
                  roles={roles}
                />
              </div>
            )}
            <div>
              <Checkbox
                checked={autoSignin}
                onChange={e => setAutoSignin(e.target.checked)}
              >
                {i18n.formatMessage({
                  id: 'page.auth.signin.check.auto-signin.title',
                })}
              </Checkbox>
              <a style={{ float: 'right' }} href="/auth/forget/password">
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
            {use3rdApps?.length && (
              <div className={styles.other}>
                {i18n.formatMessage({ id: 'page.auth.signin.other.title' })}
                {use3rdApps.map((app: any) => (
                  <a
                    key={app.appid}
                    onClick={e =>
                      goto3rd(app.appid, app.signature, getRedirectPage() || '')
                    }
                  >
                    {getIcon(app.icon, styles.icon) || (
                      <TeamOutlined className={styles.icon} />
                    )}
                  </a>
                ))}
              </div>
            )}
          </SigninFrom>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Signin;
