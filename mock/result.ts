/**
 * 获取标准异常
 * @param data
 * @param props
 */
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
): API.ErrorInfo<any> => {
  let res: API.ErrorInfo<any> = {
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
