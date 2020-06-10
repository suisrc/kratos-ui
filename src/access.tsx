export default function(AuthUser: {
  currentUser?: API.CurrentUser | undefined;
}) {
  const { currentUser } = AuthUser || {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}
