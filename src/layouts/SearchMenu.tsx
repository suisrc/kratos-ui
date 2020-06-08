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
  logo: React.ReactNode;
  title: React.ReactNode;
  collapsed: boolean | undefined;
  setKeyWord: (value: string) => void;
  [key: string]: any;
}> = ({ logo, title, collapsed, setKeyWord, ...props }) => {
  return (
    <>
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'center',
        }}
      >
        {logo}
        {title}
      </div>
      <Input.Search
        style={{
          width: props.collapsed ? 0 : '100%',
          transition: props.collapsed ? undefined : 'all 0.3s',
          opacity: props.collapsed ? 0 : 1,
        }}
        onSearch={setKeyWord}
      />
    </>
  );
};

export default SearchMenu;
