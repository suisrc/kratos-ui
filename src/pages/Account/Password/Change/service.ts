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
  return request('/api/v1/user/current/check/captcha', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}
// 发送验证码
export async function postSendUserCaptcha(params: {
  type?: string; // 发送的方式, email or phone
}) {
  return request('/api/v1/user/current/send/captcha', {
    method: 'POST',
    data: params,
  });
}

export async function postSubmitNewPassword(data: {
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
