//import request from 'umi-request';
import request from '@/utils/request';

//import { stringify2 } from '@/utils/qs2'

// ChangeCheckType
export async function queryUserCheckInfo() {
  return request('/api/v1/user/current/check/info');
}

// ChangeCheckResult
export async function checkUserCaptcha(params: {
  type?: string;
  value?: string;
}) {
  //return request(`/api/v1/user/current/check/captcha${stringify2(params)}`)
  return request(`/api/v1/user/current/check/captcha`, {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

export async function submitNewPassword(data: {
  signature?: string;
  password?: string;
}) {
  return request('/api/v1/user/current/password/change', {
    method: 'POST',
    data: data,
    skipErrorHandler: true,
  });
}

// ChangeCheckType
export async function queryUserPasswordRuls() {
  return request('/api/v1/user/current/password/rules');
}
