import React from 'react';

import { Result, Button } from 'antd';
import { history, useIntl as i18n } from 'umi';

/**
 * 👀在403，404，500的异常，我们时候了不同的写法，这里推荐500的写法✨
 */
export default () => (
  <Result
    status="error"
    title="500"
    style={{
      background: 'none',
    }}
    subTitle={i18n().formatMessage({ id: 'exception.500.subTitle' })}
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        {i18n().formatMessage({ id: 'exception.500.button' })}
      </Button>
    }
  />
);
