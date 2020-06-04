import React, { useState } from 'react';

import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';

import { history } from 'umi';

import GlobalHeaderRight from '@/components/GlobalHeader/RightContent';
import Footer from '@/components/Footer';

import { queryCurrent } from './services/user';

import defaultSettings from '../config/defaultSettings';

export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  settings?: LayoutSettings;
}> {
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/auth/signin') {
    try {
      const currentUser = await queryCurrent();
      return {
        currentUser,
        settings: defaultSettings,
      };
    } catch (error) {
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
export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <GlobalHeaderRight />,
    footerRender: () => <Footer />,
    disableContentMargin: false,
    //menuHeaderRender: undefined,
    // menuDataRender: () => [],
    ...initialState?.settings,
  };
};

// const GlobalLayout: React.FC = (
//   children,
//   initialState: { settings?: LayoutSettings },
// ) => {
//   const [settings, setSettings] = useState({ ...initialState?.settings });
//   return (
//     <>
//       {children}
//       <SettingDrawer settings={settings} onSettingChange={setSettings} />
//     </>
//   );
// };
// export default GlobalLayout;
