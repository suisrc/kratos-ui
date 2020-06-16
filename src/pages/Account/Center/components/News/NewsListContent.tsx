import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import { IntlShape } from 'umi';
import styles from './NewsListContent.less';

export interface ApplicationsProps {
  data: {
    content?: string;
    updatedAt?: any;
    avatar?: string;
    owner?: string;
    href?: string;
  };
  i18n: IntlShape;
}
const ArticleListContent: React.FC<ApplicationsProps> = ({
  data: { content, updatedAt, avatar, owner, href },
  i18n,
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{content}</div>
    <div className={styles.extra}>
      <Avatar src={avatar} size="small" />
      <a href={href}>{owner}</a>{' '}
      {i18n.formatMessage({
        id: 'page.account.center.news.posted.text',
        defaultMessage: '发布在',
      })}{' '}
      <a href={href}>{href}</a>
      <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
