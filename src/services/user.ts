import request from '@/utils/request';
// import { request } from 'umi';

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
 * 动态验证用户权限问题
 * @param params
 */
export async function checkCurrentUserAccess(params: any): Promise<any> {
  return request('/api/v1/user/current/access', {
    params: params,
    skipErrorHandler: true,
  });
}

/**
 * 查询当前用户消息
 */
export async function queryCurrentUserNotices(): Promise<any> {
  return request('/api/v1/user/current/notices');
}
