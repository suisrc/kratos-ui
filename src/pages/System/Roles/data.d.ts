// 数据模型

export interface QueryParams {
  pageSize?: number | undefined;
  current?: number | undefined;
  [key: string]: any;

  //pageNo?: number;
  //unique?: string; // 左对齐精准匹配
  //name?: string; // 左右模糊匹配
  //tags?: string; // 左对齐精准匹配
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
  name: string; // 全局唯一

  tags: TagType[]; // 标签
  desc: string;
  gateways: TagType[];

  updateAt: string;
  createAt: string; // 用户加入系统时间
}
