import { Tooltip, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { SelectLang } from 'umi';
import AvatarDropdown from './AvatarDropdown';
import styles from './index.less';

import { SettingDrawer } from '@ant-design/pro-layout';

export type SiderTheme = 'light' | 'dark';

export interface GlobalHeaderRightProps {
  theme?: SiderTheme;
  layout?: 'sidemenu' | 'topmenu';
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout = 'sidemenu' } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const [settings, setSettings] = useState({});
  return (
    <>
      <Space className={className}>
        <Tooltip title="使用文档">
          <span
            className={styles.action}
            onClick={() => {
              window.location.href = 'https://kratos.quay.run/docs';
            }}
          >
            <QuestionCircleOutlined />
          </span>
        </Tooltip>
        <AvatarDropdown />
        <SelectLang className={styles.action} />
      </Space>
      <SettingDrawer settings={settings} onSettingChange={setSettings} />
    </>
  );
};

export default GlobalHeaderRight;
