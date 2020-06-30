import React, { useState, useRef, useCallback, useEffect } from 'react';

import ProLayout, {
  MenuDataItem,
  BasicLayoutProps,
  //SettingDrawer,
  //Settings,
  //PageHeaderWrapper,
} from '@ant-design/pro-layout';

import { useIntl, IRouteComponentProps, NavLink, useModel, IRoute } from 'umi';
import { stringify } from 'qs';
//import useMergeValue from 'use-merge-value'

import LogoIcon from '@/assets/LogoIcon';
import GlobalHeaderRight from '@/components/GlobalHeader/RightContent';
import Footer from '@/components/Footer';
import SettingDrawer from '@/components/SettingDrawer';
import { fixIcon } from '@/components/IconFont';
import { findFirstNodeByTree, getPrejudgeRoute } from '@/utils/utils';
import Error403 from '@/exceptions/403';

import SearchMenu, { filterByMenuDate } from './SearchMenu';

import defaultSettings, {
  DefaultSettings,
  UsedUrlParams,
} from '../../config/defaultSettings';

import './layouts.less';

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
  const { menus, settings, setSettings } = useModel('useAuthUser');

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
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    let path = props.location.pathname;
    let inms: any[] = findFirstNodeByTree(menus, item => item?.path === path);
    if (inms?.length > 1) {
      setOpenKeys(
        inms
          .slice(1)
          .reverse()
          .map(v => v.key),
      );
    }
    if (inms?.length) {
      setSelected([inms[0].key]);
    }
    //console.log(inms);
  }, []);

  // 配置路由权限 & 缓存
  const routeAcc = useCallback(() => {
    const routes = useRef(new Map<string, any>());
    let key = props.location.pathname;
    let proute = props.route;
    let route = routes.current.get(key);
    if (!route) {
      let croute = getPrejudgeRoute(key, [proute as IRoute]);
      routes.current.set(
        key,
        (route = { unaccessible: croute?.unaccessible || false }),
      );
    }
    //console.log(routes);
    return route.unaccessible;
  }, [props.location.pathname, props.route]);
  const unaccessible = settings.menuAccess && routeAcc();

  //console.log(menus);
  return (
    <div>
      <ProLayout
        {...settings}
        // location={{pathname: '/welcom'}}
        logo={<LogoIcon style={{ width: '54px', padding: '10px 0px' }} />}
        title={settings.title}
        //menu={{ locale: true }}
        formatMessage={msg =>
          msg.id ? i18n.formatMessage(msg) : msg.defaultMessage || ''
        }
        collapsed={collapsed}
        onCollapse={setCollapsed}
        menuProps={{
          openKeys: openKeys,
          onOpenChange: setOpenKeys,
          selectedKeys: selected,
          onSelect: param => setSelected(param.selectedKeys),
        }}
        menuDataRender={_ => menus}
        menuItemRender={(item, dom) =>
          fixIcon(
            item,
            !item.itemPath ? (
              dom
            ) : (
              <NavLink to={getPath(item.itemPath, uriParams)}>{dom}</NavLink>
            ),
          )
        }
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
        menuHeaderRender={(logo, title) => (
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
//   menuMap:  Record<string, MenuDataItem>,
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

//const filterAccessByMenuDate = (
//  data: MenuDataItem[],
//  filter: (item: MenuDataItem) => boolean,
//): MenuDataItem[] =>
//  filterThreeData(
//    data,
//    filter
//  ) as MenuDataItem[];

//const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
//  menuList.map(item => {
//    let localItem = {
//      ...item,
//      children: item.children ? menuDataRender(item.children) : [],
//    };
//    return localItem;
//  });
