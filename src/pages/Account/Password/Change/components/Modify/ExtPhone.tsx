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
          message="获取更改手机号码的权限时候发生未知异常,请通知系统管理员处理(签名丢失)"
          style={{ marginBottom: 24 }}
        />
        <Button type={'primary'} onClick={gotoPreStep}>
          返回
        </Button>
      </div>
    );
  }

  const { validateFields, getFieldValue } = form;
  const onChangePhone = async () => {
    const values = await validateFields();
    console.log(values);
    if (dispatch) {
      dispatch({
        type: 'accountPassword/submitNewEmailOrPhone',
        payload: { type: 'phone', value: values.phone, signature },
      });
    }
  };
  const onSendCaptcha = async () => {
    const name = getFieldValue('phone');
    if (dispatch) {
      dispatch({
        type: 'accountPassword/sendCaptcha',
        payload: { name, type: 'phone' },
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
          if (fields[0]?.name[0] === 'phone') {
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
          label="手机号码"
          name="phone"
          rules={[
            {
              required: true,
              message: '手机号码',
            },
            {
              pattern: /^1\d{10}$/,
              message: '请输入正确的手机号码',
            },
          ]}
        >
          <Input placeholder="请输入手机号码" />
        </Form.Item>
        <MobileCaptcha
          label="验证码"
          name="captcha"
          countDown={120}
          getCaptchaButtonText="获取短信验证码"
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
          <Button type="primary" onClick={onChangePhone}>
            修改手机号码
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
