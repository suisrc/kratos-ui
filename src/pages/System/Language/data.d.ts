// 数据模型

//export interface SelectOption {
//  [key: string]: any;
//}

export interface QueryParams {
  pageSize?: number | undefined;
  current?: number | undefined;
  [key: string]: any;

  //pageNo?: number;
  //pageSign?: string; // 页面签名，主要用户减少计算
  //_timestamp?: number; // 请求时间

  //key?: string;
  //value?: string;
  //lang?: string;
  //system?: string;
  //createAt?: string;
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
  id?: string; // ID
  key?: string; // 标识, 同一个系统,该内容应该是唯一的,但是如果不唯一,无法保证使用正确
  value?: string; // 内容

  lang?: string; // 语言 zh-CN, en-US
  system?: string[]; // 系统 主要用户多系统语言库

  updateAt?: string;
  createAt?: string;
}
