import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';
import styles from './index.less';

const DefaultView = () => (
  <Result
    status="success"
    title="绑定成功"
    extra={[
      <Button
        type="primary"
        key="settings"
        onClick={e => history.push('/account/settings')}
      >
        返回配置页
      </Button>,
      <Button key="home" onClick={e => history.push('/home')}>
        返回首页
      </Button>,
    ]}
    className={styles.result}
  />
);

export default DefaultView;
