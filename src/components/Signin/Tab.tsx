import React, { useEffect } from 'react';
import { TabsProps as TabPaneProps } from 'antd/es/tabs';
import { Tabs } from 'antd';
import SigninContext, { SigninContextProps } from './Context';

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

export interface SigninTabProps extends TabPaneProps {
  tabUtil?: SigninContextProps['tabUtil'];
  active?: boolean;
  tab: string;
}

const SigninTab: React.FC<SigninTabProps> = props => {
  useEffect(() => {
    const uniqueId = generateId('signin-tab-');
    const { tabUtil } = props;
    if (tabUtil) {
      tabUtil.addTab(uniqueId);
    }
  }, []);
  const { children } = props;
  return <TabPane {...props}>{props.active && children}</TabPane>;
};

const WrapContext: React.FC<SigninTabProps> & {
  typeName: string;
} = props => (
  <SigninContext.Consumer>
    {value => <SigninTab tabUtil={value.tabUtil} {...props} />}
  </SigninContext.Consumer>
);

// 标志位 用来判断是不是自定义组件
WrapContext.typeName = 'SigninTab';

export default WrapContext;
