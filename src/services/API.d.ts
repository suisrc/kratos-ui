declare namespace API {
  /**
   * 全局用户
   */
  export interface CurrentUser {
    userid?: string; // 用户ID
    avatar?: string; // 头像
    name?: string; // 名称

    unreadCount?: number; // 未读消息计数

    system?: string; // 该字段主要是有前端给出,用以记录使用, 不同system带来的access也是不同的
    access?: any; // 返回权限列表,注意,其返回的权限只是部分确认的权限,而不是全部权限,并且,返回的权限是跟当前系统相关的
    role?: {
      // 是当前登陆使用的角色
      id: string; // 角色ID, 如果角色存在,那么id和name是必须存在的内容
      name: string; // 角色名称
      avatar?: string; // 角色头像, 预留字段
      show?: boolean; // 是否显示, 预留字段
    }; // 多角色用户,登陆系统后,是能使用单角色

    // UserMenuItem[]
    // 用户显示的菜单,注意,这里的菜单,不仅仅限制于当前所拥有的菜单内容
    // 兼容MenuDataItem类型
    menus?: [];

    createAt?: number; // 获取当前信息的时间
  }

  /**
   * 菜单数据类型
   *
   * import { MenuDataItem } from '@ant-design/pro-layout';
   * icon1: ant@4对icon不在支持,这里用icon1代替icon, 在 components/IconFont 中处理 ❌
   * 兼容MenuDataItem类型
   */
  export interface UserMenuItem {
    children?: UserMenuItem[]; // 子菜单
    icon?: string;
    locale?: string | false; // menu.welcome, 可以直接抽取i18n对应的内容,如果不配置,可以通过name抽取
    name?: string; // 必须字段,如果不存在,内容会被隐藏
    key?: string; // 全局唯一标识符
    path?: string; // 和route.ts路由对应
  }

  /**
   * 右上角的消息提醒
   */
  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }

  /**
   * 返回值的标准格式,注意,所有的解决的放回置都是该结构
   * 兼容于umi-request请求
   */
  export interface ErrorInfo<T> {
    success: boolean; // 请求成功
    data?: T; // 响应数据
    errorCode?: string; // 错误代码
    errorMessage?: string; // 向用户显示消息
    showType?: number; //错误显示类型：0静音； 1条消息警告； 2消息错误； 4通知； 9页
    traceId?: string; // 方便进行后端故障排除：唯一的请求ID
    host?: string; // 方便后端故障排除：当前访问服务器的主机
  }

  /**
   * 返回值,对应的消息类型
   */
  export enum ErrorShowType {
    SILENT = 0, // 不提示错误
    WARN_MESSAGE = 1, // 警告信息提示
    ERROR_MESSAGE = 2, // 错误信息提示
    NOTIFICATION = 4, // 通知提示
    REDIRECT = 9, // 页面跳转
  }

  /**
   * 登陆返回结果
   *
   * status: 通过该状态,可以通知前端发生的异常,异常内容可以通过errorCode和errorMessage中得到
   */
  export interface SigninStateType {
    status?: 'ok' | 'error'; //不适用boolean类型是为了以后可以增加扩展

    // 以下内容,如果使用常规的sessionid, 不存在
    // token会持久化存储,这就导致浏览器重新打开,用户还是登陆状态
    // 基于这个问题,服务器会将用于唯一标识token_client_id存储在cookie中,以解决这个问题
    // 是否需要认证,是token中的内容决定的
    access_token?: string; // 访问令牌,系统基于jwt认证时候,需要使用,一般为2个小时
    // ======================================================, 可以在AuthUser.ts中做出更改
    // 如果refresh_token不存在,即系统不希望存在刷新令牌的存在
    // 用户体验上可能存在问题,即当令牌过期后,需要重新登陆,
    // 刷新令牌则每一个小时,会想认证服务器重新获取认证信息
    // 注意,重新获取的认证接口调用为后端服务器行为, 非前端直接调用
    refresh_token?: string; // 刷新令牌,比token有着更长的有效期,一般为7天,

    token_type?: string; // 令牌类型
    expires_at?: number; // 过期时间
    expires_in?: number; // 过期时间

    // 消息， 优先显示
    message?: string;
    // {id: string, name: string}[] 多角色的时候，返回角色，重新确认登录
    roles?: any[];
    // 其他信息
    [key: string]: any;
  }

  //====================================================================================

  export type WithFalse<T> = T | false;
}
