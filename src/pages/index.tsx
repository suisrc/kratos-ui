import React from 'react';
import { Link, useIntl } from 'umi';

import LogoIcon from '@/assets/LogoIcon';
import styles from '@/home/style.less';

export default () => {
  const i18n = useIntl();
  return (
    <div className={styles.container} style={{ height: '80vh' }}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <LogoIcon className={styles.logo} />
              <span className={styles.title}>
                {i18n.formatMessage({ id: 'page.auth.signin.logo.title' })}
              </span>
            </Link>
          </div>
          <div className={styles.desc}>
            {i18n.formatMessage({ id: 'page.auth.signin.logo.desc' })}
          </div>
        </div>
      </div>
    </div>
  );
};
