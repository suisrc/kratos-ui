import request from '@/utils/request';
import { stringify, stringify2 } from '@/utils/qs2';
// import { request } from 'umi';

/**
 * 登陆使用的参数
 */
export interface SigninParamsType {
  username?: string;
  password?: string;
  // 验证码
  captcha?: string;
  // 一种特殊的登陆方式，比如JWT的值， 或者可以存放验证码信息
  code?: string;
  // 登录时候，使用的角色
  role?: string;
  // 子应用ID
  client?: string;
  domain?: string;
  // 重置登录
  reset?: boolean;
}

// /**
//  * 运行登录系统的类型
//  * <系统>:<类型>:<备注>, 如果不区分系统，可以直接使用 :user: 代替
//  * 如果是都系统的情况下,登陆时候,需要增加系统前缀
//  */
// export const SigninType: Record<string, string> = {
//   account: ':account:',
//   mobile: ':mobile:',
//   token: ':token:', // 主要用户刷新令牌
// };

/**
 * 登陆
 * @param params
 */
export async function signin(params: SigninParamsType): Promise<any> {
  return request('/api/v1/signin', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

/**
 * 刷新令牌
 */
export async function refresh(token: string): Promise<any> {
  return request(`/api/v1/signin/refresh?refresh_token=${token}`);
}

/**
 * 获取手机验证码（验证码不一定必须使用手机短信发送，也可以是其他方式
 * @param mobile
 */
export async function queryCaptcha(params: any): Promise<any> {
  return request(`/api/v1/signin/captcha${stringify2(params)}`, {
    skipErrorHandler: true,
  });
}

/**
 * 登出
 */
export async function signout(): Promise<any> {
  return request('/api/v1/signout');
}
