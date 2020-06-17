import { List, Switch } from 'antd';
import React, { Fragment, useCallback } from 'react';

import { useIntl, useRequest } from 'umi';

import PageLoading from '@/components/PageLoading';

import { queryUserNotices } from '../service';
import { ConfigNotification } from '../data';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const NotificationView: React.FC = () => {
  const i18n = useIntl();

  const {
    data: configData,
    loading,
  }: {
    data: ConfigNotification;
    loading: boolean;
  } = useRequest(queryUserNotices);

  const getData = useCallback(() => {
    const Action = (
      <Switch
        checkedChildren={i18n.formatMessage({
          id: 'page.account.settings.settings.open',
          defaultMessage: 'Open',
        })}
        unCheckedChildren={i18n.formatMessage({
          id: 'page.account.settings.settings.close',
          defaultMessage: 'Close',
        })}
        defaultChecked
      />
    );
    return [
      {
        title: i18n.formatMessage({
          id: 'page.account.settings.notification.messages',
        }),
        description: i18n.formatMessage({
          id: 'page.account.settings.notification.messages.description',
        }),
        actions: [Action],
      },
      {
        title: i18n.formatMessage({
          id: 'page.account.settings.notification.todo',
        }),
        description: i18n.formatMessage({
          id: 'page.account.settings.notification.todo.description',
        }),
        actions: [Action],
      },
    ];
  }, []);
  if (loading || !configData) {
    return <PageLoading />;
  }

  const data = getData();
  return (
    <Fragment>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};
export default NotificationView;
