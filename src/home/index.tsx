import React from 'react';
import { Link, useIntl } from 'umi';

import LogoIcon from '@/assets/LogoIcon';
import SelectLang from '@/components/SelectLang';
import Footer from '@/components/Footer';

import styles from './style.less';

export default () => {
  const i18n = useIntl();
  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <SelectLang />
      </div>
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
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};
