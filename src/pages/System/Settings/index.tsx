import React, { Component } from 'react';

import {
  FormattedMessage,
  Dispatch,
  connect,
  useModel,
  useDispatch,
} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';

const { Item } = Menu;

interface SettingsProps {
  dispatch: Dispatch;
  currentUser: API.CurrentUser;
}

type SettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';
interface SettingsState {
  mode: 'inline' | 'horizontal';
  menuMap: {
    [key: string]: React.ReactNode;
  };
  selectKey: SettingsStateKeys;
}

/**
 * 功能菜单
 */
const menuMap = {
  base: (
    <FormattedMessage
      id="page.system.settings.menu.basic"
      defaultMessage="基本设置"
    />
  ),
  // 访问令牌是个人行为,在这里可以进行全局配置是否可以申请访问令牌,但是无权设定令牌的内容
  security: (
    <FormattedMessage
      id="page.system.settings.menu.security"
      defaultMessage="安全配置"
    />
  ),
  // 第三方应用授权登陆
  signin: (
    <FormattedMessage
      id="page.system.settings.menu.signin"
      defaultMessage="账号登录"
    />
  ),
  // 授权第三方应用系统
  application: (
    <FormattedMessage
      id="page.system.settings.menu.application"
      defaultMessage="应用绑定"
    />
  ),
  notification: (
    <FormattedMessage
      id="page.system.settings.menu.notification"
      defaultMessage="系统消息"
    />
  ),
};

const Settings = (props: SettingsProps) => {
  const dispatch = useDispatch();
  console.log(props.currentUser);
  return <div>name</div>;
};

export default Settings;
