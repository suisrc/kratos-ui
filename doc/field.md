# 函数全局常量

最简单的
``` TS
export default {
  name: '1234',
}
```
给出数据类型
``` TS
export interface MenuDataItem {
    name: string;
}
const menus: MenuDataItem[] = [
]
```
``` TS
export type DefaultSettings = Settings & {
  menuSearch?: boolean;
  menuAccess?: boolean;
  //[key: string]: any;
};
const settings: DefaultSettings = {

}
```