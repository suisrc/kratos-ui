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
import { useState, useCallback, useEffect, useMemo } from 'react';

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

  // 🚦🚥项链半天,最后决定将配置和菜单放入用于权限模块中
  // 因为当用户信息发生变化时候,对应的菜单内容也应该进行变更
  const [settings, setSettings] = useState<DefaultSettings>({
    ...defaultSettings,
  });
  const [menus, setMenus] = useState<MenuDataItem[]>([...defaultMenus]);

  //const { currentUser } = initialState || {};
  //const [currentUser, setCurrentUser] = useState();
  const setCurrentUser = useCallback(
    currentUser => setInitialState({ ...initialState, currentUser }),
    [],
  );

  /**
   * 登陆
   */
  const signin = useCallback(async (params: SigninParamsType) => {
    const res: any = await login(params);
    if (res.success && res.data?.status === 'ok') {
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
