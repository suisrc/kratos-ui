import React, { useState, useRef } from 'react';

import ProLayout, {
  MenuDataItem,
  //Settings,
  //PageHeaderWrapper,
} from '@ant-design/pro-layout';

import { useIntl, IRouteComponentProps, NavLink, useModel } from 'umi';
import { stringify } from 'qs';
//import useMergeValue from 'use-merge-value'

import LogoIcon from '@/assets/LogoIcon';
import GlobalHeaderRight from '@/components/GlobalHeader/RightContent';
import Footer from '@/components/Footer';
import SettingDrawer from '@/components/SettingDrawer';

import { fixIcon } from '@/components/IconFont';
import SearchMenu, { filterByMenuDate } from './SearchMenu';

import defaultSettings, {
  DefaultSettings,
  UsedUrlParams,
} from '../../config/defaultSettings';
import './layouts.less';

/**
 * 修复选中后,菜单展开的问题
 *
 * @param menus
 * @param keys
 */
const fixOpenKeysByMenuData = (
  keys: string[],
  menus?: API.ObjectMap<MenuDataItem>,
): string[] => {
  if (!menus || !keys || keys.length !== 1) {
    return keys ? keys : [];
  }
  let item: MenuDataItem = menus[keys[0]];
  if (!item || item.children?.length != 0) {
    return keys;
  }
  //console.log(item);
  if (!item.parentKeys) {
    item.parentKeys = ((item?.pro_layout_parentKeys
      ? item.pro_layout_parentKeys
      : []) as string[]).reduce<string[]>((pre, cur) => {
      cur.startsWith('/') ? pre.push(cur.substr(1)) : pre.push(cur);
      return pre;
    }, [] as string[]);
  }
  return item.parentKeys;
};

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    let localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };
    return localItem;
  });

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
const getDifferentSettingPath = (state: Partial<DefaultSettings>) => {
  const stateObj: Partial<DefaultSettings> = {};
  Object.keys(state).forEach(key => {
    if (UsedUrlParams.indexOf(key) < 0) {
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
  const settings: DefaultSettings =
    initialState?.defaultSettings || defaultSettings;
  const setSettings: (settings: any) => void = settings =>
    setInitialState({ ...initialState, defaultSettings: settings });

  const uriParams = getDifferentSettingPath({ ...settings });
  // const [uriParams, setUriParams] = useState<string>(); // => SettingDrawer.onDiffUriParams

  const [keyWord, setKeyWord] = useState('');
  // 可以每次都重新计算,但是这里图方面,使用缓存
  // 应用中存在 pro_layout_parentKeys, 可以使用该内容代替parentKeys
  // const menuMap = initialState?.defaultMenuMap || {};
  const menuMap = useRef<API.ObjectMap<MenuDataItem>>({});
  // 菜单数据
  const [menuData, setMenuData] = useState<MenuDataItem[]>([
    ...(initialState?.defaultMenus || []),
  ]);

  // 默认展开的内容
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  //const openKeys = useRef<string[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);

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
          setOpenKeys(fixOpenKeysByMenuData(data || [], menuMap.current));
          //console.log(data);
        }}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        //menu={{ locale: true }}
        formatMessage={msg => i18n.formatMessage(msg)}
        // menuData={menuData}
        menuDataRender={menus => menuData}
        // path => itemPath, parentKeys => pro_layout_parentKeys
        menuItemRender={(item, dom) => {
          if (typeof item.key === 'string') menuMap.current[item.key] = item;
          return !item.itemPath
            ? fixIcon(item, dom)
            : fixIcon(
                item,
                <NavLink to={getPath(item.itemPath, uriParams)}>{dom}</NavLink>,
              );
        }}
        subMenuItemRender={(item, dom) => fixIcon(item, dom)}
        focusable={true}
        forceSubMenuRender={true}
        children={props.children}
        rightContentRender={() => (
          <GlobalHeaderRight
            theme={settings.navTheme}
            layout={settings.layout}
          />
        )}
        footerRender={() => <Footer />}
        menuHeaderRender={(logo, title, props) => (
          <>
            <NavLink to="/" replace={true}>
              {logo}
              {title}
            </NavLink>
            {settings.searchMenu && settings.layout === 'sidemenu' && (
              <SearchMenu {...{ setKeyWord: setKeyWord }} />
            )}
          </>
        )}
        postMenuData={menus => filterByMenuDate(menus || [], keyWord)}
        disableContentMargin={true}
        route={{
          routes: [],
        }}
        //pure={false}
        //{...props}
        //{...settings}
      />
      {!collapsed && (
        <SettingDrawer settings={settings} onSettingChange={setSettings} />
      )}
    </div>
  );
};

export default Layout;

// const fixOpenKeysByMenuData = (
//   menuMap: API.ObjectMap<MenuDataItem>,
//   keys: string[],
// ) => {
//   if (!keys || keys.length !== 1) {
//     return keys;
//   }
//   // 当keys的lenght=1时候,会发生勾选叶子节点,二无法正确展开的问题
//   let res = {};
//   return Object.keys(res);
// };

// const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => // menuList;
//  menuList.map((item) => {
//    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
//    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
//});
