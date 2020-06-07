import React from 'react';

import { Result, Button } from 'antd';
import { history, useIntl as i18n } from 'umi';

/**
 * 401: 用户没有权限（令牌、用户名、密码错误）
 * 一般不会在页面中出现,因为这些情况发生时候,会被直接重定向到登陆页面
 */
export default () => (
  <Result
    // status="401"
    status="error"
    title="401"
    style={{
      background: 'none',
    }}
    subTitle={i18n().formatMessage({ id: 'exception.401.subTitle' })}
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        {i18n().formatMessage({ id: 'exception.401.button' })}
      </Button>
    }
  />
);
