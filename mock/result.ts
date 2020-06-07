/**
 * 所有的返回值都是ErrorInfo类型
 */

export interface ErrorInfo {
  success: boolean; // if request is success
  data?: any; // response data
  errorCode?: string; // code for errorType
  errorMessage?: string; // message display to user
  showType?: number; // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
  traceId?: string; // Convenient for back-end Troubleshooting: unique request ID
  host?: string; // onvenient for backend Troubleshooting: host of current access server
}

export enum ErrorShowType {
  SILENT = 0, // 不提示错误
  WARN_MESSAGE = 1, // 警告信息提示
  ERROR_MESSAGE = 2, // 错误信息提示
  NOTIFICATION = 4, // 通知提示
  REDIRECT = 9, // 页面跳转
}
export const getResult = (
  data: any,
  props?: {
    success?: boolean;
    errorCode?: string;
    errorMessage?: string;
    showType?: number;
    traceId?: string;
    host?: string;
    [propName: string]: any;
  },
): ErrorInfo => {
  let res: ErrorInfo = {
    success: true,
    traceId: 'demo-123456-12345678',
    host: '127.0.0.1',
  };
  if (props) {
    res = { ...res, ...props };
  }
  if (data) {
    res.data = data;
  }
  return res;
};
