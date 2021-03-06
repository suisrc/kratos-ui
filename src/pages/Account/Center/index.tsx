import {
  HomeOutlined,
  ContactsOutlined,
  ClusterOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Card, Col, Divider, Row, Empty } from 'antd';
import React, { useState, useEffect } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { useDispatch, useSelector, useModel, useIntl, IntlShape } from 'umi';

import { CurrentUserDetail } from './data.d';

import TagList from './components/TagList';
import Projects from './components/Projects';
import Applications from './components/Applications/index';

import styles from './index.less';

// Col: https://ant.design/components/grid-cn/#Col
// interface CenterState {
//   tabKey?: 'news' | 'applications' | 'projects';
// }

const renderChildrenByTabKey = (tabKey: string) => {
  if (tabKey === 'projects') {
    //return <Empty />;
    return <Projects />;
  }
  if (tabKey === 'applications') {
    //return <Empty />;
    return <Applications />;
  }
  return null;
};

const getOperationTabList = (i18n: IntlShape) => [
  //{key: 'news',tab: ( <span>动态<span style={{ fontSize: 14 }}>(8)</span></span>),},
  {
    key: 'applications',
    tab: (
      <span>
        {i18n.formatMessage({
          id: 'page.account.center.tab.applications.title',
          defaultMessage: '应用',
        })}
      </span>
    ),
  },
  //{
  //  key: 'projects',
  //  tab: (
  //    <span>
  //      {i18n.formatMessage({
  //        id: 'page.account.center.tab.projects.title',
  //        defaultMessage: '项目',
  //      })}
  //    </span>
  //  ),
  //},
];

const renderUserInfo = (detail: Partial<CurrentUserDetail>) => (
  <div className={styles.detail}>
    <p>
      <ContactsOutlined style={{ marginRight: 8 }} />
      {detail.title || ''}
    </p>
    <p>
      <ClusterOutlined style={{ marginRight: 8 }} />
      {detail.group || ''}
    </p>
    <p>
      <HomeOutlined style={{ marginRight: 8 }} />
      {detail.geographic?.country?.name || ''} &nbsp;
      {detail.geographic?.province?.name || ''}
      {detail.geographic?.city?.name || ''} &nbsp;
      {detail.geographic?.address || ''}
    </p>
    <p>
      <PhoneOutlined style={{ marginRight: 8 }} />
      {detail.phone || ''}
    </p>
    <p>
      <MailOutlined style={{ marginRight: 8 }} />
      {detail.email || ''}
    </p>
  </div>
);

const Center = (props: any) => {
  const i18n = useIntl();

  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser || {};

  const dispatch = useDispatch();
  const loadingEffect = useSelector((state: any) => state.loading);

  const loading = loadingEffect.effects['accountCenter/fetchUserDetail'];
  const detail = useSelector((state: any) => state['accountCenter'].detail);

  const [tabState, setTabState] = useState<string>('applications');

  useEffect(() => {
    if (detail) dispatch({ type: 'accountCenter/fetchUserDetail' });
  }, []);

  //console.log(detail);
  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            <div>
              <div className={styles.avatarHolder}>
                <img alt="" src={detail?.avatar || currentUser.avatar} />
                <div className={styles.name}>{currentUser.name}</div>
                <div>{detail?.signature || ''}</div>
              </div>
              {/*renderUserInfo(detail)*/}
              <Divider dashed />
              <TagList tags={detail?.tags || []} />
            </div>
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={getOperationTabList(i18n)}
            activeTabKey={tabState}
            onTabChange={setTabState}
          >
            {renderChildrenByTabKey(tabState)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};

export default Center;
// export default connect(
//   ({
//     loading,
//   }: {
//     loading: { effects: { [key: string]: boolean } };
//   }) => ({
//     currentUserLoading: loading.effects['AccountCenter/fetchCurrent'],
//   }),
// )(Center);
