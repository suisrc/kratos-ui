/**
 * 获取当前用户权限
 * 该文件必须是access.ts😥, 当我配置为access.tsx时候,无法处理
 */

//export default function(param: any) {
//  console.log(param);
//  return {
//    canAdmin: false,
//  };
//}
export default function(initialState: { currentUser?: API.CurrentUser }) {
  const { currentUser } = initialState || {};
  //console.log(currentUser);
  return {
    canAdmin: true,
    canAccess: false,
  };
}
