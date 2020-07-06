import React, { useState } from 'react';

import { IntlShape, FormattedMessage } from 'umi';
import { Tooltip, Card } from 'antd';

import { InfoCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import BasicEditForm, { FormItemProps } from '@/components/BasicEditForm';

import {
  postNewTableItem,
  postEditTableItem,
  queryTableItem,
} from '../service';

import styles from '../index.less';
import { getPageQuery } from '@/utils/utils';

const createFormItemProps = (ref: {
  i18n: IntlShape;
  //[key: string]: any;
}): FormItemProps[] => {
  const {} = ref;
  return [
    {
      key: 'unique',
      props: {
        label: (
          <span>
            <FormattedMessage id="page.system.gateway.edit.unique.title" />
            &nbsp;
            <em className={styles.optional}>
              <Tooltip
                title={
                  <FormattedMessage id="page.system.gateway.edit.unique.tooltip" />
                }
              >
                <InfoCircleOutlined style={{ marginRight: 4 }} />
              </Tooltip>
            </em>
          </span>
        ),
        name: 'unique',
        rules: [
          {
            required: true,
            message: '请输入网关唯一标识',
          },
        ],
      },
      valueType: 'string',
    },
    {
      key: 'name',
      props: {
        label: '名称',
        name: 'name',
        rules: [
          {
            required: true,
            message: '请输入网关名称',
          },
        ],
      },
      valueType: 'string',
    },
    {
      key: 'allow',
      props: {
        label: '允许/阻止',
        name: 'allow',
      },
      valueType: 'switch',
      formItemProps: {
        defaultChecked: true,
      },
      //valueEnum: {
      //  true: i18n.formatMessage({
      //    id: 'page.system.gateway.table.allow.allow',
      //    defaultMessage: 'Allow',
      //  }),
      //  false: i18n.formatMessage({
      //    id: 'page.system.gateway.table.allow.block',
      //    defaultMessage: 'Block',
      //  }),
      //},
      //valueParser: text => (text === true ? 'true' : 'false'),
      //valueFormatter: text => (text === 'true' ? true : false),
    },
    {
      key: 'priority',
      props: {
        label: '优先级',
        name: 'priority',
        rules: [
          {
            required: true,
            message: '请输入优先级',
          },
        ],
      },
      valueType: 'number',
    },
    {
      key: 'methods',
      props: {
        label: '方法',
        name: 'methods',
      },
      formItemProps: {
        allowClear: true,
        clearIcon: <CloseOutlined />,
        mode: 'multiple',
        placeholder: '不填,所有方法有效',
      },
      valueEnum: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
      },
    },
    {
      key: 'domains',
      props: {
        label: '域名',
        name: 'domains',
      },
      formItemProps: {
        style: { minHeight: 32 },
        rows: 4,
        placeholder: '不填,所有域名有效,每条规则一行',
      },
      valueType: 'text',
      valueParser: text => (!text ? undefined : text.join('\n')),
      valueFormatter: text => (!text ? undefined : text.trim().split('\n')),
    },
    {
      key: 'paths',
      props: {
        label: '路径',
        name: 'paths',
      },
      formItemProps: {
        style: { minHeight: 32 },
        rows: 4,
        placeholder: '不填,所有路径有效,每条规则一行',
      },
      valueType: 'text',
      valueParser: text => (!text ? undefined : text.join('\n')),
      valueFormatter: text => (!text ? undefined : text.trim().split('\n')),
    },
    {
      key: 'netmask',
      props: {
        label: '网络掩码',
        name: 'netmask',
      },
      formItemProps: {
        placeholder: '不填,所有IP有效',
      },
      valueType: 'string',
    },
    {
      key: 'submit',
      valueType: 'submit',
    },
  ];
};

export default () => {
  const [title, setTitle] = useState('');
  const { id } = getPageQuery() || {};
  return (
    <PageHeaderWrapper title={title || 'Loading'} className={styles.pageHeader}>
      <Card bordered={false}>
        <BasicEditForm
          dataId={id as string}
          {...{
            createFormItemProps,
            queryTableItem,
            postNewTableItem,
            postEditTableItem,
          }}
          titleSetter={setTitle}
        />
      </Card>
    </PageHeaderWrapper>
  );
};
