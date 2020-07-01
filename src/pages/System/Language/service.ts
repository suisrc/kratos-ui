// 数据请求
import request, { addSortParams, fixPageParams } from '@/utils/request';
import { stringify2 } from '@/utils/qs2';
import { IntlShape, useRequest, history } from 'umi';

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
  return request(`/api/v1/system/language/list${stringify2(params)}`);
}

export async function queryTableItem(id: string) {
  return request(`/api/v1/system/language/item?id=${id}`);
}

export async function postEditTableItem(item: QueryTableItem) {
  return request(`/api/v1/system/language/item`, {
    method: 'put',
    data: item,
  });
}

export async function postNewTableItem(item: QueryTableItem) {
  return request(`/api/v1/system/language/item`, {
    method: 'post',
    data: item,
  });
}

async function postRemoveTableItem(ids: string[]) {
  return request(`/api/v1/system/language/remove`, {
    method: 'delete',
    data: ids,
  });
}

export async function queryKindLang() {
  return request('/api/v1/system/language/kinds/lang');
}
export async function queryKindSystem() {
  return request('/api/v1/system/language/kinds/system');
}

//===============================================================================================
// 系统中处理queryTableList外所有的操作动作, 这里主要通过columns.tsx和components中的内容作用使用
// columns.tsx 页面的table和search的内容描述
// service.ts  页面中除拉取操作外的所有操作动作（queryTableList，拉去数据的请求)
// data.d.ts   定义数据类型
//
export function createActions(i18n: IntlShape, ref: any) {
  const { run: removeRowsByIds } = useRequest(
    (ids: string[]) => postRemoveTableItem(ids),
    {
      manual: true,
      onSuccess: _ => ref?.actionRef?.current?.reload(),
    },
  );
  const { data: kindLangs } = useRequest(queryKindLang);
  const { data: kindSystem } = useRequest(queryKindSystem);
  return {
    kindLangs,
    kindSystem,
    newRow: () => {
      ref?.setEditItemId(undefined);
      ref?.setEditModalVisible(true);
    },
    editRow: (item: QueryTableItem) => {
      ref?.setEditItemId(item.id);
      ref?.setEditModalVisible(true);
    },
    removeRow: (item: QueryTableItem) => {
      removeRowsByIds([item.id as string]);
    },
    removeRows: (items: QueryTableItem[]) => {
      removeRowsByIds(items.map(item => item.id) as string[]);
    },
  };
}