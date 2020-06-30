import React from 'react';
import { FormattedMessage, IntlShape } from 'umi';
import { ProColumns } from '@ant-design/pro-table';

import { Tag, Switch, Popconfirm, Space, Divider } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { QueryTableItem } from './data';
import styles from './index.less';

import { primaryColor } from '@/models/useAuthUser';
//https://protable.ant.design/getting-started
// 这里使用pro-table取代umijs中的table
// https://protable.ant.design/api#columns
export const createColumns = (
  i18n: IntlShape,
  actions?: {
    removeRow?: (item: QueryTableItem) => void;
    editRow?: (item: QueryTableItem) => void;
    gotoRole?: (key: string) => void;
    gotoGateway?: (key: string) => void;
    [key: string]: any;
  },
): ProColumns<QueryTableItem>[] => {
  return [
    {
      order: 30,
      title: i18n.formatMessage({
        id: 'page.system.users.table.unique.title',
        defaultMessage: 'Unique',
      }),
      dataIndex: 'unique',
      key: 'unique',
      render: (text, record) => (
        //<Link to={`/system/gateway/edit?id=${record.id}`}>{text}</Link>
        <a //href="#"
          onClick={() => !!actions?.editRow && actions.editRow(record)}
        >
          {text}
        </a>
      ),
    },
    {
      title: (
        <FormattedMessage
          id="page.system.users.table.name.title"
          defaultMessage="Name"
        />
      ),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: (
        <FormattedMessage
          id="page.system.users.table.nickname.title"
          defaultMessage="Nickname"
        />
      ),
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.users.table.roles.title',
        defaultMessage: 'Role',
      }),
      dataIndex: 'roles',
      key: 'role',
      render: (_, record) => (
        <>
          {record.roles.map((tag, idx) => (
            <Tag color={primaryColor} key={idx}>
              <a onClick={() => !!actions?.gotoRole && actions.gotoRole(tag)}>
                {tag}
              </a>
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.users.table.gateway.title',
        defaultMessage: 'Role',
      }),
      dataIndex: 'gateways',
      key: 'gateway',
      render: (_, record) => (
        <>
          {record.gateways.map((tag, idx) => (
            <Tag color={primaryColor} key={idx}>
              <a
                onClick={() =>
                  !!actions?.gotoGateway && actions.gotoGateway(tag)
                }
              >
                {tag}
              </a>
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.users.table.createAt.title',
        defaultMessage: 'JoinInTime',
      }),
      valueType: 'dateTimeRange',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.users.table.action.title',
        defaultMessage: 'Action',
      }),
      key: 'action',
      valueType: 'option',
      dataIndex: 'id',
      render: (_, record) => (
        <>
          <span className={styles.operating}>
            <a // href="#"
              onClick={() => !!actions?.editRow && actions.editRow(record)}
            >
              {<EditOutlined />}
            </a>
          </span>
          <span className={styles.operating}>
            <Popconfirm
              title={i18n.formatMessage({
                id: 'page.system.users.table.action.delete.message',
                defaultMessage: 'Are you sure delete this row?',
              })}
              onConfirm={() =>
                !!actions?.removeRow && actions.removeRow(record)
              }
            >
              <a href="#">
                <DeleteOutlined />
              </a>
            </Popconfirm>
          </span>
        </>
      ),
    },
  ];
};
