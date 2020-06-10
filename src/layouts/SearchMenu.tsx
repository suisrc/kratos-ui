import React from 'react';
import { Input } from 'antd';
import { MenuDataItem } from '@ant-design/pro-layout';

import { filterThreeData } from '@/utils/utils';

/**
 * 依据keyworkd过滤
 * @param data
 * @param keyWord
 */
export const filterByMenuDate = (
  data: MenuDataItem[],
  keyword: string,
): MenuDataItem[] =>
  !keyword?.length
    ? data
    : (filterThreeData(
        data,
        item => item?.name?.includes(keyword) || item?.children?.length,
      ) as MenuDataItem[]);
//export const filterByMenuDate = (
//  data: MenuDataItem[],
//  keyword: string,
//): MenuDataItem[] => !keyword?.length ? data :
//  data.map(item => {
//    console.log(item)
//    let children = undefined;
//    if (item.name?.includes(keyword)
//    || (children = filterByMenuDate(item.children || [], keyword)).length > 0) {
//      // 递归初始化children
//      children = children || filterByMenuDate(item.children || [], keyword);
//      //return children.length == 0 ? item : { ...item,  children: children };
//      return { ...item, children: children };
//    }
//    return undefined;
//  }).filter(item => !!item) as MenuDataItem[];

const SearchMenu: React.FC<{
  setKeyword: (value: string) => void;
  [key: string]: any;
}> = ({ logo, title, collapsed, setKeyword, ...props }) => {
  return (
    <Input.Search
      style={{
        width: collapsed ? 0 : '100%',
        transition: collapsed ? undefined : 'all 0.3s',
        opacity: collapsed ? 0 : 1,
      }}
      onSearch={setKeyword}
    />
  );
};

export default SearchMenu;
