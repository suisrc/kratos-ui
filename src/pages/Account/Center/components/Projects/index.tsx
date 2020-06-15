import { Card, List } from 'antd';
import React, { useEffect } from 'react';

import { useDispatch, useSelector, useIntl } from 'umi';

import moment from 'moment';
import AvatarList from './AvatarList';
import { ProjectItemDataType } from '../../data.d';
import { ModelState } from '../../model';
import styles from './index.less';

const Projects = (props: any) => {
  const i18n = useIntl();

  const dispatch = useDispatch();
  const loadingEffect = useSelector((state: any) => state.loading);

  const loading = loadingEffect.effects['accountCenter/fetchProjects'];
  const list = useSelector((state: any) => state['accountCenter'].projects);

  useEffect(() => {
    dispatch({ type: 'accountCenter/fetchProjects' });
  }, []);

  return (
    <List<ProjectItemDataType>
      className={styles.coverCardList}
      rowKey="id"
      loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Card
            className={styles.card}
            hoverable
            cover={<img alt={item.title} src={item.cover} />}
          >
            <Card.Meta title={<a>{item.title}</a>} description={item.content} />
            <div className={styles.cardItemContent}>
              <span>{moment(item.updatedAt).fromNow()}</span>
              <div className={styles.avatarList}>
                {item.members && (
                  <AvatarList size="small">
                    {item.members.map(member => (
                      <AvatarList.Item
                        key={`${item.id}-avatar-${member.id}`}
                        src={member.avatar}
                        tips={member.name}
                      />
                    ))}
                  </AvatarList>
                )}
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default Projects;
