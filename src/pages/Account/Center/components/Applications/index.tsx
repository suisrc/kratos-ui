import {
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
  ClearOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Dropdown, List, Menu, Tooltip } from 'antd';
import React, { useEffect, useRef } from 'react';

import { useDispatch, useSelector, useIntl, IntlShape } from 'umi';

import numeral from 'numeral';
import { ApplicationItemDataType } from '../../data.d';

import { formatNumber, FormatNumberType } from '@/components/UtilsX';

import styles from './index.less';

const CardInfo: React.FC<{
  activeTokenNumber: React.ReactNode;
  totalVisitsNumber: React.ReactNode;
  prdayVisitsNumber: React.ReactNode;
  i18n: IntlShape;
}> = ({ activeTokenNumber, totalVisitsNumber, prdayVisitsNumber }) => (
  <div className={styles.cardInfo}>
    <div>
      <p>在线令牌</p>
      <p>{activeTokenNumber}</p>
    </div>
    <div>
      <p>总访问量</p>
      <p>{totalVisitsNumber}</p>
    </div>
    <div>
      <p>日新增量</p>
      <p>{prdayVisitsNumber}</p>
    </div>
  </div>
);

const itemMenu = (item: ApplicationItemDataType) => (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        //href=""
      >
        详情
      </a>
    </Menu.Item>
  </Menu>
);

const Applications = (props: any) => {
  const i18n = useIntl();

  const dispatch = useDispatch();
  const loadingEffect = useSelector((state: any) => state.loading);

  const loading = loadingEffect.effects['accountCenter/fetchApplications'];
  const list = useSelector((state: any) => state['accountCenter'].applications);

  useEffect(() => {
    dispatch({ type: 'accountCenter/fetchApplications' });
  }, []);

  const formatNumbertRef = useRef<FormatNumberType[]>([
    {
      text: i18n.formatMessage({
        id: 'page.account.center.applications.million.text',
        defaultMessage: '百万',
      }),
      unit: 1000000,
    },
    {
      text: i18n.formatMessage({
        id: 'page.account.center.applications.10thousand.text',
        defaultMessage: '万',
      }),
      unit: 10000,
    },
  ]);

  return (
    <List<ApplicationItemDataType>
      rowKey="id"
      className={styles.filterCardList}
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
        <List.Item key={item.id}>
          <Card
            hoverable
            bodyStyle={{ paddingBottom: 20 }}
            actions={[
              <Tooltip title="清空令牌" key="clear">
                <ClearOutlined />
              </Tooltip>,
              <Tooltip title="登出应用" key="logout">
                <LogoutOutlined />
              </Tooltip>,
              <Tooltip title="访问应用" key="access">
                <ShareAltOutlined />
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
                activeTokenNumber={formatNumber(
                  item.activeTokenNumber,
                  formatNumbertRef.current,
                )}
                totalVisitsNumber={formatNumber(
                  item.totalVisitsNumber,
                  formatNumbertRef.current,
                )}
                prdayVisitsNumber={formatNumber(
                  item.prdayVisitsNumber,
                  formatNumbertRef.current,
                )}
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
