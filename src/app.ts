/**
 * 动态配置文件
 * 当前文件可以是ts, 也可以是tsx文件
 */
//import { history, RequestConfig } from 'umi';
import { getCurrentUser } from '@/services/user';

/**
 * 应用初次加载,进行初始化配置
 * @umijs/plugin-initial-state
 */
// https://umijs.org/zh-CN/plugins/plugin-initial-state
export async function getInitialState(): Promise<{
  // settings?: Settings;
  currentUser?: API.CurrentUser;
  isSignin?: boolean;
  // [key: string]: any;
}> {
  //if (!history.location.pathname.startsWith('/auth/')) {
  try {
    const res: API.ErrorInfo<API.CurrentUser> = await getCurrentUser();
    if (res.success) {
      return {
        // settings: defaultSettings
        currentUser: res?.data,
        isSignin: !!res?.data?.userid,
      };
    }
  } catch (error) {
    // do nothing
    // history.replace('/auth/signin');
  }
  //}
  return {
    // settings: defaultSettings
    isSignin: false,
  };
}

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
 * 请求全局配置
 * @umijs/plugin-request
 */
// https://umijs.org/plugins/plugin-request
// 该配置返回一个对象。除了 errorConfig 和 middlewares 以外其它配置都是直接透传 umi-request 的全局配置。
// export const request: RequestConfig = {
//   timeout: 1000,
//   errorConfig: {},
//   middlewares: [],
//   requestInterceptors: [],
//   responseInterceptors: [],
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
