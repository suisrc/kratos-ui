import React, { useState } from 'react';

import ProLayout, {
  MenuDataItem,
  PageHeaderWrapper,
} from '@ant-design/pro-layout';

import { useIntl as i18n, IRouteComponentProps, Link, NavLink } from 'umi';

import LogoIcon from '@/assets/LogoIcon';
import GlobalHeaderRight from '@/components/GlobalHeader/RightContent';
import Footer from '@/components/Footer';
import SettingDrawer from '@/components/SettingDrawer';

import defaultSettings from '../../config/defaultSettings';
import MenuDataItems from '../../config/menu';

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => menuList;
//  menuList.map((item) => {
//    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
//    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
//});

const Layout = (props: IRouteComponentProps) => {
  const [settings, setSettings] = useState<any>({ ...defaultSettings });
  const [menuData, setMenuData] = useState<MenuDataItem[]>([...MenuDataItems]);
  //const [openKeys, setOpenKeys] = useState<string[]>([]);
  //const [collapsed, setCollapsed] = useState<boolean>(true);
  //const [load1, setLoad1] = useState<boolean>(true);
  return (
    <div>
      <ProLayout
        {...settings}
        logo={<LogoIcon style={{ width: '54px', padding: '10px 0px' }} />}
        title={i18n().formatMessage({
          id: 'app.layout.basic.title',
          defaultMessage: settings.title,
        })}
        //collapsed={collapsed}
        //onCollapse={e => load1 ? setLoad1(false) : setCollapsed(e)}
        openKeys={false}
        //menuProps={{openKeys: openKeys, onOpenChange: setOpenKeys}}
        menu={{ locale: true }}
        //menuData={MenuDataItems}
        menuDataRender={() => menuDataRender(menuData)}
        menuItemRender={(item, dom) => {
          if (item.isUrl || item.children || !item.path) {
            return dom;
          }
          return <Link to={item.path}>{dom}</Link>;
        }}
        //subMenuItemRender={(_, dom) => {
        //  return dom;
        //}}
        //onMenuHeaderClick={() => history.push('/')}
        //breadcrumbRender={(routers = []) => [
        //  {
        //    path: '/',
        //    breadcrumbName: i18n().formatMessage({ id: 'menu.home' }),
        //  },
        //  ...routers,
        //]}
        //itemRender={(route, params, routes, paths) => {
        //  const first = routes.indexOf(route) === 0;
        //  return first ? (
        //    <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        //  ) : (
        //    <span>{route.breadcrumbName}</span>
        //  );
        //}}
        // children={<PageHeaderWrapper content={props.children} />}
        children={<>{props.children}</>}
        rightContentRender={() => (
          <GlobalHeaderRight
            theme={settings.navTheme}
            layout={settings.layout}
          />
        )}
        footerRender={() => <Footer />}
        disableContentMargin={true}
        //pure={false}
        //{...props}
        //{...settings}
      />
      <SettingDrawer settings={settings} onSettingChange={setSettings} />
    </div>
  );
};

export default Layout;
