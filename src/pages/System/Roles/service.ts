// 数据请求
import request, { addSortParams, fixPageParams } from '@/utils/request';
import { stringify2 } from '@/utils/qs2';

import { QueryParams, QuerySort, QueryFilter, QueryTableItem } from './data';

export async function queryTableList(
  params: QueryParams,
  sort?: QuerySort,
  fitler?: QueryFilter,
) {
  // search中的内容
  fixPageParams(params);
  addSortParams(params, sort, 'sort');
  // params = {...fitler, ...params}; // 合并过滤器中的内容
  return request(`/api/v1/system/roles/list${stringify2(params)}`);
}

export async function postRemoveTableItem(ids: string[]) {
  return request(`/api/v1/system/roles/remove`, {
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

export async function queryTableItem(id: string) {
  return request(`/api/v1/system/roles/item?id=${id}`);
}

export async function postEditTableItem(item: QueryTableItem) {
  return request(`/api/v1/system/roles/item`, {
    method: 'put',
    data: item,
  });
}

export async function postNewTableItem(item: QueryTableItem) {
  return request(`/api/v1/system/roles/item`, {
    method: 'post',
    data: item,
  });
}

export async function queryGatewayDataSources() {
  return request('/api/v1/system/roles/gateway/sources');
}
