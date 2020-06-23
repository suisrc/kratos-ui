// 数据模型

/**
 * 页面查询需要的条件对象
 */
export interface QueryCondition {
  name?: string;
  path?: string;
  //regexp?: string;

  // 分页通用
  current?: number;
  pageSize?: number;
  total?: number;
}

/**
 * 展示的数据类型
 */
export interface QueryData {
  id: string;
  name: string;
  path: string;
  email: string;
  address: string;
}
