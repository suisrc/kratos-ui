import request, { requestskip } from '@/utils/request';

/**
 * 查询当前用户信息
 * 一般在用户收起登陆，或者首次打开页面时候触发
 */
export async function getCurrentUser(): Promise<any> {
  return requestskip('/api/v1/user/current');
}

/**
 * 查询当前用户消息
 */
export async function queryNotices(): Promise<any> {
  return request('/api/v1/user/notices');
}
