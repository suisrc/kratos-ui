import { Button, Result, Descriptions, Statistic } from 'antd';
import React, { useEffect } from 'react';
import { connect, Dispatch, history } from 'umi';
import styles from './index.less';

const DefaultView = (props: { dispatch: Dispatch }) => {
  //const { dispatch } = props;

  return (
    <Result
      status="success"
      title="密码修改成功"
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
};

export default connect()(DefaultView);
