import React, { useEffect } from 'react';

import { Form, Button, Divider, Alert } from 'antd';
import { connect, Dispatch, useIntl, Link } from 'umi';
import PageLoading from '@/components/PageLoading';

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
  data?: StateType['stepData'];
  warn?: StateType['warnData'];
  dispatch?: Dispatch;
}> = ({ data, warn, dispatch }) => {
  const [form] = Form.useForm();
  //const i18n = useIntl();

  useEffect(() => {
    if (!data?.email && dispatch) {
      dispatch({ type: 'accountPassword/fetchUserCheckInfo' });
    }
  }, []);
  if (!data?.email) {
    return <PageLoading />;
  }

  const gotoPreStep = async () => {
    if (dispatch) {
      dispatch({
        type: 'accountPassword/saveCurrentStep',
        payload: 'verify',
      });
    }
  };

  const { validateFields } = form;
  const onCheckCaptcha = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'accountPassword/verifyCaptcha',
        payload: { type: 'email', value: values.captcha },
      });
    }
  };
  const onSendCaptcha = async () => {
    if (dispatch) {
      dispatch({
        type: 'accountPassword/sendCaptcha',
        payload: { type: 'email' },
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
        initialValues={data}
      >
        {warn?.warnVerifyMessage && (
          <Alert
            closable
            showIcon
            message={warn?.warnVerifyMessage}
            style={{ marginBottom: 24 }}
          />
        )}
        <Form.Item label="邮箱地址" name="email">
          {data.email}{' '}
          <Link to="/account/settings">[邮箱不可用？点此修改]</Link>
        </Form.Item>
        <MobileCaptcha
          label="验证码"
          name="captcha"
          countDown={120}
          getCaptchaButtonText="获取邮件验证码"
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
        <h3>没收到邮箱验证码？</h3>
        <p>1、网络通讯异常可能会造成邮件丢失，请重新获取或稍后再试。</p>
        <p>2、请求确定邮箱服务器商不在垃圾邮件阻止名单中。</p>
      </div>
    </>
  );
};

export default connect(
  ({ accountPassword }: { accountPassword: StateType }) => ({
    data: accountPassword.stepData,
    warn: accountPassword.warnData,
  }),
)(DefaultView);
