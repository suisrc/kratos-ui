// 数据模型

export interface QueryParams {
  pageSize?: number | undefined;
  current?: number | undefined;
  [key: string]: any;

  //pageNo?: number;
  //unique?: string; // 左对齐精准匹配
  //name?: string; // 左右模糊匹配
  //method?: string[]; // 精准匹配匹配
  //domain?: string; // 左对齐精准匹配
  //path?: string; // 左对齐精准匹配
  //allow?: boolean; // 精准匹配
  //netmask?: string; // 精准匹配
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

/**
 * 展示的数据类型
 */
export interface QueryTableItem {
  id: string; // ID
  unique: string; // 全局唯一标识
  name: string; // 名称

  methods?: string[]; // 方法 GET, POST, PUT DELETE, *(如果为Empty)
  domains?: string[]; // 域名
  paths?: string[]; // 路径, *(如果为空)
  allow?: boolean; // 允许, 默认为true, false: 标识阻止=>block
  priority?: number; // 数字越小,优先级越高,默认为 32
  netmask?: string; // 网络掩码, 默认为0.0.0.0/0, 标识全部作用

  updateAt: string;
  createAt: string;
}
