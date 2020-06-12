import React, { Component } from 'react';

import { FormattedMessage, Dispatch, connect, useModel } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import BaseView from './components/base';
import BindingView from './components/binding';
import { CurrentUser } from './data.d';
import NotificationView from './components/notification';
import SecurityView from './components/security';
import styles from './style.less';

const { Item } = Menu;

interface SettingsProps {
  dispatch: Dispatch;
  currentUser: CurrentUser;
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
  basic: (
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
  return <div>name</div>;
};

export default Settings;

class Settings1 extends Component<SettingsProps, SettingsState> {
  main: HTMLDivElement | undefined = undefined;

  constructor(props: SettingsProps) {
    super(props);
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'base',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountAndSettings/fetchCurrent',
    });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = (key: SettingsStateKeys) => {
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
  };

  renderChildren = () => {
    const { selectKey } = this.state;
    switch (selectKey) {
      case 'base':
        return <BaseView />;
      case 'security':
        return <SecurityView />;
      case 'binding':
        return <BindingView />;
      case 'notification':
        return <NotificationView />;
      default:
        break;
    }

    return null;
  };

  render() {
    const { currentUser } = this.props;
    if (!currentUser.userid) {
      return '';
    }
    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={ref => {
            if (ref) {
              this.main = ref;
            }
          }}
        >
          <div className={styles.leftMenu}>
            <Menu
              mode={mode}
              selectedKeys={[selectKey]}
              onClick={({ key }) => this.selectKey(key as SettingsStateKeys)}
            >
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            {this.renderChildren()}
          </div>
        </div>
      </GridContent>
    );
  }
}

//export default connect(
//  ({
//    accountAndSettings,
//  }: {
//    accountAndSettings: { currentUser: CurrentUser };
//  }) => ({
//    currentUser: accountAndSettings.currentUser,
//  }),
//)(Settings);
