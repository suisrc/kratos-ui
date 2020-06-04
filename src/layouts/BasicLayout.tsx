import React, { useState } from 'react';
import BasicLayout, {
  SettingDrawer,
  BasicLayoutProps,
} from '@ant-design/pro-layout';

const Layout = (props: BasicLayoutProps) => {
  const [settings, setSettings] = useState({});
  return (
    <>
      <SettingDrawer settings={settings} onSettingChange={setSettings} />
    </>
  );
};

export default Layout;
