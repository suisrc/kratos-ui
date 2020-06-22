import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { StateType } from './model';

import Verify from './components/Verify';
import Modify from './components/Modify';
import Result from './components/Result';

import VerifyPassword from './components/Verify/Password';
import VerifyEmail from './components/Verify/Email';
import VerifyPhone from './components/Verify/Phone';

import styles from './style.less';

const { Step } = Steps;

/**
 * 获取当前修改密码位置
 * @param current 修改密码的三个过程, verify, modify, result
 */
const getCurrentStepAndComponent = (current?: string) => {
  switch (current) {
    case 'modify':
      return { step: 2, component: <Modify /> };
    case 'result':
      return { step: 3, component: <Result /> };
    // 执行验证方式
    case 'verify-password':
      return { step: 1, component: <VerifyPassword /> };
    case 'verify-mail':
      return { step: 1, component: <VerifyEmail /> };
    case 'verify-phone':
      return { step: 1, component: <VerifyPhone /> };
    // 选择验证方式
    case 'verify':
    default:
      return { step: 0, component: <Verify /> };
  }
};

interface MultiStepFormProps {
  current: string | undefined;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ current }) => {
  const [stepComponent, setStepComponent] = useState<React.ReactNode>(
    <Verify />,
  );
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);

  return (
    //<PageHeaderWrapper title="修改密码">
    <Card bordered={false}>
      <>
        <Steps current={currentStep} className={styles.steps}>
          <Step title="验证方式" />
          <Step title="验证身份" />
          <Step title="修改密码" />
          <Step title="完成" />
        </Steps>
        {stepComponent}
      </>
    </Card>
    //</PageHeaderWrapper>
  );
};

export default connect(
  ({ accountPassword }: { accountPassword: StateType }) => ({
    current: accountPassword.current,
  }),
)(MultiStepForm);
