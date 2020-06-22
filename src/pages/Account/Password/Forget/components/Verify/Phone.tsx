import React, { useEffect, useState } from 'react';

import { Form, Button, Divider, Alert, Input } from 'antd';
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
  warn?: StateType['warnData'];
  dispatch?: Dispatch;
}> = ({ warn, dispatch }) => {
  const [form] = Form.useForm();
  //const i18n = useIntl();
  const [canSendCaptcha, setCanSendCaptcha] = useState(false);

  const gotoPreStep = async () => {
    if (dispatch) {
      dispatch({
        type: 'forgetPassword/saveCurrentStep',
        payload: 'verify',
      });
    }
  };

  const { validateFields, getFieldValue } = form;
  const onCheckCaptcha = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'forgetPassword/verifyCaptcha',
        payload: { name: values.phone, type: 'phone', value: values.captcha },
      });
    }
  };
  const onSendCaptcha = async () => {
    const name = getFieldValue('email');
    if (dispatch) {
      dispatch({
        type: 'forgetPassword/sendCaptcha',
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
        onFieldsChange={fields => {
          if (fields[0]?.name[0] === 'phone') {
            setCanSendCaptcha(!fields[0].errors?.length);
          }
        }}
      >
        {warn?.warnVerifyMessage && (
          <Alert
            closable
            showIcon
            message={warn?.warnVerifyMessage}
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
              pattern: /^\d{6}$/,
              message: '请输入6位纯数字验证码',
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
          <Button className={styles.stepPreButton} onClick={gotoPreStep}>
            上一步
          </Button>
          <Button type="primary" onClick={onCheckCaptcha}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ margin: '40px 0 24px' }} />
      <div className={styles.desc}>
        <h3>没收到短信验证码？</h3>
        <p>1、网络通讯异常可能会造成短信丢失，请重新获取或稍后再试。</p>
        <p>2、请核实手机是否已欠费停机，或者屏蔽了系统短信。</p>
        <p>3、如果手机已丢失或停用， 请选择其他验证方式。</p>
        <p>4、您也可以尝试将SIM卡移动到另一部手机，然后重试。</p>
      </div>
    </>
  );
};

export default connect(({ forgetPassword }: { forgetPassword: StateType }) => ({
  warn: forgetPassword.warnData,
}))(DefaultView);
