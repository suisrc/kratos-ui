// 数据请求
import request, { addSortParams, fixPageParams } from '@/utils/request';
import { stringify2 } from '@/utils/qs2';
import { IntlShape, useRequest, history } from 'umi';

import { QueryParams, QuerySort, QueryFilter, QueryTableItem } from './data';

export function queryTableList(
  params: QueryParams,
  sort?: QuerySort,
  fitler?: QueryFilter,
) {
  // search中的内容
  fixPageParams(params);
  addSortParams(params, sort, 'sort');
  // params = {...fitler, ...params}; // 合并过滤器中的内容
  return request(`/api/v1/system/gateway/list${stringify2(params)}`);
}

export function postDeleteGatewayApis(ids: string[]) {
  return request(`/api/v1/system/gateway/delete`, {
    method: 'delete',
    data: ids,
  });
}

//===============================================================================================
// 系统中处理queryTableList外所有的操作动作, 这里主要通过columns.tsx和components中的内容作用使用
//
export function createActions(i18n: IntlShape, ref: any) {
  const { run: deleteRowsByIds } = useRequest(
    (ids: string[]) => postDeleteGatewayApis(ids),
    {
      manual: true,
      onSuccess: () => {
        ref?.actionRef?.current?.reload();
      },
    },
  );
  return {
    newRow: () => history.push('/system/gateway/edit?id='),
    editRow: (item: QueryTableItem) =>
      history.push(`/system/gateway/edit?id=${item.id}`),
    removeRow: (item: QueryTableItem) => deleteRowsByIds([item.id]),
    removeRows: (items: QueryTableItem[]) =>
      deleteRowsByIds(items.map(item => item.id)),
  };
}
