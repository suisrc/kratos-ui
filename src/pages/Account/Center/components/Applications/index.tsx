import {
  ShareAltOutlined,
  ClearOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { Card, List, Tooltip } from 'antd';
import React, { useEffect } from 'react';

import { useDispatch, useSelector, useIntl } from 'umi';

import { ApplicationItemDataType } from '../../data';

import styles from './index.less';

const Projects = (props: any) => {
  const i18n = useIntl();

  const dispatch = useDispatch();
  const loadingEffect = useSelector((state: any) => state.loading);

  const loading = loadingEffect.effects['accountCenter/fetchApplications'];
  const list = useSelector((state: any) => state['accountCenter'].applications);

  useEffect(() => {
    if (!list) dispatch({ type: 'accountCenter/fetchApplications' });
  }, []);

  return (
    <List<ApplicationItemDataType>
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
      dataSource={list || []}
      renderItem={item => (
        <List.Item>
          <Card
            className={styles.card}
            hoverable
            cover={<img alt={item.title} src={item.cover} />}
            actions={[
              <Tooltip
                title={i18n.formatMessage({
                  id: 'page.account.center.applications.tooltip.access.text',
                  defaultMessage: '访问应用',
                })}
                key="access"
              >
                <ShareAltOutlined />
              </Tooltip>,
              <Tooltip
                title={i18n.formatMessage({
                  id: 'page.account.center.applications.tooltip.clear.text',
                  defaultMessage: '注销令牌',
                })}
                key="clear"
              >
                <ClearOutlined />
              </Tooltip>,
              <Tooltip
                title={i18n.formatMessage({
                  id: 'page.account.center.applications.tooltip.setting.text',
                  defaultMessage: '配置应用',
                })}
                key="setting"
              >
                <SettingOutlined />
              </Tooltip>,
            ]}
          >
            <Card.Meta title={<a>{item.title}</a>} description={item.content} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default Projects;
