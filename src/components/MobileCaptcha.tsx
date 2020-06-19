import { Button, Col, Input, Row, Form } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import omit from 'omit.js';
import { FormItemProps } from 'antd/es/form/FormItem';

export interface MobileCaptchaProps extends Partial<FormItemProps> {
  name: string;
  queryCaptcha: () => Promise<any>;
  style?: React.CSSProperties;
  placeholder?: string;
  countDown?: number;
  getCaptchaButtonText?: string;
  getCaptchaSecondText?: string;
  customProps?: { [key: string]: unknown };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormItem = Form.Item;

const getFormItemOptions = ({
  //onChange,
  customProps = {},
  rules,
}: MobileCaptchaProps) => {
  const options: {
    rules?: MobileCaptchaProps['rules'];
    //onChange?: MobileCaptchaProps['onChange'];
  } = {
    rules: rules || (customProps.rules as MobileCaptchaProps['rules']),
  };
  //if (onChange) {
  //  options.onChange = onChange;
  //}
  return options;
};

const MobileCaptcha: React.FC<MobileCaptchaProps> = props => {
  const [count, setCount] = useState<number>(props.countDown || 0);
  const [timing, setTiming] = useState(false);
  const {
    //onChange,
    label,
    customProps,
    rules,
    name,
    queryCaptcha,
    getCaptchaButtonText,
    getCaptchaSecondText,
    ...restProps
  } = props;

  const onGetCaptcha = async () => {
    const result = await queryCaptcha();
    if (result?.success === false) {
      return;
    }
    setTiming(true);
  };

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

  // get getFieldDecorator props
  const options = getFormItemOptions(props);
  const otherProps: Pick<any, string> = restProps || {};
  const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);

  return (
    <FormItem label={label}>
      <Row>
        <Col span={8}>
          <FormItem name={name} {...options} noStyle>
            <Input {...customProps} {...inputProps} />
          </FormItem>
        </Col>
        <Col span={1} />
        <Col span={13}>
          <Button
            disabled={timing}
            style={{
              display: 'block',
              width: '100%',
            }}
            onClick={onGetCaptcha}
          >
            {timing
              ? `${count} ${getCaptchaSecondText || '秒'}`
              : `${getCaptchaButtonText || '获取短信验证码'}`}
          </Button>
        </Col>
      </Row>
    </FormItem>
  );
};

export default MobileCaptcha;
