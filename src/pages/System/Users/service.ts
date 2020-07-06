// 数据请求
import request, { addSortParams, fixPageParams } from '@/utils/request';
import { stringify2 } from '@/utils/qs2';
import { IntlShape, useRequest, history } from 'umi';

// import { BaseResult } from '@ahooksjs/use-request/es/types';
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
  return request(`/api/v1/system/users/list${stringify2(params)}`);
}

export async function postRemoveTableItem(ids: string[]) {
  return request(`/api/v1/system/users/remove`, {
    method: 'delete',
    data: ids,
  });
}

export async function queryTableItem(id: string) {
  return request(`/api/v1/system/users/item?id=${id}`);
}

export async function postEditTableItem(item: QueryTableItem) {
  return request(`/api/v1/system/users/item`, {
    method: 'put',
    data: item,
  });
}

export async function postNewTableItem(item: QueryTableItem) {
  return request(`/api/v1/system/users/item`, {
    method: 'post',
    data: item,
  });
}

export async function queryRuleDataSources() {
  return request('/api/v1/system/users/rule/sources');
}
export async function queryGatewayDataSources() {
  return request('/api/v1/system/users/gateway/sources');
}

export async function postNewUserTags(tags: string[], ids: string[]) {
  return request(`/api/v1/system/users/tags`, {
    method: 'post',
    data: { ids, tags },
  });
}
