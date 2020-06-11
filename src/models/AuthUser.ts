/**
 * 权限控制应用服务器
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
import { useState, useCallback, useEffect } from 'react';

//import { message } from 'antd';
import { useRequest, useModel, history } from 'umi';
import { gotoSigninPage } from '@/utils/utils';

import { MenuDataItem } from '@ant-design/pro-layout';
import defaultMenus from '../../config/menu';
import defaultSettings, { DefaultSettings } from '../../config/defaultSettings';

import {
  signout as logout,
  signin as login,
  SigninParamsType,
} from '@/services/signin';

// https://umijs.org/plugins/plugin-model
// 用于完成用户权限认证和获取用户
export default function(): {
  // 登陆相关
  signin: (params: SigninParamsType) => Promise<any>;
  signout: () => void;
  // 配置相关
  settings: DefaultSettings;
  setSettings: (settings: DefaultSettings) => void;
  menus: MenuDataItem[];
  setMenus: (menus: MenuDataItem[]) => void;
} {
  const { initialState, setInitialState, refresh } = useModel('@@initialState');
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

  // https://hooks.umijs.org/zh-CN/hooks/async#%E8%BD%AE%E8%AF%A2
  // 令牌生命周期放到服务器上处理
  // const {
  //   data: pollingData,
  //   loading: pollingLoading,
  //   run: pollingRun,
  //   cancel: pollingCancel
  // } = useRequest(() => {
  //   // 轮询, 主要是防止令牌过期，用于更新令牌
  //   console.log("123");
  // }, {
  //   pollingInterval: 10 * 60 * 1000, // 轮询间隔, 10分钟确认一次
  //   pollingWhenHidden: false, //  在页面隐藏时会暂时停止轮询
  //   manual: true,
  // });

  /**
   * 登陆
   */
  const signin = useCallback(async (params: SigninParamsType) => {
    const res: any = await login(params);
    if (res.success && res.data?.status === 'ok') {
      if (res.data?.token) {
        localStorage.setItem('kratos-token', res.data?.token);
        //pollingRun();
      }
      await refresh();
      // setTimeout(() => refresh(), 0);
    }
    return res;
  }, []);

  /**
   * 登出
   */
  const signout = useCallback(async () => {
    const res: any = await logout();
    if (res.success) {
      //pollingCancel();
      localStorage.removeItem('kratos-token');
      setCurrentUser(undefined);
    }
    gotoSigninPage();
  }, []);

  //console.log(`access=> ${JSON.stringify(initialState?.currentUser)}`);
  return {
    signin,
    signout,
    settings,
    setSettings,
    menus,
    setMenus,
  };
}

/**
 * 请求拦截器，用于增加访问权限，比如在header中增加jwt token[authorization]
 *
 * https://github.com/umijs/umi-request#interceptor
 * @param url
 * @param options
 */
export const authorization = (url: string, options: any) => {
  let token = localStorage.getItem('kratos-token');
  return {
    url,
    options: !token
      ? options
      : {
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
    gotoSigninPage();
  }
  return response;
};
