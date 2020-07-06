import React from 'react';
import { FormattedMessage, IntlShape, history, useRequest } from 'umi';
import { ProColumns } from '@ant-design/pro-table';

import { Tag, Switch, Popconfirm, Space, Divider, message } from 'antd';
import { DeleteOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';

import { QueryTableItem } from './data';
import { postRemoveTableItem } from './service';
import styles from './index.less';

import { primaryColor } from '@/models/useAuthUser';
//https://protable.ant.design/getting-started
// 这里使用pro-table取代umijs中的table
// https://protable.ant.design/api#columns
export const createColumns = (
  i18n: IntlShape,
  ref?: any,
): ProColumns<QueryTableItem>[] => {
  //=======================================================
  const { run: removeRowsByIds } = useRequest(
    (ids: string[]) => postRemoveTableItem(ids),
    {
      manual: true,
      onSuccess: _ => ref?.actionRef?.current?.reloadAndRest(),
    },
  );
  //=======================================================
  const editRow = (item: QueryTableItem) => {
    history.push(`/system/users/edit?id=${item.id}`);
  };
  const removeRow = (item: QueryTableItem) => {
    removeRowsByIds([item.id as string]);
  };
  const gotoRole = (key: string) => {
    history.push(`/system/roles/edit?id=${key}`);
  };
  //=======================================================

  //=======================================================
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
          onClick={() => editRow(record)}
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
        id: 'page.system.users.table.tag.title',
        defaultMessage: 'Tag',
      }),
      dataIndex: 'tags',
      key: 'tag',
      render: (_, record) => (
        <>
          {record.tags &&
            record.tags.map((tag, idx) => (
              <Tag color={primaryColor} key={idx}>
                {tag.name}&nbsp;
                <a onClick={() => message.info('功能正在开发中')}>
                  <CloseOutlined />
                </a>
              </Tag>
            ))}
        </>
      ),
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.users.table.role.title',
        defaultMessage: 'Role',
      }),
      dataIndex: 'roles',
      key: 'role',
      render: (_, record) => (
        <>
          {record.roles &&
            record.roles.map((tag, idx) => (
              <Tag color={primaryColor} key={idx}>
                <a onClick={() => gotoRole(tag.id)}>{tag.name}</a>
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
              onClick={() => editRow(record)}
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
              onConfirm={() => removeRow(record)}
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
