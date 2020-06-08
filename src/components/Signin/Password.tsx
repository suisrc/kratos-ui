import { LockOutlined } from '@ant-design/icons';

import { Input, Form } from 'antd';
import React from 'react';
import { FormItemProps } from 'antd/es/form/FormItem';

import Context, { ContextProps } from './Context';
import styles from './index.less';
import gstyle from '@/global.less';

export interface PasswordProps extends Partial<FormItemProps> {
  name?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  updateActive?: ContextProps['updateActive'];
  type?: string;
  defaultValue?: string;
  customProps?: { [key: string]: unknown };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tabUtil?: ContextProps['tabUtil'];
  iconRender?: (visible: any) => React.ReactElement;
}

const FormItem = Form.Item;

const getFormItemOptions = ({
  onChange,
  defaultValue,
  customProps = {},
  rules,
  iconRender,
}: PasswordProps) => {
  const options: {
    rules?: PasswordProps['rules'];
    onChange?: PasswordProps['onChange'];
    initialValue?: PasswordProps['defaultValue'];
    iconRender?: PasswordProps['iconRender'];
  } = {
    rules: rules || (customProps.rules as PasswordProps['rules']),
  };
  if (onChange) {
    options.onChange = onChange;
  }
  if (defaultValue) {
    options.initialValue = defaultValue;
  }
  if (iconRender) {
    options.iconRender = iconRender;
  }
  return options;
};

const SigninItem: React.FC<PasswordProps> = props => {
  const {
    onChange,
    customProps,
    defaultValue,
    rules,
    name,
    updateActive,
    type,
    tabUtil,
    ...restProps
  } = props;

  if (!name) {
    return null;
  }
  // get getFieldDecorator props
  const options = getFormItemOptions(props);
  const otherProps = restProps || {};

  return (
    <FormItem name={name} {...options}>
      <Input.Password {...customProps} {...otherProps} />
    </FormItem>
  );
};

export default (props: PasswordProps) => (
  <Context.Consumer>
    {context => (
      <SigninItem
        customProps={{
          size: 'large',
          prefix: <LockOutlined className={gstyle.prefixIcon} />,
        }}
        {...props}
        {...context}
        updateActive={context.updateActive}
      />
    )}
  </Context.Consumer>
);
