# 函数定义


定义函数,如果没有返回值,可以写成void或者直接删除, 如果没有参数,需要保留"()"内容.  
默认无名函数, 一个文件最多一个  
function(参数):{返回值} {...}  
``` TypeScript
export default function(param: {
    // 参数类型
    name1: string,
    name2: string,
}): {
    // 返回值类型
    name1?: string;
    name2?: string;
} {
    // 函数体
    console.log(param);
    return {};
}
```
有名函数   
函数名 = (参数): {返回值} => {...}  
改写法如果只有一个操作,且操作的返回值是函数的返回值相同,可以写成如下  
函数名 = (参数): {返回值} => 操作  
该方法是用的最多的方法,因为该方法可以直接定义在组件中  
``` TypeScript
export const test = (param: {
    // 参数类型
    name: string,
}): {
    // 返回值类型
    name?: string;
} =>  {
    // 函数体
    console.log(name);
    return {};
}
```
function 函数名(参数): {返回值} {...}  
``` TypeScript
export function test(param: {
    name: string,
}): {
    name?: string;
} {
    return {};
}
```
``` ts
export interface User {
    firstName: string; 
    lastName: string;
}
export const fetchName1 = (user: User): string => `${user.firstName} ${user.lastName}`
```