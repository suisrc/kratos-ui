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

export function postRemoveGatewayApis(ids: string[]) {
  return request(`/api/v1/system/gateway/remove`, {
    method: 'delete',
    data: ids,
  });
}

//const { run: removeRowsByIds } = useRequest((ids: string[]) => ({
//  url: '/api/v1/system/gateway/delete',
//  method: 'delete',
//  data: ids,
//}), {
//  manual: true,
//});

//===============================================================================================
// 系统中处理queryTableList外所有的操作动作, 这里主要通过columns.tsx和components中的内容作用使用
// columns.tsx 页面的table和search的内容描述
// service.ts  页面中除拉取操作外的所有操作动作（queryTableList，拉去数据的请求)
// data.d.ts   定义数据类型
//
export function createActions(i18n: IntlShape, ref: any) {
  const { run: removeRowsByIds } = useRequest(
    (ids: string[]) => postRemoveGatewayApis(ids),
    {
      manual: true,
      onSuccess: _ => ref?.actionRef?.current?.reload(),
    },
  );
  return {
    newRow: () => history.push('/system/gateway/edit?id='),
    editRow: (item: QueryTableItem) =>
      history.push(`/system/gateway/edit?id=${item.id}`),
    removeRow: (item: QueryTableItem) => removeRowsByIds([item.id]),
    removeRows: (items: QueryTableItem[]) =>
      removeRowsByIds(items.map(item => item.id)),
  };
}
