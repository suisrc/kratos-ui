import React from 'react';

import { MenuDataItem } from '@ant-design/pro-layout';
import defaultSettings, { DefaultSettings } from '../config/defaultSettings';
import defaultMenus from '../config/menu';

//import { history } from 'umi';
//import { getCurrentUser } from './services/user';
//import GlobalHeaderRight from '@/components/GlobalHeader/RightContent';
//import Footer from '@/components/Footer';

// 全局配置
// https://umijs.org/zh-CN/plugins/plugin-initial-state
export async function getInitialState(): Promise<{
  defaultSettings?: DefaultSettings;
  defaultMenus?: MenuDataItem[];
}> {
  //if (!history.location.pathname.startsWith('/auth/')) {
  //  // 登录页面，不执行(登陆页面可能会有多种情况)
  //  try {
  //    const res: API.ErrorInfo<API.CurrentUser> = await getCurrentUser();
  //    return {
  //      currentUser: res.data,
  //      defaultSettings: defaultSettings,
  //      defaultMenus: defaultMenus,
  //      //defaultMenuMap: defaultMenuMap,
  //    };
  //  } catch (error) {
  //    // 发生意外，跳转到登陆首页
  //    history.replace('/auth/signin');
  //  }
  //}
  return {
    defaultSettings: defaultSettings,
    defaultMenus: defaultMenus,
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
