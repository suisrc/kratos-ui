import BasicLayout, {
  //SettingDrawer,
  BasicLayoutProps,
} from '@ant-design/pro-layout';
import React, { useState } from 'react';

import GlobalHeaderRight from '@/components/GlobalHeader/RightContent';
import Footer from '@/components/Footer';
import defaultSettings from '../../config/defaultSettings';

import SettingDrawer from '../components/SettingDrawer';

// https://pro.ant.design/blog/new-pro-use-cn
const Layout = (props: BasicLayoutProps) => {
  const [settings, setSettings] = useState<any>({ ...defaultSettings });
  return (
    <>
      <BasicLayout
        {...settings}
        rightContentRender={() => <GlobalHeaderRight />}
        footerRender={() => <Footer />}
        disableContentMargin={false}
      />
      <SettingDrawer settings={settings} onSettingChange={setSettings} />
    </>
  );
};
export default Layout;
