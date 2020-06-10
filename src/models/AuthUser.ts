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
import { useRequest, useModel } from 'umi';
import { gotoSigninPage } from '@/utils/utils';

import {
  signout as logout,
  signin as login,
  SigninParamsType,
} from '@/services/signin';
import { getCurrentUser } from '@/services/user';

// https://umijs.org/plugins/plugin-model
// 用于完成用户权限认证和获取用户
export default function(): {
  signin: (params: SigninParamsType) => Promise<any>;
  signout: () => void;
} {
  const { initialState, setInitialState, refresh, loading } = useModel(
    '@@initialState',
  );

  //const [currentUser, setCurrentUser] = useState();
  //const { currentUser } = initialState || {};
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
  };
}
