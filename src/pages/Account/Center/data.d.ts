export interface TagType {
  key: string;
  label: string;
}

export interface GeographicType {
  province: {
    label: string;
    key: string;
  };
  city: {
    label: string;
    key: string;
  };
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
  country: string;
  geographic: GeographicType;
  address: string;
  phone: string;
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
