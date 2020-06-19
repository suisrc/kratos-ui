import { FormattedMessage, useIntl, useRequest } from 'umi';

import React, { useCallback } from 'react';

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

const SecurityView: React.FC = () => {
  const i18n = useIntl();

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
          <a key="Modify">
            <FormattedMessage
              id="page.account.settings.security.modify"
              defaultMessage="Modify"
            />
          </a>,
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
          <a key="Modify">
            <FormattedMessage
              id="page.account.settings.security.modify"
              defaultMessage="Modify"
            />
          </a>,
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
          <a key="Modify">
            <FormattedMessage
              id="page.account.settings.security.modify"
              defaultMessage="Modify"
            />
          </a>,
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
          <a key="bind">
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
  return <ConfigListView data={getData() || []} />;
};

export default SecurityView;
