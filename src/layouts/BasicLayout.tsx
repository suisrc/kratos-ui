import React, { useState } from 'react';

import ProLayout, {
  MenuDataItem,
  Settings,
  //PageHeaderWrapper,
} from '@ant-design/pro-layout';

import { useIntl, IRouteComponentProps, NavLink, useModel } from 'umi';
import { stringify } from 'qs';
//import useMergeValue from 'use-merge-value'

import LogoIcon from '@/assets/LogoIcon';
import GlobalHeaderRight from '@/components/GlobalHeader/RightContent';
import Footer from '@/components/Footer';
import SettingDrawer from '@/components/SettingDrawer';

import fixIcon from './FixIcon';
//import SearchMenu, { filterByMenuDate } from './SearchMenu';

import defaultSettings from '../../config/defaultSettings';
import './layouts.less';

/**
 * 修复选中后,菜单展开的问题
 *
 * @param menus
 * @param keys
 */
const fixOpenKeysByMenuData = (
  menus: API.ObjectMap<MenuDataItem>,
  keys: string[],
): string[] => {
  if (!menus || !keys || keys.length !== 1) {
    return keys ? keys : [];
  }
  let item: MenuDataItem = menus[keys[0]];
  if (item?.children) {
    return keys;
  }
  return item?.parentKeys ? item.parentKeys : [];
};

/**
 * 修正UrlPath内容
 * @param path
 * @param param
 */
const getPath = (path: string, param?: string) => {
  if (!param) {
    return path;
  }
  return path + (path.indexOf('?') < 0 ? '?' : '&') + param;
};

/**
 * 获取主题风格的URL地址
 * @param state
 */
const getDifferentSettingPath = (state: Partial<Settings>) => {
  const stateObj: Partial<Settings> = {};
  Object.keys(state).forEach(key => {
    if (
      [
        'navTheme',
        'layout',
        'contentWidth',
        'fixedHeader',
        'fixSiderbar',
        'primaryColor',
        'colorWeak',
      ].indexOf(key) < 0
    ) {
      return;
    }
    if (state[key] !== defaultSettings[key]) {
      stateObj[key] = state[key];
    }
  });
  delete stateObj.menu;
  delete stateObj.title;
  delete stateObj.iconfontUrl;

  if (Object.keys(stateObj).length < 1) {
    return undefined;
  }
  return stringify(stateObj);
};

const Layout = (props: IRouteComponentProps) => {
  const i18n = useIntl();

  const { initialState, setInitialState } = useModel('@@initialState');
  //const [settings, setSettings] = useState<any>({ ...initialState?.settings });
  // 全局风格配置
  const settings: Settings = initialState?.defaultSettings || defaultSettings;
  const setSettings: (settings: any) => void = settings =>
    setInitialState({ ...initialState, defaultSettings: settings });

  const uriParams = getDifferentSettingPath({ ...settings });
  // const [uriParams, setUriParams] = useState<string>(); // => SettingDrawer.onDiffUriParams

  // const [keyWord, setKeyWord] = useState('');
  // 可以每次都重新计算,但是这里图方面,使用缓存
  // 菜单数据
  const menuMap = initialState?.defaultMenuMap || {};
  const [menuData, setMenuData] = useState<MenuDataItem[]>([
    ...(initialState?.defaultMenus || []),
  ]);
  // 默认展开的内容
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  //const openKeys = useRef<string[]>([]);
  //const firstRender = useRef<boolean>(true);
  return (
    <div>
      <ProLayout
        {...settings}
        // location={{pathname: '/welcom'}}
        logo={<LogoIcon style={{ width: '54px', padding: '10px 0px' }} />}
        title={i18n.formatMessage({
          id: 'app.layout.basic.title',
          defaultMessage: settings.title,
        })}
        openKeys={openKeys}
        onOpenChange={data => {
          setOpenKeys(fixOpenKeysByMenuData(menuMap, data as string[]));
          //console.log(data);
        }}
        //menu={{ locale: true }}
        formatMessage={msg => i18n.formatMessage(msg)}
        //menuData={menuData}
        menuDataRender={() => menuData}
        menuItemRender={(item, dom) =>
          item.isUrl || item.children || !item.path
            ? fixIcon(item, dom)
            : fixIcon(
                item,
                <NavLink to={getPath(item.path, uriParams)}>{dom}</NavLink>,
              )
        }
        subMenuItemRender={(item, dom) => fixIcon(item, dom)}
        children={props.children}
        rightContentRender={() => (
          <GlobalHeaderRight
            theme={settings.navTheme}
            layout={settings.layout}
          />
        )}
        footerRender={() => <Footer />}
        disableContentMargin={true}
        //menuHeaderRender={(logo, title, props = { collapsed: false }) =>
        //  <SearchMenu {...{logo: logo, title: title, collapsed: props.collapsed, setKeyWord: setKeyWord}}/>
        //}
        //postMenuData={menus => filterByMenuDate(menus || [], keyWord)}
        //pure={false}
        //{...props}
        //{...settings}
      />
      <SettingDrawer settings={settings} onSettingChange={setSettings} />
    </div>
  );
};

export default Layout;
