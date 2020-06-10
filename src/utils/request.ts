/**
 * request 网络请求工具
 *
 * 更详细的 api 文档:
 * https://github.com/umijs/umi-request
 * https://umijs.org/zh-CN/plugins/plugin-request
 * https://umijs.org/plugins/plugin-request#request
 * https://hooks.umijs.org/zh-CN/hooks/async#options
 *
 * 通过 import { request } from 'umi'; 你可以使用内置的请求方法。
 * request 接收两个参数，第一个参数是 url，第二个参数是请求的 options。
 * options 具体格式参考 umi-request。
 * request 的大部分用法等同于 umi-request，一个不同的是 options 扩展了一个配置 skipErrorHandler，
 * 该配置为 true 是会跳过默认的错误处理，用于项目中部分特殊的接口。
 * 注意，使用useRequest，包含异常处理
 * 另外你可以通过 Error.name 是否是 BizError 来判断是否是因为 success 为 false 抛出的错误。
 */
import { extend } from 'umi-request';
import { request as requmi } from 'umi';
import { notification } from 'antd';

interface CodeMessage {
  [key: number]: string;
}

const codeMessage: CodeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status && response.status > 500) {
    // 500以上（不包含）为网络异常
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
//const request = extend({
//  errorHandler, // 默认错误处理(注意，这是网络上的异常)
//  credentials: 'include', // 默认请求是否带上cookie
//});
const request = requmi;

export default request;

/**
 * 忽略警告
 * @param url
 * @param options
 */
export const requestskip = (url: any, options?: any) => {
  return requmi(url, { ...options, skipErrorHandler: true });
};

// import { useRequest } from 'umi';
// const { data, error, loading } = useRequest(() => {
//   return services.getList('/api/test');
// });
