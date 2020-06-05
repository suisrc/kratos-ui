// 第三方登陆方式
import request from '@/utils/request';

/**
 * 返回到平台的第三方Oauth2登陆平台
 */
export interface App3rdType {
  platform: string; // 平台, 用于决定显示的图标
  appid: string; // 应用id, 对于同一平台，可能出现多ID问题
  name: string; // 应用名称， 主要用于悬浮显示
  title: string; // 应用标题， 主要用于静态显示
  signature: string; // 签名，由后台给出，全局唯一，且随机生成
}
/**
 * 获取允许的第三方登陆方式
 */
export async function query3rdOauth2(): Promise<any> {
  return request('/api/v1/oauth2/list');
}

/**
 * 完成登陆认证
 */
export async function oauth2(
  appid: string,
  signature: string,
  redirect?: string,
): Promise<any> {
  return request(
    `/api/v1/oauth2/account?appid=${appid}&signature=${signature}&redirect=${redirect}`,
  );
}

// /**
//  * 没有独立的登出接口
//  */
// export async function signout() {
//     return request('/api/v1/oauth2/signout');
// }
