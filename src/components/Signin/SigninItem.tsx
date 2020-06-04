import { Button, Col, Input, Row, Form, message } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import omit from 'omit.js';
import { FormItemProps } from 'antd/es/form/FormItem';
import { getFakeCaptcha } from '@/services/signin';

import ItemMap from './map';
import SigninContext, { SigninContextProps } from './SigninContext';
import styles from './index.less';

export type WrappedSigninItemProps = SigninItemProps;
export type SigninItemKeyType = keyof typeof ItemMap;
export interface SigninItemType {
  Username: React.FC<WrappedSigninItemProps>;
  Password: React.FC<WrappedSigninItemProps>;
  Mobile: React.FC<WrappedSigninItemProps>;
  Captcha: React.FC<WrappedSigninItemProps>;
}

export interface SigninItemProps extends Partial<FormItemProps> {
  name?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  buttonText?: React.ReactNode;
  countDown?: number;
  getCaptchaButtonText?: string;
  getCaptchaSecondText?: string;
  updateActive?: SigninContextProps['updateActive'];
  type?: string;
  defaultValue?: string;
  customProps?: { [key: string]: unknown };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tabUtil?: SigninContextProps['tabUtil'];
}

const FormItem = Form.Item;

const getFormItemOptions = ({
  onChange,
  defaultValue,
  customProps = {},
  rules,
}: SigninItemProps) => {
  const options: {
    rules?: SigninItemProps['rules'];
    onChange?: SigninItemProps['onChange'];
    initialValue?: SigninItemProps['defaultValue'];
  } = {
    rules: rules || (customProps.rules as SigninItemProps['rules']),
  };
  if (onChange) {
    options.onChange = onChange;
  }
  if (defaultValue) {
    options.initialValue = defaultValue;
  }
  return options;
};

const SigninItem: React.FC<SigninItemProps> = props => {
  const [count, setCount] = useState<number>(props.countDown || 0);
  const [timing, setTiming] = useState(false);
  // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
  const {
    onChange,
    customProps,
    defaultValue,
    rules,
    name,
    getCaptchaButtonText,
    getCaptchaSecondText,
    updateActive,
    type,
    tabUtil,
    ...restProps
  } = props;

  const onGetCaptcha = useCallback(async (mobile: string) => {
    const result = await getFakeCaptcha(mobile);
    if (result === false) {
      return;
    }
    message.success('获取验证码成功！验证码为：1234');
    setTiming(true);
  }, []);

  useEffect(() => {
    let interval: number = 0;
    const { countDown } = props;
    if (timing) {
      interval = window.setInterval(() => {
        setCount(preSecond => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            // 重置秒数
            return countDown || 60;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);
  if (!name) {
    return null;
  }
  // get getFieldDecorator props
  const options = getFormItemOptions(props);
  const otherProps = restProps || {};

  if (type === 'Captcha') {
    const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);

    return (
      <FormItem shouldUpdate noStyle>
        {({ getFieldValue }) => (
          <Row gutter={8}>
            <Col span={16}>
              <FormItem name={name} {...options}>
                <Input {...customProps} {...inputProps} />
              </FormItem>
            </Col>
            <Col span={8}>
              <Button
                disabled={timing}
                className={styles.getCaptcha}
                size="large"
                onClick={() => {
                  const value = getFieldValue('mobile');
                  onGetCaptcha(value);
                }}
              >
                {timing ? `${count} 秒` : '获取验证码'}
              </Button>
            </Col>
          </Row>
        )}
      </FormItem>
    );
  }
  return (
    <FormItem name={name} {...options}>
      <Input {...customProps} {...otherProps} />
    </FormItem>
  );
};

const SigninItems: Partial<SigninItemType> = {};

Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  SigninItems[key] = (props: SigninItemProps) => (
    <SigninContext.Consumer>
      {context => (
        <SigninItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
          {...context}
          updateActive={context.updateActive}
        />
      )}
    </SigninContext.Consumer>
  );
});

export default SigninItems as SigninItemType;
