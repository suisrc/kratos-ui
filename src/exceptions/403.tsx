import React from 'react';

import { Result, Button } from 'antd';
import { formatMessage, Link } from 'umi';

export default () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle={formatMessage({ id: 'exception.403.subTitle' })}
    extra={
      <Link to="/">
        <Button type="primary">
          {formatMessage({ id: 'exception.403.button' })}
        </Button>
      </Link>
    }
  />
);
