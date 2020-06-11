import React, { useState, useRef, useCallback } from 'react';

import ProLayout, {
  MenuDataItem,
  BasicLayoutProps,
  //Settings,
  //PageHeaderWrapper,
} from '@ant-design/pro-layout';

import {
  useIntl,
  IRouteComponentProps,
  NavLink,
  useModel,
  useRouteMatch,
  IRoute,
} from 'umi';
import { stringify } from 'qs';
//import useMergeValue from 'use-merge-value'

import LogoIcon from '@/assets/LogoIcon';
import GlobalHeaderRight from '@/components/GlobalHeader/RightContent';
import Footer from '@/components/Footer';
import SettingDrawer from '@/components/SettingDrawer';
import { fixIcon } from '@/components/IconFont';
import { filterThreeData, getPrejudgeRoute } from '@/utils/utils';
import Error403 from '@/exceptions/403';

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
  menus?: Map<string, any>,
): string[] => {
  if (!menus || !keys || keys.length > 1) {
    return keys ? keys : [];
  }
  let item: MenuDataItem = menus.get(keys[0]);
  if (!item || item.children?.length) {
    return keys;
  }
  // console.log(keys);
  // console.log(item);
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

//const filterAccessByMenuDate = (
//  data: MenuDataItem[],
//  filter: (item: MenuDataItem) => boolean,
//): MenuDataItem[] =>
//  filterThreeData(
//    data,
//    filter
//  ) as MenuDataItem[];

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

const Layout = (
  props: IRouteComponentProps /*IRouteComponentProps BasicLayoutProps*/,
) => {
  const i18n = useIntl();

  //const { initialState, setInitialState } = useModel('@@initialState');
  const { menus, setMenus, settings, setSettings } = useModel('AuthUser');
  //const [settings, setSettings] = useState<any>({ ...initialState?.settings });

  const uriParams = settings.menuDrawer
    ? getDifferentSettingPath({ ...settings })
    : undefined;
  //当前系统会出现一个问题,当重新登陆后,系统会在URL上没有风格参数
  //当时暂时不适合在这里解决,这个参数主要是给菜单,以保障在跳转后,保留风格参数
  //if (uriParams) {
  //  history.replace(getPath(props.location.pathname, uriParams)
  //}

  // const [uriParams, setUriParams] = useState<string>(); // => SettingDrawer.onDiffUriParams
  const [keyword, setKeyword] = useState('');

  // 主要给openKey使用
  const menuMap = useRef(new Map<string, any>());
  // 默认展开的内容 & 缓存
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  //const openKeys = useRef<string[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // 配置路由权限 & 缓存
  const routeAcc = useCallback(() => {
    const routeMap = useRef(new Map<string, any>());
    let key = props.location.pathname;
    let proute = props.route;
    let route = routeMap.current.get(key);
    if (!route) {
      let croute = getPrejudgeRoute(key, [proute as IRoute]);
      routeMap.current.set(
        key,
        (route = { unaccessible: croute?.unaccessible || false }),
      );
    }
    //console.log(routeMap);
    return route.unaccessible;
  }, [props.location.pathname, props.route]);
  const unaccessible = settings.menuAccess && routeAcc();

  //console.log(routeMap.current);
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
        formatMessage={msg =>
          msg.id ? i18n.formatMessage(msg) : msg.defaultMessage || ''
        }
        // menuData={menuData}
        // route={[]}
        menuDataRender={old => menus}
        // path => itemPath, parentKeys => pro_layout_parentKeys
        menuItemRender={(item, dom) => {
          if (typeof item.key === 'string')
            menuMap.current.set(item.key, {
              path: item.path,
              parentKeys: item.parentKeys,
              pro_layout_parentKeys: item.pro_layout_parentKeys,
            });
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
            {settings.menuSearch &&
              !collapsed &&
              settings.layout === 'sidemenu' && (
                <SearchMenu setKeyword={setKeyword} />
              )}
          </>
        )}
        postMenuData={old => filterByMenuDate(old || [], keyword)}
        disableContentMargin={true}
        children={unaccessible ? <Error403 /> : props.children}
        //pure={false}
        //{...props}
        //{...settings}
      />
      {settings.menuDrawer && !collapsed && (
        <SettingDrawer
          settings={settings}
          onSettingChange={value => setSettings({ ...settings, ...value })}
        />
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
