// 提供一种具有应用状态的卡片信息用于显示
//
import {
  EllipsisOutlined,
  ShareAltOutlined,
  ClearOutlined,
  AlignLeftOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Dropdown, List, Menu, Tooltip } from 'antd';
import React, { useEffect, useRef } from 'react';

import { useDispatch, useSelector, useIntl, IntlShape } from 'umi';

import numeral from 'numeral';
//import { formatNumber } from '@/components/UtilsX';

import { ApplicationItemDataType } from '../../data';
import styles from './index.less';

const CardInfo: React.FC<{
  cnToken: React.ReactNode;
  pvCount: React.ReactNode;
  i18n: IntlShape;
}> = ({ cnToken, pvCount, i18n }) => (
  <div className={styles.cardInfo}>
    <div>
      <p>
        {i18n.formatMessage({
          id: 'page.account.center.applications.cnToken.text',
          defaultMessage: '令牌',
        })}
      </p>
      <p>{cnToken}</p>
    </div>
    <div>
      <p>
        {i18n.formatMessage({
          id: 'page.account.center.applications.pvCount.text',
          defaultMessage: '访问量',
        })}
      </p>
      <p>{pvCount}</p>
    </div>
  </div>
);

const Applications = (props: any) => {
  const i18n = useIntl();

  const dispatch = useDispatch();
  const loadingEffect = useSelector((state: any) => state.loading);

  const loading = loadingEffect.effects['accountCenter/fetchApplications'];
  const list = useSelector((state: any) => state['accountCenter'].applications);

  useEffect(() => {
    if (!list) dispatch({ type: 'accountCenter/fetchApplications' });
  }, []);

  //============================================================================
  const itemMenu = (item: ApplicationItemDataType) => (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          //href=""
        >
          <AlignLeftOutlined /> &nbsp;
          {i18n.formatMessage({
            id: 'page.account.center.applications.tooltip.detail.text',
            defaultMessage: '详情',
          })}
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          //href=""
        >
          <LogoutOutlined /> &nbsp;
          {i18n.formatMessage({
            id: 'page.account.center.applications.tooltip.logout.text',
            defaultMessage: '退出',
          })}
        </a>
      </Menu.Item>
    </Menu>
  );
  //============================================================================

  return (
    <List<ApplicationItemDataType>
      rowKey="id"
      className={styles.filterCardList}
      loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 3,
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
      dataSource={list || []}
      renderItem={item => (
        <List.Item key={item.id}>
          <Card
            hoverable
            bodyStyle={{ paddingBottom: 20 }}
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
              <Dropdown overlay={itemMenu(item)} key="ellipsis">
                <EllipsisOutlined />
              </Dropdown>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar size="small" src={item.avatar} />}
              title={item.title}
            />
            <div className={styles.cardItemContent}>
              <CardInfo
                //activeTokenNumber={numeral(item.activeTokenNumber).format('0,0')}
                cnToken={numeral(item.cnToken).format('0,0')}
                pvCount={numeral(item.pvCount).format('0a')}
                i18n={i18n}
              />
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default Applications;
