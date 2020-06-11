/**
 * 获取当前用户权限
 * 该文件必须是access.ts😥, 当我配置为access.tsx时候,无法处理
 *
 * 权限处理
 */
import { useModel } from 'umi';
//export default function(param: any) {
//  console.log(param);
//  return {
//    canAdmin: false,
//  };
//}
export default function(initialState: {
  currentUser?: API.CurrentUser;
  isSignin?: boolean;
}) {
  const { currentUser } = initialState || {};
  //const { currentUser, isSignin } = useModel('AuthUser');
  //console.log(`access=> ${JSON.stringify(currentUser)}`);
  return {
    sign: !!initialState?.isSignin,
    admin: currentUser?.access === 'admin',
    canAccess: currentUser?.access === 'admin',
  };
}
