//import request from 'umi-request';
import request from '@/utils/request';

//import { stringify2 } from '@/utils/qs2'

// ChangeCheckResult
export async function checkUserCaptcha(params: {
  name?: string; // kratos@quarkus.org
  type?: string; // email | phone
  value?: string;
}) {
  //return request(`/api/v1/user/current/check/captcha${stringify2(params)}`)
  return request(`/api/v1/user/forget/check/captcha`, {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}
// 发送验证码
export async function postSendUserCaptcha(params: {
  type?: string; // 发送的方式, email or phone
}) {
  return request('/api/v1/user/forget/send/captcha', {
    method: 'POST',
    data: params,
  });
}

export async function submitNewPassword(data: {
  signature?: string;
  password?: string;
}) {
  return request('/api/v1/user/forget/password/change', {
    method: 'POST',
    data: data,
    skipErrorHandler: true,
  });
}

// ChangeCheckType
export async function queryUserPasswordRuls() {
  return request('/api/v1/user/forget/password/rules');
}
