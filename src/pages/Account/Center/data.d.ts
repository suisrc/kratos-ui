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
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
}

export interface ApplicationItemDataType extends ListItemDataType {
  id: string;
  title: string;
  updatedAt: number;
  createdAt: number;
  avatar: string;
  activeTokenNumber: number;
  totalVisitsNumber: number;
  prdayVisitsNumber: number;
}

export interface ProjectItemDataType /*extends ListItemDataType*/ {
  id: string;
  title: string;
  updatedAt: number;
  createdAt: number;
  content: string;
  href: string;
  cover: string;
  members?: Member[];
}

export interface NewsItemDataType /*extends ListItemDataType*/ {
  id: string;
  title: string;
  updatedAt: number;
  createdAt: number;
  content: string;
  href: string;
  avatar: string;
  star: number;
  like: number;
  message: number;
  tags?: string[];
  //body?: any;
  owner: string;
  ownerHref: string;
}
