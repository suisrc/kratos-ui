//import request, { requestskip } from '@/utils/request';
import { request } from 'umi';

/**
 * 登陆使用的参数
 */
export interface SigninParamsType {
  username?: string;
  password?: string;
  mobile?: string;
  captcha?: string;
  // 一种特殊的登陆方式，比如JWT的值， 或者可以存放验证码信息
  code?: string;
  // <系统>:<类型>:<备注>, 如果不区分系统，可以直接使用 :user: 代替
  // 账户登陆：xxx:user:zzz 手机登陆：xxx:mobile:zzz 编码登陆：xxx:code:zzz
  type: string;
  // 登录时候，使用的角色
  role?: string;
  // 重置登录
  reset?: boolean;
}

/**
 * 运行登录系统的类型
 * <系统>:<类型>:<备注>, 如果不区分系统，可以直接使用 :user: 代替
 * 如果是都系统的情况下,登陆时候,需要增加系统前缀
 */
export const SigninType: API.StringMap = {
  account: ':account:',
  mobile: ':mobile:',
  token: ':token:', // 主要用户刷新令牌
};

/**
 * 登陆
 * @param params
 */
export async function signin(params: SigninParamsType): Promise<any> {
  return request('/api/v1/signin/account', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

/**
 * 获取手机验证码（验证码不一定必须使用手机短信发送，也可以是其他方式
 * @param mobile
 */
export async function queryCaptcha(mobile: string): Promise<any> {
  return request(`/api/v1/signin/captcha?mobile=${mobile}`);
}

/**
 * 登出
 */
export async function signout(): Promise<any> {
  return request('/api/v1/signin/signout');
}
