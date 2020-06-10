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

import { useState, useCallback, useEffect } from 'react';

//import { message } from 'antd';
import { useRequest } from 'umi';
import { gotoSigninPage } from '@/utils/utils';

import {
  signout as logout,
  signin as login,
  SigninParamsType,
} from '@/services/signin';
import { getCurrentUser } from '@/services/user';

// https://umijs.org/plugins/plugin-model
// 用于完成用户权限认证和获取用户
export default function AuthUser(): {
  loading: boolean;
  currentUser?: API.CurrentUser;
  isSignin: boolean;
  signin: (params: SigninParamsType) => Promise<any>;
  signout: () => void;
  refresh: () => Promise<any>;
} {
  const [currentUser, setCurrentUser] = useState<any>();

  /**
   * 获取当前用户信息
   */
  //const { loading, run: refresh} = useRequest(getCurrentUser, {
  //  manual: true,
  //  onSuccess: (result, params) => {
  //    setCurrentUser(result);
  //  },
  //  onError: (error, params) => {
  //    setCurrentUser(undefined);
  //  },
  //  //formatResult: result => result?.data,
  //});
  const [loading, setLoading] = useState<boolean>(false);
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res: API.ErrorInfo<API.CurrentUser> = await getCurrentUser();
      if (res.success) {
        setCurrentUser(res.data);
      } else {
        setCurrentUser(undefined);
      }
    } catch (error) {
      setCurrentUser(undefined);
    }
    setLoading(false);
  }, []);

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

  /**
   * 初始化， 返回值如果是方法，表示回收初始化的内容
   */
  useEffect(() => {
    refresh();
    return () => setCurrentUser(undefined);
  }, []);

  return {
    loading: loading,
    currentUser: currentUser,
    isSignin: !!currentUser?.userid,
    signin,
    signout,
    refresh,
  };
}
