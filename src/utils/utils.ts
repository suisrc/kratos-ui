import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import { MenuDataItem } from '@ant-design/pro-layout';

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
  result?: API.ObjectMap<MenuDataItem>,
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
