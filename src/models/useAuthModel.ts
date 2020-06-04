import { useState, useCallback } from 'react';

// 用于完成用户权限认证
export default function useAuthModel() {
  const [user, setUser] = useState(null);
  const signin = useCallback((account, password, type) => {
    // signin implementation
    // setUser(user from signin API)
  }, []);
  const signout = useCallback(() => {
    // signout implementation
    // setUser(null)
  }, []);
  return {
    user,
    signin,
    signout,
  };
}
