// 返回权限

//export default function(param: any) {
//  console.log(param);
//  return {
//    canAdmin: false,
//  };
//}
export default function(initialState: any) {
  console.log(initialState);
  return {
    canAdmin: false,
    canReadFoo: true,
    canUpdateFoo: false,
  };
}
