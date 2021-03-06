import React from 'react';
import { FormattedMessage, IntlShape, history, useRequest } from 'umi';
import { ProColumns } from '@ant-design/pro-table';

import { Tag, Switch, Popconfirm, Space, Divider } from 'antd';
import { DeleteOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';

import { QueryTableItem } from './data';
import { postRemoveTableItem } from './service';
import styles from './index.less';

import { primaryColor } from '@/models/useAuthUser';
//https://protable.ant.design/getting-started
// 这里使用pro-table取代umijs中的table
// https://protable.ant.design/api#columns
export const createColumns = (ref: {
  i18n: IntlShape;
  actionRef: any;
}): ProColumns<QueryTableItem>[] => {
  const { i18n, actionRef } = ref;
  //=======================================================
  const { run: removeRowsByIds } = useRequest(
    (ids: string[]) => postRemoveTableItem(ids),
    {
      manual: true,
      onSuccess: _ => actionRef?.current?.reloadAndRest(),
    },
  );
  //=======================================================
  const editRow = (item: QueryTableItem) => {
    history.push(`/system/roles/edit?id=${item.id}`);
  };
  const removeRow = (item: QueryTableItem) => {
    removeRowsByIds([item.id as string]);
  };
  //=======================================================

  //=======================================================
  return [
    {
      order: 30,
      title: i18n.formatMessage({
        id: 'page.system.roles.table.unique.title',
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
          id="page.system.roles.table.name.title"
          defaultMessage="Name"
        />
      ),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.roles.table.tag.title',
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
                <a>
                  <CloseOutlined />
                </a>
              </Tag>
            ))}
        </>
      ),
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.roles.table.desc.title',
        defaultMessage: 'Description',
      }),
      ellipsis: true,
      hideInSearch: true,
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.roles.table.createAt.title',
        defaultMessage: 'CreateTime',
      }),
      valueType: 'dateTimeRange',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.roles.table.action.title',
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
                id: 'page.system.roles.table.action.delete.message',
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
