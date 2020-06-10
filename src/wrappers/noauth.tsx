import React from 'react';
import { useModel } from 'umi';
import { gotoSigninPage, replaceGoto } from '@/utils/utils';
import PageLoading from '@/components/PageLoading';

export default (props: any) => {
  const { initialState, loading } = useModel('@@initialState');
  if (loading) {
    return <PageLoading />;
  }
  if (initialState?.isSignin) {
    replaceGoto();
    return <PageLoading />;
  } else {
    return <div>{props.children}</div>;
  }
};
