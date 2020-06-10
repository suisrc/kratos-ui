import React from 'react';

import Icon, { createFromIconfontCN } from '@ant-design/icons';
import { MenuDataItem } from '@ant-design/pro-layout';
import { isUrl } from '@/utils/utils';
import defaultSettings from '../../config/defaultSettings';

export const IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
});

// Allow menu icon as string or ReactNode
//   icon: 'setting',
//   icon: <Icon type="setting" />,
export const getIcon = (
  icon?: string /*| React.ReactNode*/,
  className?: any,
): React.ReactNode => {
  if (typeof icon === 'string' && icon !== '') {
    if (icon.startsWith('icon')) {
      return <IconFont type={icon} className={className} />;
    }
    if (isUrl(icon)) {
      return (
        <Icon
          component={() => <img src={icon} alt="icon" className={className} />}
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
export const fixIcon = (
  item: MenuDataItem,
  dom: React.ReactNode,
): React.ReactNode => {
  return item.icon1 ? (
    <span>
      {getIcon(item.icon1, 'ant-pro-sider-menu-icon')}
      <span>{dom}</span>
    </span>
  ) : (
    dom
  );
};
