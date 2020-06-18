import { List, Switch } from 'antd';
import React, { Fragment, useCallback } from 'react';

import { useIntl, useRequest } from 'umi';

import PageLoading from '@/components/PageLoading';

import { queryUserNotices, postUserNotices } from '../service';
import { ConfigNotification } from '../data';

type Unpacked<T> = T extends (infer U)[] ? U : T;

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
      arr.push({ key: k, value: configData[k] });
    }
    return arr as { key: string; value: boolean }[];
  }, [configData]);
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
          <List.Item
            actions={[
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
                defaultChecked={item.value}
                onChange={value => {
                  let obj = {};
                  obj[item.key] = value;
                  handleSubmit(obj);
                }}
              />,
            ]}
          >
            <List.Item.Meta
              title={i18n.formatMessage({
                id: `page.account.settings.notification.${item.key}`,
              })}
              description={i18n.formatMessage({
                id: `page.account.settings.notification.${item.key}.description`,
              })}
            />
          </List.Item>
        )}
      />
    </Fragment>
  );
};
export default NotificationView;
