import React from 'react';

import { useModel } from 'umi';

export default (): React.ReactNode => {
  //console.log('run');
  return (
    <div style={{ textAlign: 'center', minHeight: '80vh' }}>
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn">use block</a>。
    </div>
  );
};
