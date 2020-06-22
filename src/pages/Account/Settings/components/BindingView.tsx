import { FormattedMessage, useIntl, useRequest } from 'umi';

import { AppstoreOutlined } from '@ant-design/icons';
import { getIcon } from '@/components/IconFont';

import { List, Modal } from 'antd';
import React, { Fragment } from 'react';

import { ModalFuncProps } from 'antd/es/modal';

import { queryUserBinding, postUserBinding } from '../service';
import PageLoading from '@/components/PageLoading';
import { ConfigBinding, PlatformBinding } from '../data';

const WarnUnImplementContext: React.Context<any> = React.createContext({});
const config: ModalFuncProps = {
  title: '说明',
  content: (
    <div>
      <WarnUnImplementContext.Consumer>
        {() => '功能暂未开放...'}
      </WarnUnImplementContext.Consumer>
    </div>
  ),
};

const BindingView: React.FC = () => {
  const i18n = useIntl();
  const [modal, contextHolder] = Modal.useModal();

  const {
    data,
    loading,
  }: {
    data: ConfigBinding;
    loading: boolean;
  } = useRequest(queryUserBinding);

  //const { run: handleSubmit, loading: submiting } = useRequest(postUserBinding,
  //  {
  //    manual: true,
  //    onSuccess: (data, params) => {
  //    },
  //  },
  //);

  if (loading || !data?.platforms) {
    return <PageLoading />;
  }
  return (
    <Fragment>
      <WarnUnImplementContext.Provider value="">
        {contextHolder}
        <List<PlatformBinding>
          itemLayout="horizontal"
          dataSource={data?.platforms || []}
          renderItem={item => (
            <List.Item
              actions={[
                <a key="Bind" onClick={() => modal.confirm(config)}>
                  <FormattedMessage
                    id="page.account.settings.binding.bind"
                    defaultMessage="Bind"
                  />
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  getIcon(item.icon, 'default-app-binding') || (
                    <AppstoreOutlined className="default-app-binding" />
                  )
                }
                title={i18n.formatMessage(
                  { id: 'page.account.settings.binding.binding' },
                  { name: item.title },
                )}
                description={i18n.formatMessage(
                  { id: 'page.account.settings.binding.binding.description' },
                  { name: item.title },
                )}
              />
            </List.Item>
          )}
        />
      </WarnUnImplementContext.Provider>
    </Fragment>
  );
};

export default BindingView;
