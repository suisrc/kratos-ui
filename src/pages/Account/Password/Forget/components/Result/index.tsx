import { Button, Result, Descriptions, Statistic } from 'antd';
import React, { useEffect } from 'react';
import { connect, Dispatch, history } from 'umi';
import styles from './index.less';

const DefaultView = (props: { dispatch: Dispatch }) => {
  const { dispatch } = props;
  useEffect(
    () => () => {
      if (dispatch) {
        dispatch({
          type: 'accountPassword/saveCurrentStep',
          payload: 'verify',
        });
      }
    },
    [],
  );

  return (
    <Result
      status="success"
      title="密码修改成功"
      extra={[
        <Button
          type="primary"
          key="settings"
          onClick={e => history.push('/auth/signin')}
        >
          重新登陆
        </Button>,
      ]}
      className={styles.result}
    />
  );
};

export default connect()(DefaultView);
