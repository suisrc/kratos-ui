import React from 'react';
import { useModel } from 'umi';
import { gotoSigninPage } from '@/utils/utils';
import PageLoading from '@/components/PageLoading';

export default (props: any) => {
  const { isSignin, loading } = useModel('AuthUser');

  console.log(isSignin);
  if (loading) {
    return <PageLoading />;
  }
  if (isSignin) {
    return <div>{props.children}</div>;
  } else {
    gotoSigninPage();
    return <div />;
  }
};
