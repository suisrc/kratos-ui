import request, { addSortParams, fixPageParams } from '@/utils/request';
import { stringify2 } from '@/utils/qs2';
import { IntlShape, useRequest, history } from 'umi';

export function querySystemInfo(id: string) {
  return request(`/api/v1/system/info`);
}

export function postEditSystemInfo(item: any) {
  return request(`/api/v1/system/info/edit`, {
    method: 'put',
    data: item,
  });
}
