import React from 'react';

import Icon, { createFromIconfontCN } from '@ant-design/icons';
import { MenuDataItem } from '@ant-design/pro-layout';
import { isUrl } from '@/utils/utils';
import defaultSettings from '../../config/defaultSettings';
import './layouts.less';

const IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
});
// Allow menu icon as string or ReactNode
//   icon: 'setting',
//   icon: <Icon type="setting" />,
const getIcon = (icon?: string /*| React.ReactNode*/): React.ReactNode => {
  if (typeof icon === 'string' && icon !== '') {
    if (icon.startsWith('icon')) {
      return <IconFont type={icon} />;
    }
    if (isUrl(icon)) {
      return (
        <Icon
          component={() => (
            <img src={icon} alt="icon" className="ant-pro-sider-menu-icon" />
          )}
        />
      );
    }
  }
  return undefined;
};

/**
 *
 * @param item 修复节点图标
 * @param dom
 */
export default (item: MenuDataItem, dom: React.ReactNode): React.ReactNode => {
  return item.icon1 ? (
    <span>
      {getIcon(item.icon1)}
      <span>{dom}</span>
    </span>
  ) : (
    dom
  );
};

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
