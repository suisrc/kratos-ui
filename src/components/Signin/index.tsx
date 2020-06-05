import { Tabs, Form } from 'antd';
import React, { useState } from 'react';
import useMergeValue from 'use-merge-value';
import classNames from 'classnames';
import { FormInstance } from 'antd/es/form';

import { SigninParamsType } from '@/services/signin';

import Context from './Context';
import Submit from './Submit';
import Tab from './Tab';
import Password, { PasswordProps } from './Password';
import Captcha, { CaptchaProps } from './Captcha';
import Account, { AccountProps } from './Account';

import styles from './index.less';

export interface SigninProps {
  activeKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (values: SigninParamsType) => void;
  className?: string;
  from?: FormInstance;
  children: React.ReactElement<typeof Tab>[];
}

interface SigninType extends React.FC<SigninProps> {
  Tab: typeof Tab;
  Submit: typeof Submit;
  Account: React.FunctionComponent<AccountProps>;
  Password: React.FunctionComponent<PasswordProps>;
  Captcha: React.FunctionComponent<CaptchaProps>;
}

const Signin: SigninType = props => {
  const { className } = props;
  const [tabs, setTabs] = useState<string[]>([]);
  const [active, setActive] = useState<any>({});
  const [type, setType] = useMergeValue('', {
    value: props.activeKey,
    onChange: props.onTabChange,
  });
  const TabChildren: React.ReactComponentElement<typeof Tab>[] = [];
  const otherChildren: React.ReactElement<unknown>[] = [];
  React.Children.forEach(
    props.children,
    (
      child:
        | React.ReactComponentElement<typeof Tab>
        | React.ReactElement<unknown>,
    ) => {
      if (!child) {
        return;
      }
      if ((child.type as { typeName: string }).typeName === 'SigninTab') {
        TabChildren.push(child as React.ReactComponentElement<typeof Tab>);
      } else {
        otherChildren.push(child);
      }
    },
  );
  return (
    <Context.Provider
      value={{
        tabUtil: {
          addTab: id => {
            setTabs([...tabs, id]);
          },
          removeTab: id => {
            setTabs(tabs.filter(currentId => currentId !== id));
          },
        },
        updateActive: activeItem => {
          if (!active) return;
          if (active[type]) {
            active[type].push(activeItem);
          } else {
            active[type] = [activeItem];
          }
          setActive(active);
        },
      }}
    >
      <div className={classNames(className, styles.login)}>
        <Form
          form={props.from}
          onFinish={values => {
            if (props.onSubmit) {
              props.onSubmit(values as SigninParamsType);
            }
          }}
        >
          {tabs.length ? (
            <React.Fragment>
              <Tabs
                animated={false}
                className={styles.tabs}
                activeKey={type}
                onChange={activeKey => {
                  setType(activeKey);
                }}
              >
                {TabChildren}
              </Tabs>
              {otherChildren}
            </React.Fragment>
          ) : (
            props.children
          )}
        </Form>
      </div>
    </Context.Provider>
  );
};

Signin.Tab = Tab;
Signin.Submit = Submit;
Signin.Account = Account;
Signin.Password = Password;
Signin.Captcha = Captcha;

export default Signin;
