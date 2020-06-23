// 数据请求
import request from '@/utils/request';
import { stringify2 } from '@/utils/qs2';

import { QueryCondition } from './data';

export function queryGatewayApis(params: QueryCondition) {
  params['pageNo'] = params.current;
  delete params.current;
  return request(`/api/v1/system/gateway/api/list${stringify2(params)}`);
}
