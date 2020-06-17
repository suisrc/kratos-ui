import { FormattedMessage, useIntl, useRequest } from 'umi';

import { AppstoreOutlined } from '@ant-design/icons';
import { getIcon } from '@/components/IconFont';

import { List } from 'antd';
import React, { Fragment } from 'react';
import { queryUserBinding } from '../service';
import PageLoading from '@/components/PageLoading';
import { ConfigBinding, PlatformBinding } from '../data';

const BindingView: React.FC = () => {
  const i18n = useIntl();

  const {
    data,
    loading,
  }: {
    data: ConfigBinding;
    loading: boolean;
  } = useRequest(queryUserBinding);

  if (loading || !data?.platforms) {
    return <PageLoading />;
  }
  return (
    <Fragment>
      <List<PlatformBinding>
        itemLayout="horizontal"
        dataSource={data?.platforms || []}
        renderItem={item => (
          <List.Item
            actions={[
              <a key="Bind">
                <FormattedMessage
                  id="page.account.settings.binding.bind"
                  defaultMessage="Bind"
                />
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                getIcon(item.avatar, 'default-app-binding') || (
                  <AppstoreOutlined className="default-app-binding" />
                )
              }
              title={i18n.formatMessage(
                { id: 'page.account.settings.binding.binding' },
                { name: item.name },
              )}
              description={i18n.formatMessage(
                { id: 'page.account.settings.binding.binding.description' },
                { name: item.name },
              )}
            />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default BindingView;
