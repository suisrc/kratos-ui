import { Switch } from 'antd';
import React, { useCallback } from 'react';

import { useIntl, useRequest } from 'umi';

import PageLoading from '@/components/PageLoading';
import ConfigListView from '@/components/List/Config';

import { queryUserNotices, postUserNotices } from '../service';
import { ConfigNotification } from '../data';

const NotificationView: React.FC = () => {
  const i18n = useIntl();

  const {
    data: configData,
    loading,
    mutate: setConfigData,
  }: {
    data: ConfigNotification;
    loading: boolean;
    mutate: (newData: ConfigNotification) => void;
  } = useRequest(queryUserNotices);

  const { run: handleSubmit, loading: submiting } = useRequest(
    postUserNotices,
    {
      manual: true,
      onSuccess: (data, params) => {
        setConfigData({ ...configData, ...data });
      },
    },
  );

  //console.log(configData);
  const getData = useCallback(() => {
    if (!configData) {
      return [];
    }
    let arr = [];
    for (let k in configData) {
      arr.push({
        title: i18n.formatMessage({
          id: `page.account.settings.notification.${k}`,
        }),
        description: i18n.formatMessage({
          id: `page.account.settings.notification.${k}.description`,
        }),
        actions: [
          <Switch
            disabled={submiting}
            checkedChildren={i18n.formatMessage({
              id: 'page.account.settings.settings.open',
              defaultMessage: 'Open',
            })}
            unCheckedChildren={i18n.formatMessage({
              id: 'page.account.settings.settings.close',
              defaultMessage: 'Close',
            })}
            defaultChecked={configData[k]}
            onChange={value => {
              let obj = {};
              obj[k] = value;
              handleSubmit(obj);
            }}
          />,
        ],
      });
    }
    return arr;
  }, [configData]);
  if (loading || !configData) {
    return <PageLoading />;
  }
  return <ConfigListView data={getData() || []} />;
};
export default NotificationView;
