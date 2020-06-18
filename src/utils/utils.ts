import { parse, stringify } from 'querystring';
import pathRegexp from 'path-to-regexp';
import { MenuDataItem } from '@ant-design/pro-layout';
import { history, IRoute } from 'umi';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

export const isBrowser = () =>
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  !isNode;

/**
 * 构建菜单的MAP， 如果没有key， 内容会被忽略
 * @param menuData
 * @param pre
 */
export const initKeysFromMenuData = (
  menuData?: MenuDataItem[],
  result?: Record<string, MenuDataItem>,
  parents?: string[],
) => {
  if (!menuData) {
    return {};
  }
  const res = result || {};
  menuData.map(item => {
    let current = [...(parents || [])];
    if (item.key) {
      // 增加菜单到MAP中
      res[item.key] = item;
      if (parents && !item.parentKeys) {
        item.parentKeys = parents;
      }
      //console.log(item.parentKeys);
      current.push(item.key);
    }
    if (item.children) {
      initKeysFromMenuData(item.children, res, current);
    }
  });
  return res;
};

/**
 * 调整登录页
 */
export const gotoSigninPage = () => {
  if (window.location.pathname === '/auth/signin') {
    return;
  }
  // console.log(window.location.pathname);
  const { redirect } = getPageQuery();
  if (redirect || window.location.pathname === '/') {
    // 已经包含了重定向，或者是跟目录，不在执行重定向
    history.replace({ pathname: '/auth/signin' });
  } else {
    history.replace({
      pathname: '/auth/signin',
      //search: stringify({ redirect: window.location.href }),
      search: stringify({ redirect: window.location.pathname }),
    });
  }
};

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
export const replaceGoto = () => {
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();
  let { redirect } = params as { redirect: string };
  if (redirect) {
    if (redirect.startsWith('/')) {
      redirect =
        window.location.protocol + '//' + window.location.host + redirect;
    }
    //console.log(redirect);
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#') + 1);
      }
    } else {
      window.location.href = '/welcome';
      return;
    }
  }
  history.replace(redirect || '/welcome');
};

/**
 * 获取重定向地址
 */
export const getRedirectPage = (): string => {
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();
  let { redirect } = params as { redirect: string };
  return redirect;
};

/**
 * 过滤节点上的数据
 * @param data
 * @param filter
 */
export const filterThreeData = (
  data: { children?: any }[],
  filter: (item: any) => boolean,
): any[] =>
  data
    .map(item => {
      if (!item.children?.length) {
        // 叶子节点,直接返回
        return item;
      }
      // 父节点, 如果没有叶子节点,也会被移除
      let children = filterThreeData(item.children || [], filter);
      return !children.length ? undefined : { ...item, children: children };
    })
    .filter(item => !!item && filter(item));

/**
 * 获取匹配的路由, 主要用于上层节点预判匹配的路由节点
 * @param path
 * @param routeData
 */
export const getPrejudgeRoute = (
  path: string,
  routeData: IRoute[],
): IRoute | undefined => {
  let result: IRoute | undefined = undefined;
  routeData.find(route => {
    // match prefix
    // console.log(`${route.path}->${path}`);
    if (
      route.path === '/' ||
      pathRegexp(`${route.path}/(.*)`).test(`${path}/`)
    ) {
      if (route.routes) {
        result = getPrejudgeRoute(path, route.routes);
      }
      if (!result && route.path === path) {
        result = route;
      }
    }
  });
  return result;
};
