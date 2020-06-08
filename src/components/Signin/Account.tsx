import { UserOutlined } from '@ant-design/icons';

import { Input, Form } from 'antd';
import React from 'react';
import { FormItemProps } from 'antd/es/form/FormItem';

import Context, { ContextProps } from './Context';
import styles from './index.less';
import gstyle from '@/global.less';

export interface AccountProps extends Partial<FormItemProps> {
  name?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  updateActive?: ContextProps['updateActive'];
  type?: string;
  defaultValue?: string;
  customProps?: { [key: string]: unknown };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tabUtil?: ContextProps['tabUtil'];
  prefix?: JSX.Element;
}

const FormItem = Form.Item;

const getFormItemOptions = ({
  onChange,
  defaultValue,
  customProps = {},
  rules,
  prefix,
}: AccountProps) => {
  const options: {
    rules?: AccountProps['rules'];
    onChange?: AccountProps['onChange'];
    initialValue?: AccountProps['defaultValue'];
    prefix?: AccountProps['prefix'];
  } = {
    rules: rules || (customProps.rules as AccountProps['rules']),
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

const SigninItem: React.FC<AccountProps> = props => {
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
      <Input {...customProps} {...otherProps} />
    </FormItem>
  );
};

/**
 * 标准用户输入框
 */
export default (props: AccountProps) => (
  <Context.Consumer>
    {context => (
      <SigninItem
        customProps={{
          size: 'large',
          prefix: <UserOutlined className={gstyle.prefixIcon} />,
        }}
        {...props}
        {...context}
        updateActive={context.updateActive}
      />
    )}
  </Context.Consumer>
);

// export const Mobile = (props: AccountProps) => (
//   <Context.Consumer>
//     {context => (
//       <SigninItem
//         customProps={{
//           size: 'large',
//           prefix: (
//             <MobileOutlined
//               style={{
//                 color: defaultSettings.primaryColor,
//               }}
//               className={styles.prefixIcon}
//             />
//           ),
//         }}
//         {...props}
//         {...context}
//         updateActive={context.updateActive}
//       />
//     )}
//   </Context.Consumer>
// );
