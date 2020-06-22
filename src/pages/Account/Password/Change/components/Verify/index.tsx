import React, { useCallback } from 'react';
import { Button, Divider } from 'antd';
import { connect, Dispatch, useIntl } from 'umi';
import ConfigListView from '@/components/List/Config';

import styles from './index.less';

const DefaultView: React.FC<{ dispatch?: Dispatch }> = ({ dispatch }) => {
  const i18n = useIntl();

  const onSelectVerifyType = async (key: string) => {
    if (dispatch) {
      dispatch({
        type: 'accountPassword/saveCurrentStep',
        payload: 'verify-' + key,
      });
    }
  };
  const getData = useCallback(() => {
    let keys = ['password', 'mail', 'phone'];
    let arr = [];
    for (let idx in keys) {
      let key = keys[idx];
      arr.push({
        title: i18n.formatMessage({
          id: `page.account.change.password.verify.${key}`,
          //defaultMessage: '原密码验证',
        }),
        description: i18n.formatMessage({
          id: `page.account.change.password.verify.${key}.description`,
          //defaultMessage: '如果您记得原始密码,请使用该方法',
        }),
        actions: [
          <Button type="primary" onClick={e => onSelectVerifyType(key)}>
            {i18n.formatMessage({
              id: 'page.account.change.password.verify.buttion.text',
              defaultMessage: '立即验证',
            })}
          </Button>,
        ],
      });
    }
    return arr;
  }, []);
  return (
    <>
      <div className={styles.stepForm}>
        <ConfigListView data={getData() || []} />
      </div>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>说明</h3>
        <p>为确认是你本人操作，请选择验证方式完成身份验证</p>
      </div>
    </>
  );
};

export default connect()(DefaultView);
