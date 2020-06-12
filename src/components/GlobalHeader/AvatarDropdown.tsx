import React, { useCallback } from 'react';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { history, useModel, useIntl } from 'umi';

import HeaderDropdown from './HeaderDropdown';
import styles from './index.less';

export interface GlobalHeaderRightProps {
  menu?: boolean;
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, loading } = useModel('@@initialState');
  const { signout } = useModel('useAuthUser');

  const i18n = useIntl();

  const onMenuClick = useCallback((event: ClickParam) => {
    const { key } = event;
    if (key === 'signout') {
      // await signout();
      signout();
      return;
    }
    history.push(`/account/${key}`);
  }, []);

  if (loading || !initialState?.currentUser?.name) {
    return (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }

  const { currentUser } = initialState;

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          {i18n.formatMessage({
            id: 'menu.account.center',
            defaultMessage: 'Account Center',
          })}
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          {i18n.formatMessage({
            id: 'menu.account.settings',
            defaultMessage: 'Account Settings',
          })}
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="signout">
        <LogoutOutlined />
        {i18n.formatMessage({
          id: 'menu.account.signout',
          defaultMessage: 'Sign Out',
        })}
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={currentUser.avatar}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>
          {(currentUser.role?.show ? currentUser.role.name + ' & ' : '') +
            currentUser.name}
        </span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
