import React, { useState, useRef, useCallback, useEffect } from 'react';

import ProLayout, { PageContainer } from '@ant-design/pro-layout';

import { useIntl, IRouteComponentProps, NavLink, useModel, IRoute } from 'umi';
import { Space, Divider } from 'antd';
import { stringify } from 'qs';
//import useMergeValue from 'use-merge-value'

import { SettingDrawer } from '@ant-design/pro-layout';
// import SettingDrawer from '@/components/SettingDrawer';

import LogoIcon from '@/assets/LogoIcon';
import GlobalHeaderRight from '@/components/GlobalHeader/RightContent';
import Footer from '@/components/Footer';
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
  props: IRouteComponentProps & {
    onClickLogo: (e: any) => void;
  } /*IRouteComponentProps BasicLayoutProps*/,
) => {
  const i18n = useIntl();

  const { onClickLogo } = props;
  const titleToUrl = '/';

  //const { initialState, setInitialState } = useModel('@@initialState');
  const { menus, settings, setSettings } = useModel('useAuthUser');

  const uriParams = settings.menuDrawer
    ? getDifferentSettingPath({ ...settings })
    : undefined;
  //当前系统会出现一个问题,当重新登陆后,系统会在URL上没有主题参数
  //暂时不适合在这里解决,这个参数主要是给菜单,以保障在跳转后,保留主题参数
  //if (uriParams) {
  //  history.replace(getPath(props.location.pathname, uriParams);
  //}

  const [keyword, setKeyword] = useState(''); // 菜单搜索
  const [collapsed, setCollapsed] = useState<boolean>(false); // 是否折叠菜单
  //const [openKeys, setOpenKeys] = useState<string[]>([]); // 已经打开的菜单
  //const [selected, setSelected] = useState<string[]>([]); // 已经选中的菜单
  //
  //useEffect(() => {
  //  // 处理首次打开页面的时候,已经打开的菜单和已经选中的菜单
  //  let path = props.location.pathname;
  //  let inms: any[] = findFirstNodeByTree(menus, item => item?.path === path);
  //  if (inms?.length > 1) {
  //    setOpenKeys(
  //      inms
  //        .slice(1)
  //        .reverse()
  //        .map(v => v.key),
  //    );
  //  }
  //  if (inms?.length) {
  //    setSelected([inms[0].key]);
  //  }
  //  //console.log(inms);
  //}, []);

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
        logo={<LogoIcon style={{ width: '32px' }} />}
        title={settings.title}
        //style={{zIndex: 100}}
        contentStyle={{ zIndex: 3 }}
        //menu={{ locale: true }}
        siderWidth={200}
        //collapsedWidth={48}
        fixSiderbar
        formatMessage={msg =>
          msg.id ? i18n.formatMessage(msg) : msg.defaultMessage || ''
        }
        collapsed={collapsed}
        onCollapse={setCollapsed}
        //menuProps={{
        //  openKeys: openKeys,
        //  onOpenChange: keys => setOpenKeys(keys as string[]),
        //  selectedKeys: selected,
        //  onSelect: param => setSelected(param.selectedKeys as string[]),
        //}}
        menuDataRender={_ => menus}
        menuItemRender={(item, dom) =>
          !item.itemPath ? (
            fixIcon(item, dom)
          ) : (
            <NavLink to={getPath(item.itemPath, uriParams)}>
              {fixIcon(item, dom)}
            </NavLink>
          )
        }
        subMenuItemRender={(item, dom) => fixIcon(item, dom)}
        //focusable={true}
        //forceSubMenuRender={true}
        rightContentRender={() => (
          <GlobalHeaderRight
            theme={settings.navTheme}
            layout={settings.layout}
          />
        )}
        // links={["1234"]}
        footerRender={() => <Footer />}
        menuHeaderRender={(logo, title) => (
          <div>
            <a onClick={onClickLogo}>{logo}</a>
            <Divider type={'vertical'} />
            <NavLink to={titleToUrl}>{title}</NavLink>
          </div>
        )}
        menuExtraRender={({ collapsed }) =>
          settings.menuSearch &&
          !collapsed &&
          settings.layout === 'side' && <SearchMenu setKeyword={setKeyword} />
        }
        postMenuData={old =>
          !settings.menuSearch || !!collapsed
            ? old || []
            : filterByMenuDate(old || [], keyword)
        }
        disableContentMargin={true}
        // breadcrumbRender={(route)=>route}
        //children={
        //  unaccessible ? (
        //    <Error403 />
        //  ) : (
        //      <PageContainer children={props.children} />
        //    )
        //}
        children={
          unaccessible ? (
            <Error403 />
          ) : (
            <div style={{ zIndex: 1 }}>{props.children}</div>
          )
        }
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
