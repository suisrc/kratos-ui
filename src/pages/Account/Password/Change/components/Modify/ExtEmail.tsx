import React, { useEffect, useState } from 'react';

import { Form, Button, Divider, Input, Alert } from 'antd';
import { connect, Dispatch, useIntl, Link } from 'umi';

import MobileCaptcha from '@/components/MobileCaptcha';
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
  dispatch?: Dispatch;
}> = ({ signature, warn, dispatch }) => {
  const [form] = Form.useForm();
  //const i18n = useIntl();
  const [canSendCaptcha, setCanSendCaptcha] = useState(false);

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
          message="获取更改邮箱地址的权限时候发生未知异常,请通知系统管理员处理(签名丢失)"
          style={{ marginBottom: 24 }}
        />
        <Button type={'primary'} onClick={gotoPreStep}>
          返回
        </Button>
      </div>
    );
  }

  const { validateFields, getFieldValue } = form;
  const onChangeEmail = async () => {
    const values = await validateFields();
    console.log(values);
    if (dispatch) {
      dispatch({
        type: 'accountPassword/submitNewEmailOrPhone',
        payload: { type: 'email', value: values.email, signature },
      });
    }
  };
  const onSendCaptcha = async () => {
    const name = getFieldValue('email');
    if (dispatch) {
      dispatch({
        type: 'accountPassword/sendCaptcha',
        payload: { name, type: 'email' },
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
        onFieldsChange={fields => {
          if (fields[0]?.name[0] === 'email') {
            setCanSendCaptcha(!fields[0].errors?.length);
          }
        }}
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
          label="邮箱地址"
          name="email"
          rules={[
            {
              required: true,
              message: '请输入邮箱地址',
            },
            {
              pattern: /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/,
              message: '请输入正确的邮箱地址',
            },
          ]}
        >
          <Input placeholder="请输入邮箱地址" />
        </Form.Item>
        <MobileCaptcha
          label="验证码"
          name="captcha"
          countDown={120}
          getCaptchaButtonText="获取邮件验证码"
          getCaptchaSecondText="秒"
          getCaptchaButtonDisable={!canSendCaptcha}
          placeholder="请输入验证码"
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
            {
              pattern: /^\d{6,8}$/,
              message: '请输入6-8位纯数字验证码',
            },
          ]}
          queryCaptcha={onSendCaptcha}
        />
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" onClick={onChangeEmail}>
            修改邮箱地址
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
    </>
  );
};

export default connect(
  ({ accountPassword }: { accountPassword: StateType }) => ({
    signature: accountPassword.signature,
    warn: accountPassword.warnData,
  }),
)(DefaultView);
