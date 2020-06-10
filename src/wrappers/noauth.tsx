import React from 'react';
import { useModel } from 'umi';
import { gotoSigninPage, replaceGoto } from '@/utils/utils';
import PageLoading from '@/components/PageLoading';

export default (props: any) => {
  const { isSignin, loading } = useModel('AuthUser');
  if (loading) {
    return <PageLoading />;
  }
  if (isSignin) {
    replaceGoto();
    return <PageLoading />;
  } else {
    return <div>{props.children}</div>;
  }
};
