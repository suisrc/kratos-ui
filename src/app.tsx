import React from 'react';

import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';

import { history } from 'umi';

import { getCurrentUser } from './services/user';
import defaultSettings from '../config/defaultSettings';

//import GlobalHeaderRight from '@/components/GlobalHeader/RightContent';
//import Footer from '@/components/Footer';

// 全局配置
// https://umijs.org/zh-CN/plugins/plugin-initial-state
export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  settings?: LayoutSettings;
}> {
  if (!new String(history.location.pathname).startsWith('/auth/')) {
    // 登录页面，不执行(登陆页面可能会有多种情况)
    try {
      const res: API.ErrorInfo<API.CurrentUser> = await getCurrentUser();
      return {
        currentUser: res.data,
        settings: defaultSettings,
      };
    } catch (error) {
      // 发生意外，跳转到登陆首页
      history.push('/auth/signin');
    }
  }
  return {
    settings: defaultSettings,
  };
}

// https://umijs.org/zh-CN/plugins/plugin-layout
// https://pro.ant.design/blog/new-pro-use-cn
// https://pro.ant.design/docs/router-and-nav-cn
// export const layout = ({
//   initialState,
// }: {
//   initialState: { settings?: LayoutSettings };
// }): BasicLayoutProps => {
//   return {
//     rightContentRender: () => <GlobalHeaderRight />,
//     footerRender: () => <Footer />,
//     //isChildrenLayout: true,
//     disableContentMargin: false,
//     menuHeaderRender: undefined,
//     // menuDataRender: () => [],
//     ...initialState?.settings,
//   };
// };
