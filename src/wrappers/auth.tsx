import React from 'react';
import { useModel } from 'umi';
import { gotoSigninPage } from '@/utils/utils';
import PageLoading from '@/components/PageLoading';

export default (props: any) => {
  // const { currentUser, loading, signout } = useModel('useAuthUser');
  const { initialState, loading } = useModel('@@initialState');
  if (loading) {
    return <PageLoading />;
  }
  if (initialState?.isSignin) {
    return <div>{props.children}</div>;
  } else {
    gotoSigninPage();
    return <PageLoading />;
  }
};
