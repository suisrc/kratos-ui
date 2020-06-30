// 数据模型

export interface QueryParams {
  pageSize?: number | undefined;
  current?: number | undefined;
  [key: string]: any;

  //pageNo?: number;
  //unique?: string; // 左对齐精准匹配
  //name?: string; // 左右模糊匹配
  //nickname?: string; // 精准匹配匹配
  //tags?: string; // 左对齐精准匹配
  //role?: string; // 左对齐精准匹配
  //gateway?: string; // 左对齐精准匹配
  //createAt?: string[]; // 时间区间
  //pageSign?: string; // 页面签名，主要用户减少计算
  //_timestamp?: number; // 请求时间
}
export interface QuerySort {
  [key: string]: 'ascend' | 'descend';
  //[key: string]: string;
}

export interface QueryFilter {
  [key: string]: React.ReactText[];
}

// export interface QueryResult extends RequestData {
//   data: QueryTableItem[];
//   success?: boolean;
//   total?: number;
//   [key: string]: any;
// }

export interface TagType {
  id: string;
  name: string;
}

/**
 * 展示的数据类型
 */
export interface QueryTableItem {
  id: string; // ID
  unique: string; // 全局唯一标识, 不可变更
  name: string; // 全局唯一,登陆名

  nickname: string; // 昵称

  tags: TagType[]; // 标签
  // role可以理解为gateway的集合, 也就是说,用户可以通过role确认权限,
  // 也可以通过gateway直接管理权限,推荐使用role管理
  roles: TagType[];
  gateways: TagType[];

  updateAt: string;
  createAt: string; // 用户加入系统时间
}
