export interface TagType {
  key: string;
  label: string;
}

export interface GeographicType {
  country: {
    id: string;
    name: string;
  };
  province: {
    id: string;
    name: string;
  };
  city: {
    id: string;
    name: string;
  };
  address: string;
}

export interface CurrentUserDetail /*extends API.CurrentUser*/ {
  //name: string;
  //userid: string;
  //email: string;
  //notifyCount: number;
  //unreadCount: number;
  avatar: string;
  signature: string;
  title: string;
  group: string;
  tags: TagType[];
  geographic: GeographicType; // 地理坐标
  phone: string; // 电话
  email: string; // 邮箱
}

export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface ListItemDataType {
  id: string;
  title: string;
  avatar: string;
  cover: string;
  updatedAt: number;
  createdAt: number;
  content: string;
  href: string;
  tags?: string[];
}

export interface ApplicationItemDataType extends ListItemDataType {
  cnToken: number; // 当前激活的令牌数量, 统计当前未过期的令牌
  pvCount: number; // 日访问量
}

export interface ProjectItemDataType extends ListItemDataType {
  members?: Member[];
}

export interface NewsItemDataType extends ListItemDataType {
  star: number;
  like: number;
  message: number;
  owner: string;
  //body?: any;
}
