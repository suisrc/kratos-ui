declare namespace API {
  export interface CurrentUser {
    avatar?: string; // 头像
    name?: string; // 名称
    title?: string; // 标题， 备用
    group?: string; // 分组， 备用
    signature?: string; // 签名, 备用
    tags?: {
      // 标签
      key: string;
      label: string;
    }[];
    userid?: string; // 用户ID
    access?: 'user' | 'guest' | 'admin'; // 用户角色
    // 是的，用户基本角色只有3种，
    unreadCount?: number; // 未读消息计数
  }

  export interface ErrorInfo<T> {
    success: boolean; // 请求成功
    data?: T; // 响应数据
    errorCode?: string; // 错误代码
    errorMessage?: string; // 向用户显示消息
    showType?: number; //错误显示类型：0静音； 1条消息警告； 2消息错误； 4通知； 9页
    traceId?: string; // 方便进行后端故障排除：唯一的请求ID
    host?: string; // 方便后端故障排除：当前访问服务器的主机
  }

  export enum ErrorShowType {
    SILENT = 0, // 不提示错误
    WARN_MESSAGE = 1, // 警告信息提示
    ERROR_MESSAGE = 2, // 错误信息提示
    NOTIFICATION = 4, // 通知提示
    REDIRECT = 9, // 页面跳转
  }

  /**
   * 登陆返回结果
   */
  export interface SigninStateType {
    status?: 'ok' | 'error';
    // type?: string; // 登陆类型, 不能为空，否则无法登陆
    type?: string;
  }

  /**
   * 一个简单的MAP
   */
  export interface StringMap {
    [key: string]: string;
  }

  /**
   * 一个简单的MAP
   */
  export interface ObjectMap<T> {
    [key: string]: T;
  }
}
