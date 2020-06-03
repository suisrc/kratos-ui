import React from 'react';

import { Result, Button } from 'antd';
import { history, useIntl } from 'umi';

/**
 * 👀在403，404，500的异常，我们时候了不同的写法，这里推荐500的写法✨
 */
export default () => (
  <Result
    status="500"
    title="500"
    style={{
      background: 'none',
    }}
    subTitle={useIntl().formatMessage({ id: 'exception.500.subTitle' })}
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        {useIntl().formatMessage({ id: 'exception.500.button' })}
      </Button>
    }
  />
);
