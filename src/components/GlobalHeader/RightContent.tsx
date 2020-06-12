import { Tooltip, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';

import AvatarDropdown from './AvatarDropdown';
import styles from './index.less';
import SelectLang from '../SelectLang';
import NoticeIcon from '../NoticeIcon';

//export type SiderTheme = 'light' | 'dark';

export interface GlobalHeaderRightProps {
  theme?: string;
  layout?: string;
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout = 'sidemenu' } = props;
  let className = `${styles.right}`;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
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
      <NoticeIcon />
      <AvatarDropdown menu />
      <SelectLang className={styles.action} />
      <div style={{ marginRight: '10px' }} />
    </Space>
  );
};

export default GlobalHeaderRight;
