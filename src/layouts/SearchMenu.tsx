import React from 'react';
import { Input } from 'antd';
import { MenuDataItem } from '@ant-design/pro-layout';

/**
 * 依据keyworkd过滤
 * @param data
 * @param keyWord
 */
export const filterByMenuDate = (
  data: MenuDataItem[],
  keyWord: string,
): MenuDataItem[] =>
  data
    .map(item => {
      if (
        (item.name && item.name.includes(keyWord)) ||
        filterByMenuDate(item.children || [], keyWord).length > 0
      ) {
        return {
          ...item,
          children: filterByMenuDate(item.children || [], keyWord),
        };
      }

      return undefined;
    })
    .filter(item => item) as MenuDataItem[];

const SearchMenu: React.FC<{
  setKeyWord: (value: string) => void;
  [key: string]: any;
}> = ({ logo, title, collapsed, setKeyWord, ...props }) => {
  return (
    <Input.Search
      style={{
        width: collapsed ? 0 : '100%',
        transition: collapsed ? undefined : 'all 0.3s',
        opacity: collapsed ? 0 : 1,
      }}
      onSearch={setKeyWord}
    />
  );
};

export default SearchMenu;
