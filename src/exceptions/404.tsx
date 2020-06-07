import React from 'react';

import { Button, Result } from 'antd';
import { history, useIntl as i18n } from 'umi';

const NoFoundPage: React.FC<{}> = () => (
  <Result
    status="error"
    title="404"
    style={{
      background: 'none',
    }}
    subTitle={i18n().formatMessage({ id: 'exception.404.subTitle' })}
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        {i18n().formatMessage({ id: 'exception.404.button' })}
      </Button>
    }
  />
);

export default NoFoundPage;
