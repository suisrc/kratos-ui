import React, { useState, useEffect, useRef } from 'react';

import { FormattedMessage } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Menu, Empty } from 'antd';

import BaseView from './components/BaseView';

import styles from './style.less';

const { Item } = Menu;

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

const renderChildren = (selectKey: string) => {
  switch (selectKey) {
    case 'base':
      return <BaseView />;
    default:
      break;
  }
  return <Empty />;
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

const Settings = (props: any) => {
  //const i18n = useIntl();

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
