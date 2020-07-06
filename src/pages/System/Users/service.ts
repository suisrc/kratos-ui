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

//===============================================================================================
// 系统中处理queryTableList外所有的操作动作, 这里主要通过columns.tsx和components中的内容作用使用
// columns.tsx 页面的table和search的内容描述
// service.ts  页面中除拉取操作外的所有操作动作（queryTableList，拉去数据的请求)
// data.d.ts   定义数据类型
//
export function createViewService(i18n: IntlShape, ref: any) {
  const { run: removeRowsByIds } = useRequest(
    (ids: string[]) => postRemoveTableItem(ids),
    {
      manual: true,
      onSuccess: _ => ref?.actionRef?.current?.reloadAndRest(),
    },
  );
  const { run: newTags, loading: newTagsLoading } = useRequest(
    postNewUserTags,
    {
      manual: true,
      onSuccess: _ => {
        ref?.actionRef?.current?.reloadAndRest();
        ref?.setEditFormShow(false);
      },
    },
  );
  return {
    loading: { newTags: newTagsLoading },
    newTags,
    newRow: () => {
      history.push('/system/users/edit?id=');
    },
    editRow: (item: QueryTableItem) => {
      history.push(`/system/users/edit?id=${item.id}`);
    },
    removeRow: (item: QueryTableItem) => {
      removeRowsByIds([item.id as string]);
    },
    removeRows: (items: QueryTableItem[]) => {
      removeRowsByIds(items.map(item => item.id as string));
    },
    gotoRole: (key: string) => {
      history.push(`/system/roles/edit?id=${key}`);
    },
    gotoGateway: (key: string) => {
      history.push(`/system/gateway/edit?id=${key}`);
    },
  };
}

export function createEditService(i18n: IntlShape, ref: any) {
  const { data: ruleDataSources } = useRequest(queryRuleDataSources);
  const { data: gateDataSources } = useRequest(queryGatewayDataSources);
  return {
    ruleDataSources,
    gateDataSources,
  };
}
