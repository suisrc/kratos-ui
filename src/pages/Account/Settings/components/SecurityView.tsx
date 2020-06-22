import { FormattedMessage, useIntl, useRequest, Link } from 'umi';
import { Modal } from 'antd';
import React, { useCallback, useState } from 'react';

import { ModalFuncProps } from 'antd/es/modal';

import PageLoading from '@/components/PageLoading';
import ConfigListView from '@/components/List/Config';

import { queryUserSecurity } from '../service';
import { ConfigSecurity } from '../data';

const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage
        id="page.account.settings.security.strong"
        defaultMessage="Strong"
      />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage
        id="page.account.settings.security.medium"
        defaultMessage="Medium"
      />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage
        id="page.account.settings.security.weak"
        defaultMessage="Weak"
      />
    </span>
  ),
};

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

const SecurityView: React.FC = () => {
  const i18n = useIntl();
  const [modal, contextHolder] = Modal.useModal();

  const {
    data: configData,
    loading,
  }: {
    data: ConfigSecurity;
    loading: boolean;
  } = useRequest(queryUserSecurity);

  const getData = useCallback(() => {
    return [
      {
        title: i18n.formatMessage({
          id: 'page.account.settings.security.password',
        }),
        description: (
          <>
            {i18n.formatMessage({
              id: 'page.account.settings.security.password.description',
            })}
            {': '}
            {passwordStrength[configData?.password]}
          </>
        ),
        actions: [
          <Link key="Modify" to="/account/change/password">
            <FormattedMessage
              id="page.account.settings.security.modify"
              defaultMessage="Modify"
            />
          </Link>,
        ],
      },
      {
        title: i18n.formatMessage({
          id: 'page.account.settings.security.phone',
        }),
        description: `${i18n.formatMessage({
          id: 'page.account.settings.security.phone.description',
        })}:
        ${configData?.phone}`,
        actions: [
          <Link key="Modify" to="/account/change/phone">
            <FormattedMessage
              id="page.account.settings.security.modify"
              defaultMessage="Modify"
            />
          </Link>,
        ],
      },
      {
        title: i18n.formatMessage({
          id: 'page.account.settings.security.email',
        }),
        description: `${i18n.formatMessage({
          id: 'page.account.settings.security.email.description',
        })}:
        ${configData?.email}`,
        actions: [
          <Link key="Modify" to="/account/change/email">
            <FormattedMessage
              id="page.account.settings.security.modify"
              defaultMessage="Modify"
            />
          </Link>,
        ],
      },
      {
        title: i18n.formatMessage({
          id: 'page.account.settings.security.mfa',
        }),
        description: i18n.formatMessage({
          id: 'page.account.settings.security.mfa.description',
        }),
        actions: [
          <a key="bind" onClick={() => modal.confirm(config)}>
            <FormattedMessage
              id="page.account.settings.security.bind"
              defaultMessage="Bind"
            />
          </a>,
        ],
      },
    ];
  }, [configData]);

  if (loading || !configData) {
    return <PageLoading />;
  }
  return (
    <>
      <WarnUnImplementContext.Provider value="">
        <ConfigListView data={getData() || []} />
        {contextHolder}
      </WarnUnImplementContext.Provider>
    </>
  );
};

export default SecurityView;
