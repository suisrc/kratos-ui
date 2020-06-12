import { getResult } from './result';

//定义接口
interface Person {
  name: string;
  age: number; // 必选属性
  job?: string; //可选属性，表示不是必须的参数，
  readonly salary: string; //表示是只读的属性,但是在初始化之后不能重新赋值，否则会报错
  [propName: string]: any; // 任意类型
}

export default {
  'GET /api/v1/system/info': getResult({
    name: 'Kratos1', // 系统名称
    copyright: 'Copyright © 2020 kratos.suisrc.com', //
    beian: '辽ICP备15002381号', // 备案信息,中国国内需要
    //developer: false,
  }),
};
