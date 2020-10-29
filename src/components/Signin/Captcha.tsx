import { MailOutlined } from '@ant-design/icons';

import { Button, Col, Input, Row, Form } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import omit from 'omit.js';
import { FormItemProps } from 'antd/es/form/FormItem';

//import { useRequest } from 'umi';
//import { queryCaptcha } from '@/services/signin';

import Context, { ContextProps } from './Context';
import styles from './index.less';
import gstyle from '@/global.less';

export interface CaptchaProps extends Partial<FormItemProps> {
  accountField: string; // 默认mobile
  queryCaptcha: (value: string) => Promise<any>;
  name?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  buttonText?: React.ReactNode;
  countDown?: number;
  getCaptchaButtonText?: string;
  getCaptchaSecondText?: string;
  updateActive?: ContextProps['updateActive'];
  type?: string;
  defaultValue?: string;
  customProps?: { [key: string]: unknown };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tabUtil?: ContextProps['tabUtil'];
}

const FormItem = Form.Item;

const getFormItemOptions = ({
  onChange,
  defaultValue,
  customProps = {},
  rules,
}: CaptchaProps) => {
  const options: {
    rules?: CaptchaProps['rules'];
    onChange?: CaptchaProps['onChange'];
    initialValue?: CaptchaProps['defaultValue'];
  } = {
    rules: rules || (customProps.rules as CaptchaProps['rules']),
  };
  if (onChange) {
    options.onChange = onChange;
  }
  if (defaultValue) {
    options.initialValue = defaultValue;
  }
  return options;
};

const Captcha: React.FC<CaptchaProps> = props => {
  const [count, setCount] = useState<number>(props.countDown || 0);
  const [timing, setTiming] = useState(false);
  // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
  const {
    onChange,
    customProps,
    defaultValue,
    rules,
    name,
    accountField,
    queryCaptcha,
    getCaptchaButtonText,
    getCaptchaSecondText,
    updateActive,
    type,
    tabUtil,
    ...restProps
  } = props;

  const onGetCaptcha = useCallback(async (value: string) => {
    const result = await queryCaptcha(value);
    if (result.success === false) {
      return;
    }
    //const { error } = useRequest(() => getCaptcha(mobile));
    //if (!error) { return; }
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
  const otherProps: Pick<any, string> = restProps || {};
  const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);

  return (
    <FormItem shouldUpdate noStyle>
      {({ getFieldValue, getFieldError }) => (
        <Row gutter={8}>
          <Col span={16}>
            <FormItem name={name} {...options}>
              <Input {...customProps} {...inputProps} />
            </FormItem>
          </Col>
          <Col span={8}>
            <Button
              disabled={
                timing ||
                !getFieldValue(accountField) ||
                getFieldError(accountField).length > 0
              }
              className={styles.getCaptcha}
              size="large"
              onClick={() => {
                const value = getFieldValue(accountField);
                onGetCaptcha(value);
              }}
            >
              {timing
                ? `${count} ${getCaptchaSecondText}`
                : `${getCaptchaButtonText}`}
            </Button>
          </Col>
        </Row>
      )}
    </FormItem>
  );
};

export default (props: CaptchaProps) => (
  <Context.Consumer>
    {context => (
      <Captcha
        customProps={{
          size: 'large',
          prefix: <MailOutlined className={gstyle.prefixIcon} />,
        }}
        {...props}
        {...context}
        updateActive={context.updateActive}
      />
    )}
  </Context.Consumer>
);
