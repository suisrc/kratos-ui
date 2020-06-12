import { UserOutlined } from '@ant-design/icons';

import { Input, Form, Select } from 'antd';
import React from 'react';
import { FormItemProps } from 'antd/es/form/FormItem';

import Context, { ContextProps } from './Context';
import gstyle from '@/global.less';

const { Option } = Select;

export interface RoleItemType {
  name?: string;
  id: string;
}

export interface SelectRoleProps extends Partial<FormItemProps> {
  name?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  updateActive?: ContextProps['updateActive'];
  type?: string;
  defaultValue?: string;
  roles?: RoleItemType[];
  customProps?: { [key: string]: unknown };
  onChange?: (value: RoleItemType) => void;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tabUtil?: ContextProps['tabUtil'];
  prefix?: JSX.Element;
}

const getOption = (list: RoleItemType[]) => {
  if (!list || list.length < 1) {
    return (
      <Option key={0} value={0}>
        没有找到选项
      </Option>
    );
  }
  return list.map(item => (
    <Option key={item.id} value={item.id}>
      {item.name}
    </Option>
  ));
};

const FormItem = Form.Item;

const getFormItemOptions = ({
  onChange,
  defaultValue,
  customProps = {},
  rules,
  prefix,
}: SelectRoleProps) => {
  const options: {
    rules?: SelectRoleProps['rules'];
    onChange?: SelectRoleProps['onChange'];
    initialValue?: SelectRoleProps['defaultValue'];
    prefix?: SelectRoleProps['prefix'];
  } = {
    rules: rules || (customProps.rules as SelectRoleProps['rules']),
  };
  if (onChange) {
    options.onChange = onChange;
  }
  if (defaultValue) {
    options.initialValue = defaultValue;
  }
  if (prefix) {
    options.prefix = prefix;
  }
  return options;
};

const SigninItem: React.FC<SelectRoleProps> = props => {
  const {
    onChange,
    customProps,
    defaultValue,
    name,
    roles,
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

  //const [form] = Form.useForm();

  return (
    <FormItem name={name} {...options}>
      <Select {...customProps} {...otherProps}>
        {getOption(roles || [])}
      </Select>
    </FormItem>
  );
};

/**
 * 标准用户输入框
 */
export default (props: SelectRoleProps) => (
  <Context.Consumer>
    {context => (
      <SigninItem
        customProps={{
          size: 'large',
        }}
        {...props}
        {...context}
        updateActive={context.updateActive}
      />
    )}
  </Context.Consumer>
);
