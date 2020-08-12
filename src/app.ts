/**
 * 动态配置文件
 * 当前文件可以是ts, 也可以是tsx文件
 */
import { RequestConfig, history } from 'umi';
import { queryCurrentUser } from '@/services/user';
import { SystemInfo, querySystemInfo } from '@/services/system';
import {
  authorization,
  unauthorization,
  hasAuthToken,
} from '@/models/useAuthUser';

import { createFromIconfontCN } from '@ant-design/icons';

/**
 * 应用初次加载,进行初始化配置
 * @umijs/plugin-initial-state
 * https://hooks.umijs.org/zh-CN/hooks/state/use-local-storage-state
 */
// https://umijs.org/zh-CN/plugins/plugin-initial-state
export async function getInitialState(): Promise<{
  // settings?: Settings;
  currentUser?: API.CurrentUser;
  isSignin?: boolean;
  systemInfo?: SystemInfo;
  // [key: string]: any;
}> {
  const systemInfo = await querySystemInfo();

  createFromIconfontCN({ scriptUrl: systemInfo?.iconfontUrls || [] }); // 在IconFont中的得到修正
  //if ( !history.location.pathname.startsWith('/auth/') &&
  if (hasAuthToken()) {
    try {
      const res: API.ErrorInfo<API.CurrentUser> = await queryCurrentUser();
      if (res.success) {
        return {
          // settings: defaultSettings
          currentUser: res?.data,
          isSignin: !!res?.data?.userid,
          systemInfo,
        };
      }
    } catch (error) {
      // do nothing
      // history.replace('/auth/signin');
    }
  }
  return {
    // settings: defaultSettings
    isSignin: false,
    systemInfo,
  };
}

/**
 * 请求全局配置
 * @umijs/plugin-request
 */
// https://umijs.org/plugins/plugin-request
// https://github.com/umijs/umi-request#interceptor
// 该配置返回一个对象。除了 errorConfig 和 middlewares 以外其它配置都是直接透传 umi-request 的全局配置。
export const request: RequestConfig = {
  //timeout: 1000,
  //errorConfig: {},
  //middlewares: [],
  requestInterceptors: [authorization],
  responseInterceptors: [unauthorization],
};

/**
 * 应用布局配置,只有在config.ts中启用layout才有效
 * @umijs/plugin-layout
 */
// https://umijs.org/zh-CN/plugins/plugin-layout
// https://pro.ant.design/blog/new-pro-use-cn
// https://pro.ant.design/docs/router-and-nav-cn
// export const layout = ({
//   initialState,
// }: {
//   initialState: { settings?: LayoutSettings };
// }): BasicLayoutProps => {
//   return {
//     rightContentRender: () => <GlobalHeaderRight />,
//     footerRender: () => <Footer />,
//     //isChildrenLayout: true,
//     disableContentMargin: false,
//     menuHeaderRender: undefined,
//     // menuDataRender: () => [],
//     ...initialState?.settings,
//   };
// };

/**
 * dva全局配置
 */
// https://umijs.org/zh-CN/plugins/plugin-dva#hmr
// export const dva = {
//   config: {
//     onAction: createLogger(),
//     onError(e: Error) {
//       message.error(e.message, 3);
//     },
//   },
// };
