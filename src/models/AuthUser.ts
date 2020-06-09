import { useState, useCallback, useRef, useEffect } from 'react';

import { message } from 'antd';
import { useModel, useRequest } from 'umi';
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
  signin: (params: SigninParamsType) => any;
  signout: () => void;
  refresh: () => void;
} {
  const [currentUser, setCurrentUser] = useState<API.CurrentUser | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * 获取当前用户信息
   */
  useEffect(() => {
    refresh();
    return () => setCurrentUser(undefined);
  }, []);

  //https://hooks.umijs.org/zh-CN/hooks/async
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      //const res: API.ErrorInfo<API.CurrentUser> =  await useRequest(() => getCurrentUser());
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

  return {
    loading: loading,
    currentUser,
    isSignin: !!currentUser?.userid,
    signin,
    signout,
    refresh,
  };
}

// const signoutAsync = async () => {
//   await logout();
//   gotoSigninPage();
// };
