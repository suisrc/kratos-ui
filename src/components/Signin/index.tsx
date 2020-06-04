import { Tabs, Form } from 'antd';
import React, { useState } from 'react';
import useMergeValue from 'use-merge-value';
import classNames from 'classnames';
import { FormInstance } from 'antd/es/form';
import { SigninParamsType } from '@/services/signin';

import SigninContext from './SigninContext';
import SigninItem, { SigninItemProps } from './SigninItem';
import SigninSubmit from './SigninSubmit';
import SigninTab from './SigninTab';
import styles from './index.less';

export interface SigninProps {
  activeKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (values: SigninParamsType) => void;
  className?: string;
  from?: FormInstance;
  children: React.ReactElement<typeof SigninTab>[];
}

interface SigninType extends React.FC<SigninProps> {
  Tab: typeof SigninTab;
  Submit: typeof SigninSubmit;
  Username: React.FunctionComponent<SigninItemProps>;
  Password: React.FunctionComponent<SigninItemProps>;
  Mobile: React.FunctionComponent<SigninItemProps>;
  Captcha: React.FunctionComponent<SigninItemProps>;
}

const Signin: SigninType = props => {
  const { className } = props;
  const [tabs, setTabs] = useState<string[]>([]);
  const [active, setActive] = useState({});
  const [type, setType] = useMergeValue('', {
    value: props.activeKey,
    onChange: props.onTabChange,
  });
  const TabChildren: React.ReactComponentElement<typeof SigninTab>[] = [];
  const otherChildren: React.ReactElement<unknown>[] = [];
  React.Children.forEach(
    props.children,
    (
      child:
        | React.ReactComponentElement<typeof SigninTab>
        | React.ReactElement<unknown>,
    ) => {
      if (!child) {
        return;
      }
      if ((child.type as { typeName: string }).typeName === 'SigninTab') {
        TabChildren.push(
          child as React.ReactComponentElement<typeof SigninTab>,
        );
      } else {
        otherChildren.push(child);
      }
    },
  );
  return (
    <SigninContext.Provider
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
    </SigninContext.Provider>
  );
};

Signin.Tab = SigninTab;
Signin.Submit = SigninSubmit;

Signin.Username = SigninItem.Username;
Signin.Password = SigninItem.Password;
Signin.Mobile = SigninItem.Mobile;
Signin.Captcha = SigninItem.Captcha;

export default Signin;
