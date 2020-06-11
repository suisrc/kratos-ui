import React from 'react';

import { useModel, useAccess, Access } from 'umi';

export default () => {
  //console.log('run');
  const access = useAccess();

  return (
    <div style={{ textAlign: 'center', minHeight: '80vh' }}>
      Want to add more pages? Please refer to{' '}
      {access.canAdmin ? (
        <a href="https://pro.ant.design/docs/block-cn">use block</a>
      ) : (
        <div>use block</div>
      )}
      。
    </div>
  );
};
