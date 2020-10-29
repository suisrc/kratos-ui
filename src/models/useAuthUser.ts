/**
 * 权限控制应用服务器
 *
 * https://umijs.org/zh-CN/plugins/plugin-model
 * 约定在 src/models 目录下的文件为项目定义的 model 文件。每个文件需要默认导出一个 function，该 function 定义了一个 Hook，不符合规范的文件我们会过滤掉。
 * 文件名则对应最终 model 的 name，你可以通过插件提供的 API 来消费 model 中的数据。
 *
 * https://hooks.umijs.org/zh-CN/hooks/async
 */

// export default () => {
//   const { data, error, loading } = useRequest(getUsername)
//   if (error) {
//     return <div>failed to load</div>
//   }
//   if (loading) {
//     return <div>loading...</div>
//   }
//   return <div>Username: {data}</div>
// }

/**
 * 本来想把所有CurrentUser的内容封装到该Model中完成，
 * 但是，目前无法做到initialState和当前环境中的currentUser内容联动
 * 所以，目前只能保留signin和signout的两个方法
 */
import { useState, useCallback, useEffect, useRef } from 'react';

//import { message } from 'antd';
import { useRequest, useModel, history } from 'umi';
import { gotoSigninPage } from '@/utils/utils';

import { MenuDataItem } from '@ant-design/pro-layout';
import defaultMenus from '../../config/menu';
import defaultSettings, { DefaultSettings } from '../../config/defaultSettings';

import {
  signout as logout,
  signin as login,
  refresh as relogin,
  SigninParamsType,
} from '@/services/signin';
// import e from 'express';

// 主题颜色
export const primaryColor = defaultSettings.primaryColor;

const KratosAccessToken = 'kratos_access_token';
const KratosRefreshToken = 'kratos_refresh_token';

// https://umijs.org/plugins/plugin-model
// 用于完成用户权限认证和获取用户
export default function(): {
  // 登陆相关
  signin: (params: SigninParamsType) => Promise<any>;
  signout: () => Promise<any>;
  // 配置访问令牌, 主要给oauth2认证使用
  setToken: (token: API.SigninStateType) => void;
  // 配置相关
  settings: DefaultSettings;
  setSettings: (settings: DefaultSettings) => void;
  // 菜单相关
  menus: MenuDataItem[];
  setMenus: (menus: MenuDataItem[]) => void;
} {
  const { initialState, setInitialState, refresh } = useModel('@@initialState');
  // 更新用户
  const setCurrentUser = useCallback(
    currentUser => setInitialState({ ...initialState, currentUser }),
    [],
  );

  // 🚦🚥🚦思考了很久,最后决定将配置和菜单放入用于权限模块中
  // 因为当用户信息发生变化时候,对应的菜单内容也应该进行变更
  const [settings, setSettings] = useState<DefaultSettings>({
    ...defaultSettings,
  });
  const [menus, setMenus] = useState<MenuDataItem[]>([...defaultMenus]);

  // 登陆标识
  const isSignin = useRef<boolean>(false);
  // 令牌刷新标识
  const runRefreshHandle = useRef<NodeJS.Timeout | undefined>();

  // 当initialState中的currentUser发生变化时候触发
  useEffect(() => {
    if (initialState?.currentUser?.menus) {
      setMenus([...initialState?.currentUser?.menus]);
    } else {
      setMenus([...defaultMenus]);
    }
    // 判定是否登陆
    isSignin.current = !!initialState?.currentUser;

    // 启动令牌刷新
    if (isSignin.current && runRefreshHandle.current === undefined) {
      // 没有执行更新令牌,需要更新令牌
      const token = sessionStorage.getItem(KratosRefreshToken);
      if (!!token && token != 'undefined') {
        refreshToken(token); // 立即启动令牌刷新
      }
    } else if (!isSignin.current && runRefreshHandle.current != undefined) {
      clearTimeout(runRefreshHandle.current);
      runRefreshHandle.current = undefined;
    }
  }, [initialState?.currentUser]);

  //https://hooks.umijs.org/zh-CN/hooks/async#%E8%BD%AE%E8%AF%A2
  //令牌生命周期放到服务器上处理
  //const {
  //  run: tokenRefreshRun,
  //  cancel: tokenRefreshCancel,
  //  loading: tokenRefreshLoading,
  //} = useRequest(login, {
  //  onSuccess: (data, params) => {
  //    localStorage.setItem('kratos_token', data?.token);
  //  },
  //  pollingInterval: 60 * 60 * 1000, // 轮询间隔, 60分钟确认一次
  //  pollingWhenHidden: false, //  在页面隐藏时会暂时停止轮询
  //  manual: true,
  //});

  /**
   * 登陆
   */
  const signin = useCallback(async (params: SigninParamsType) => {
    const res: any = await login(params);
    if (res.success && res.data?.status === 'ok') {
      setCurrentUser(undefined); // 清除之前人员的登陆信息,重新刷新用户信息
      await setToken(res.data); // 配置令牌
    }
    return res;
  }, []);

  /**
   * 配置令牌
   */
  const setToken = async (token: API.SigninStateType) => {
    if (!!token?.access_token) {
      sessionStorage.setItem(KratosAccessToken, token.access_token);
      //localStorage.setItem(KratosAccessToken, token);
      if (!!token?.refresh_token) {
        sessionStorage.setItem(KratosRefreshToken, token.refresh_token);
        let interval: number = !!token.expires_in
          ? token.expires_in * 500
          : 600 * 1000; // 使用间隔时间的一半, 如果不存在, 默认使用10分钟更新一次令牌
        if (interval < 300 * 1000) {
          interval = 300 * 1000; // 注意, 该内容和refreshToken会形成循环递归, 所以注意,刷新间隔不能太短
        }
        // interval = 10000; // 测试使用
        // sessionStorage.setItem(KratosRefreshInterval, interval + '')
        if (runRefreshHandle.current != undefined) {
          clearTimeout(runRefreshHandle.current); // 关闭令牌句柄
          runRefreshHandle.current = undefined; // 清除令牌句柄
        }
        runRefreshHandle.current = setTimeout(
          () => refreshToken(token.refresh_token),
          interval,
        ); // 刷新访问令牌
      }
      if (!isSignin.current) {
        // setTimeout(() => refresh(), 0);
        await refresh(); // 当前用户未登陆, 重置登陆信息
      }
    } else {
      // 无法使用新令牌, 访问下出现异常
      sessionStorage.removeItem(KratosAccessToken);
      sessionStorage.removeItem(KratosRefreshToken);
      // localStorage.removeItem(KratosAccessToken);
      //setCurrentUser(undefined);
    }
  };

  /**
   * 刷新令牌
   * @param rtoken refresh token
   */
  const refreshToken = async (rtoken: string | undefined) => {
    if (!!rtoken) {
      // 执行令牌刷新, 注意, 该内容和setToken形成循环递归, 一定要注意调用的方式
      const otoken: any = sessionStorage.getItem(KratosRefreshToken);
      if (rtoken === otoken) {
        // 确定是否是本次需要更新的令牌, 由于退出重新登陆操作, 会将令牌冲掉, 导致刷新令牌异常
        const res: any = await relogin(rtoken);
        if (res.success && res.data?.status === 'ok') {
          await setToken(res.data); // 配置令牌
        } else {
          // 令牌更新失败, 重定向到登陆页面
          // 无法得到正确的访问令牌, 删除已有的令牌,
          sessionStorage.removeItem(KratosAccessToken);
          sessionStorage.removeItem(KratosRefreshToken);
          //localStorage.removeItem(KratosAccessToken);
          gotoSigninPage(); // 无法得到正确的访问令牌, 重定向到登陆页面
        }
      }
    }
  };

  /**
   * 登出
   */
  const signout = useCallback(async () => {
    const res: any = await logout();
    if (res.success) {
      //if (tokenRefreshLoading) {
      //  tokenRefreshCancel();
      //}
    }
    sessionStorage.removeItem(KratosAccessToken);
    sessionStorage.removeItem(KratosRefreshToken);
    //localStorage.removeItem(KratosAccessToken);
    setCurrentUser(undefined);
    gotoSigninPage();
    return res;
  }, []);

  //console.log(`access=> ${JSON.stringify(initialState?.currentUser)}`);
  return {
    signin,
    signout,
    setToken,
    settings,
    setSettings,
    menus,
    setMenus,
  };
}

/**
 * 确定是否有访问令牌
 * @param key
 */
export const hasAuthToken = () => {
  // document.cookie.includes(KratosAccessToken)
  return !!sessionStorage.getItem(KratosAccessToken);
  //return !!localStorage.getItem(KratosAccessToken);
};

/**
 * 请求拦截器，用于增加访问权限，比如在header中增加jwt token[authorization]
 *
 * https://github.com/umijs/umi-request#interceptor
 * @param url
 * @param options
 */
export const authorization = (url: string, options: any) => {
  let token = sessionStorage.getItem(KratosAccessToken);
  //let token = localStorage.getItem(KratosAccessToken);
  if (!token || token === 'undefined') {
    return { url, options };
  }
  return {
    url,
    options: {
      ...options,
      headers: { ...options.headers, authorization: `Bearer ${token}` },
    },
  };
};
/**
 * 请求拦截器，用于重定向无访问权限的请求
 * 只要服务器发生无访问权限，直接跳转到登录页面
 *
 * https://github.com/umijs/umi-request#interceptor
 * @param url
 * @param options
 */
export const unauthorization = (response: any, options: any) => {
  //const data = await response.clone().json();
  //if (data && data.NOT_LOGIN) {
  //  location.href = '登录url';
  //}
  if (response.status === 401) {
    //location.href = '/auth/signin';
    sessionStorage.removeItem(KratosAccessToken);
    sessionStorage.removeItem(KratosRefreshToken);
    gotoSigninPage();
  }
  return response;
};
