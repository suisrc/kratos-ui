import React, { useEffect } from 'react';

import { Form, Button, Divider, Input, Alert } from 'antd';
import { connect, Dispatch, useIntl, Link } from 'umi';

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
  signature?: StateType['signature'];
  warn?: StateType['warnData'];
  rules?: StateType['passwordRules'];
  dispatch?: Dispatch;
}> = ({ signature, warn, rules, dispatch }) => {
  const [form] = Form.useForm();
  //const i18n = useIntl();

  useEffect(() => {
    if (dispatch && !rules?.length) {
      dispatch({ type: 'accountPassword/fetchUserPasswordRules' });
    }
  }, []);

  const gotoPreStep = async () => {
    if (dispatch) {
      dispatch({
        type: 'accountPassword/saveCurrentStep',
        payload: 'verify',
      });
    }
  };

  if (!signature) {
    return (
      <div className={styles.stepForm}>
        <Alert
          showIcon
          message="获取更改密码的权限时候发生未知异常,请通知系统管理员处理(签名丢失)"
          style={{ marginBottom: 24 }}
        />
        <Button type={'primary'} onClick={gotoPreStep}>
          返回
        </Button>
      </div>
    );
  }

  const { validateFields } = form;
  const onChangePassword = async () => {
    const values = await validateFields();
    console.log(values);
    if (dispatch) {
      dispatch({
        type: 'accountPassword/submitNewPassword',
        payload: { password: values.password, signature },
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
        {warn?.warnModifyMessage && (
          <Alert
            closable
            showIcon
            message={warn?.warnModifyMessage}
            style={{ marginBottom: 24 }}
          />
        )}
        <Form.Item
          label="新密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请署入新密码',
            },
            ...(rules || []),
          ]}
          validateFirst={true}
        >
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item
          label="密码确认"
          name="password2"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: '请在此输入密码',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次输入密码不一致');
              },
            }),
            //{
            //  validator: async (_, value, callback) => {
            //    if (value && !(value === getFieldValue('password'))) {
            //      callback('两次输入密码不一致');
            //    }
            //    {
            //      callback(undefined);
            //    }
            //  },
            //},
          ]}
        >
          <Input.Password placeholder="请再次输入密码" />
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
          <Button type="primary" onClick={onChangePassword}>
            修改密码
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>密码规则如下:</h3>
        {(rules || []).map((item, idx) => (
          <p key={idx}>{`${idx + 1}、${item.message}`}</p>
        ))}
      </div>
    </>
  );
};

export default connect(
  ({ accountPassword }: { accountPassword: StateType }) => ({
    signature: accountPassword.signature,
    warn: accountPassword.warnData,
    rules: accountPassword.passwordRules,
  }),
)(DefaultView);
