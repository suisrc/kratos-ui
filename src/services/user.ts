// import request, { requestskip } from '@/utils/request';
import { request } from 'umi';

/**
 * 查询当前用户信息
 * 一般在用户收起登陆，或者首次打开页面时候触发
 * 只有基本信息
 */
export async function queryCurrentUser(): Promise<any> {
  return request('/api/v1/user/current', {
    skipErrorHandler: true,
  });
}

/**
 * 查询用户详情
 */
export async function queryCurrentUserDetail(): Promise<any> {
  return request('/api/v1/user/detail');
}

/**
 * 查询当前用户消息
 */
export async function queryNotices(): Promise<any> {
  return request('/api/v1/user/notices');
}
