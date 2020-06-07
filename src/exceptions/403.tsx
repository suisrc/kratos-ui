import React from 'react';

import { Result, Button } from 'antd';
import { useIntl as i18n, Link } from 'umi';

export default () => (
  <Result
    status="error"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle={i18n().formatMessage({ id: 'exception.403.subTitle' })}
    extra={
      <Link to="/">
        <Button type="primary">
          {i18n().formatMessage({ id: 'exception.403.button' })}
        </Button>
      </Link>
    }
  />
);
