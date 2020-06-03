import React from 'react';

import { Button, Result } from 'antd';
import { history, useIntl } from 'umi';

const NoFoundPage: React.FC<{}> = () => (
  <Result
    status={404}
    title="404"
    style={{
      background: 'none',
    }}
    subTitle={useIntl().formatMessage({ id: 'exception.404.subTitle' })}
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        {useIntl().formatMessage({ id: 'exception.404.button' })}
      </Button>
    }
  />
);

export default NoFoundPage;
