import React, { useEffect } from 'react';

import { Form, Button, Divider, Input, Alert } from 'antd';
import { connect, Dispatch, useIntl } from 'umi';

import { StateType } from '../../model';

import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const DefaultView: React.FC<{
  data?: StateType['stepData'];
  warn?: StateType['warnData'];
  dispatch?: Dispatch;
}> = ({ data, warn, dispatch }) => {
  const [form] = Form.useForm();
  //const i18n = useIntl();

  const gotoPreStep = async () => {
    if (dispatch) {
      dispatch({
        type: 'accountPassword/saveCurrentStep',
        payload: 'verify',
      });
    }
  };

  const { validateFields } = form;
  const onCheckPassword = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'accountPassword/verifyOldPassword',
        payload: { captcha: values.captcha },
      });
    }
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        //initialValues={data}
      >
        {warn?.warnVerifyPassword && (
          <Alert
            closable
            showIcon
            message={warn?.warnVerifyPassword}
            style={{ marginBottom: 24 }}
          />
        )}
        <Form.Item
          label="原始密码"
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入原始密码',
            },
          ]}
        >
          <Input.Password placeholder="请输入原始密码" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button className={styles.stepPreButton} onClick={gotoPreStep}>
            上一步
          </Button>
          <Button type="primary" onClick={onCheckPassword}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
    </>
  );
};

export default connect(
  ({ accountPassword }: { accountPassword: StateType }) => ({
    data: accountPassword.stepData,
    warn: accountPassword.warnData,
  }),
)(DefaultView);
