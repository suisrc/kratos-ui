import React, { ReactNode } from 'react';
import { IntlShape, FormattedMessage } from 'umi';

import { Tooltip } from 'antd';
import { Rule } from 'antd/es/form';

import { InfoCircleOutlined, CloseOutlined } from '@ant-design/icons';

import styles from '../index.less';

export interface FormItemProps {
  key: string;
  props?: {
    label?: string | ReactNode;
    name?: string;
    rules?: Rule[];
    [key: string]: any;
  };
  formItemProps?: {
    placeholder?: string;
    [key: string]: any;
  };
  child?: React.ReactNode;
  valueEnum?: {
    [key: string]: any;
  };
  valueType?: 'submit' | 'string' | 'number' | 'text';
  label?: string;
  formatGet?: (value: any) => any;
  formatSet?: (value: any) => any;
}

export const createFormItems = (
  i18n: IntlShape,
  ref: { [key: string]: any },
): FormItemProps[] => {
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
        rules: [
          {
            required: true,
            message: '请选择处理方式',
          },
        ],
      },
      valueEnum: {
        true: i18n.formatMessage({
          id: 'page.system.gateway.table.allow.allow',
          defaultMessage: 'Allow',
        }),
        false: i18n.formatMessage({
          id: 'page.system.gateway.table.allow.block',
          defaultMessage: 'Block',
        }),
      },
      formatGet: text => (text ? 'true' : 'false'),
      formatSet: text => (text === 'true' ? true : false),
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
      formatGet: text => (!text ? undefined : text.join('\n')),
      formatSet: text => (!text ? undefined : text.trim().split('\n')),
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
      formatGet: text => (!text ? undefined : text.join('\n')),
      formatSet: text => (!text ? undefined : text.trim().split('\n')),
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
