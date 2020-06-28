import request from '@/utils/request';
// import { request } from 'umi';

export interface SystemInfo {
  name?: string; // 系统名称
  copyright?: string; //
  beian?: string; // 备案信息,中国国内需要
  developer?: boolean; //开发者信息,默认开启,可以配置屏蔽
}
/**
 * 获取系统公共配置,主要用于展示页面的自定义部分内容
 * 特别注意,该方法是一个同步方法
 */
export async function querySystemInfo(): Promise<SystemInfo> {
  try {
    let res = await request('/api/v1/system/info', {
      skipErrorHandler: true,
    });
    if (res?.success && !!res.data) {
      return res.data;
    }
  } catch (error) {
    // do nothing
  }
  return {};
}

/**
 * 获取locale内容
 *
 * data:
 * {
 *   'zh-CN': {
 *     'menu': {
 *        lang: 'zh-CN',
 *        label: '简体中文',
 *        icon: '🇨🇳',
 *        title: '语言',
 *     }
 *     'data': {
 *       'menu.system.settings': '系统配置',
 *     }
 *   }
 * }
 */
export async function queryLocales() {
  return request('/api/v1/system/locales', {
    skipErrorHandler: true,
  });
}
