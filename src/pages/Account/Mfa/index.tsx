import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';

import Verify from './components/Binding';

import styles from './style.less';

const { Step } = Steps;

/**
 * 获取当前修改密码位置
 * @param current 修改密码的三个过程, verify, modify, result
 */
const getCurrentStepAndComponent = (current?: string) => {
  switch (current) {
    case 'binding':
    default:
      return { step: 0, component: <Verify /> };
  }
};

const MultiStepForm = () => {
  const [stepComponent, setStepComponent] = useState(<Verify />);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [current, setCurrent] = useState<string>('binding');

  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);

  return (
    <Card bordered={false}>
      <>
        <Steps current={currentStep} className={styles.steps}>
          <Step title="验证" />
          <Step title="绑定" />
          <Step title="完成" />
        </Steps>
        {stepComponent}
      </>
    </Card>
  );
};
