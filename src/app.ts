/**
 * 动态配置文件
 * 当前文件可以是ts, 也可以是tsx文件
 */
import React from 'react';

import { MenuDataItem } from '@ant-design/pro-layout';
import defaultSettings, { DefaultSettings } from '../config/defaultSettings';

import { history, RequestConfig } from 'umi';
import { getCurrentUser } from './services/user';
import defaultMenus from '../config/menu';

/**
 * 应用初次加载,进行初始化配置
 * @umijs/plugin-initial-state
 */
// https://umijs.org/zh-CN/plugins/plugin-initial-state
export async function getInitialState(): Promise<{
  defaultSettings?: DefaultSettings;
  defaultMenus?: MenuDataItem[];
}> {
  return {
    defaultSettings: defaultSettings,
    defaultMenus: defaultMenus,
  };
  //if (!history.location.pathname.startsWith('/auth/')) {
  //  // 登录页面，不执行(登陆页面可能会有多种情况)
  //  try {
  //    const res: any = await getCurrentUser();
  //    return {
  //      currentUser: res?.data,
  //      defaultSettings: defaultSettings,
  //      defaultMenus: defaultMenus,
  //      //defaultMenuMap: defaultMenuMap,
  //    };
  //  } catch (error) {
  //    // 发生意外，跳转到登陆首页
  //    history.replace('/auth/signin');
  //  }
  //}
}

/**
 * 应用布局配置,只有在config.ts中启用layout才有效
 * @umijs/plugin-layout
 */
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

/**
 * 请求全局配置
 * @umijs/plugin-request
 */
// https://umijs.org/plugins/plugin-request
// 该配置返回一个对象。除了 errorConfig 和 middlewares 以外其它配置都是直接透传 umi-request 的全局配置。
// export const request: RequestConfig = {
//   timeout: 1000,
//   errorConfig: {},
//   middlewares: [],
//   requestInterceptors: [],
//   responseInterceptors: [],
// };
