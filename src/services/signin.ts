import request from '@/utils/request';

export interface SigninParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
}

export async function fakeAccountSignin(params: SigninParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function signout() {
  return request('/api/login/signout');
}
