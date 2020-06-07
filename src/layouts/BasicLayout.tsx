import ProLayout, { BasicLayoutProps } from '@ant-design/pro-layout';
import React, { useState } from 'react';

import LogoIcon from '@/assets/LogoIcon';

import { useIntl as i18n } from 'umi';

import GlobalHeaderRight from '@/components/GlobalHeader/RightContent';
import Footer from '@/components/Footer';

import defaultSettings from '../../config/defaultSettings';
import SettingDrawer from '../components/SettingDrawer';

// https://pro.ant.design/blog/new-pro-use-cn
const Layout = (props: BasicLayoutProps) => {
  const [settings, setSettings] = useState<any>({ ...defaultSettings });
  return (
    <div>
      <ProLayout
        {...settings}
        logo={<LogoIcon style={{ width: '54px', padding: '10px 0px' }} />}
        title={i18n().formatMessage({
          id: 'app.layout.basic.title',
          defaultMessage: settings.title,
        })}
        rightContentRender={() => (
          <GlobalHeaderRight
            theme={settings.navTheme}
            layout={settings.layout}
          />
        )}
        footerRender={() => <Footer />}
        disableContentMargin={true}
      />
      <SettingDrawer settings={settings} onSettingChange={setSettings} />
    </div>
  );
};
export default Layout;
