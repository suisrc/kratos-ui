import React, { useState, useEffect, useRef } from 'react';

import { FormattedMessage } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Menu, Empty } from 'antd';
import BaseView from './components/BaseView';
import BindingView from './components/BindingView';
import NotificationView from './components/NotificationView';
import SecurityView from './components/SecurityView';
import styles from './style.less';

const { Item } = Menu;
//type SettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';

const menuMap = {
  base: (
    <FormattedMessage
      id="page.account.settings.menuMap.base"
      defaultMessage="基本设置"
    />
  ),
  security: (
    <FormattedMessage
      id="page.account.settings.menuMap.security"
      defaultMessage="安全设置"
    />
  ),
  binding: (
    <FormattedMessage
      id="page.account.settings.menuMap.binding"
      defaultMessage="账户绑定"
    />
  ),
  notification: (
    <FormattedMessage
      id="page.account.settings.menuMap.notification"
      defaultMessage="消息通知"
    />
  ),
};

const resize = (
  main: HTMLDivElement | undefined,
  setMode: (mode: string) => void,
) => {
  if (!main) {
    return;
  }
  requestAnimationFrame(() => {
    if (!main) {
      return;
    }
    let mode: 'inline' | 'horizontal' = 'inline';
    const { offsetWidth } = main;
    if (main.offsetWidth < 641 && offsetWidth > 400) {
      mode = 'horizontal';
    }
    if (window.innerWidth < 768 && offsetWidth > 400) {
      mode = 'horizontal';
    }
    setMode(mode);
  });
};

const renderChildren = (selectKey: string) => {
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
  return <Empty />;
};

const Settings = (props: any) => {
  //const i18n = useIntl();
  //const { initialState } = useModel('@@initialState');
  //const currentUser = initialState?.currentUser || {};

  const [mode, setMode] = useState<any>('inline');
  const [selectKey, setSelectKey] = useState('base');
  const main = useRef<HTMLDivElement | undefined>(undefined);

  useEffect(() => {
    const _resize = () => resize(main.current, setMode);
    window.addEventListener('resize', _resize);
    return () => window.removeEventListener('resize', _resize);
  }, []);

  return (
    <GridContent>
      <div
        className={styles.main}
        ref={ref => {
          if (ref) {
            main.current = ref;
          }
        }}
      >
        <div className={styles.leftMenu}>
          <Menu
            mode={mode}
            selectedKeys={[selectKey]}
            onClick={({ key }) => setSelectKey(key)}
          >
            {Object.keys(menuMap).map(item => (
              <Item key={item}>{menuMap[item]}</Item>
            ))}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{menuMap[selectKey]}</div>
          {renderChildren(selectKey)}
        </div>
      </div>
    </GridContent>
  );
};

export default Settings;
