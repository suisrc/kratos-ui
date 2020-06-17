import { StarTwoTone, LikeOutlined, MessageFilled } from '@ant-design/icons';
import { List, Tag } from 'antd';
import React, { useEffect } from 'react';

import { useDispatch, useSelector, useIntl } from 'umi';
import NewsListContent from './NewsListContent';
import { NewsItemDataType } from '../../data';
import styles from './index.less';

const IconText: React.FC<{
  icon: React.ReactNode;
  text: React.ReactNode;
}> = ({ icon, text }) => (
  <span>
    {icon} {text}
  </span>
);

const News = (props: any) => {
  const i18n = useIntl();

  const dispatch = useDispatch();
  const loadingEffect = useSelector((state: any) => state.loading);

  const loading = loadingEffect.effects['accountCenter/fetchNews'];
  const list = useSelector((state: any) => state['accountCenter'].news);

  useEffect(() => {
    if (!list) dispatch({ type: 'accountCenter/fetchNews' });
  }, []);

  return (
    <List<NewsItemDataType>
      size="large"
      className={styles.newsList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={list || []}
      loading={loading}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <IconText key="star" icon={<StarTwoTone />} text={item.star} />,
            <IconText key="like" icon={<LikeOutlined />} text={item.like} />,
            <IconText
              key="message"
              icon={<MessageFilled />}
              text={item.message}
            />,
          ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle} href={item.href}>
                {item.title}
              </a>
            }
            description={
              <span>{item.tags && item.tags.map(tag => <Tag>{tag}</Tag>)}</span>
            }
          />
          <NewsListContent data={item} i18n={i18n} />
        </List.Item>
      )}
    />
  );
};

export default News;
