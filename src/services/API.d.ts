declare namespace API {
  export interface CurrentUser {
    avatar?: string; // 头像
    name?: string; // 名称
    title?: string; // 标题， 备用
    group?: string; // 分组， 备用
    signature?: string; // 签名, 登陆用户唯一
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
