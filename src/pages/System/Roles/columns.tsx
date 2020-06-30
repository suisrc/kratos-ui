import React from 'react';
import { FormattedMessage, IntlShape } from 'umi';
import { ProColumns } from '@ant-design/pro-table';

import { Tag, Switch, Popconfirm, Space, Divider } from 'antd';
import { DeleteOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';

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
    [key: string]: any;
  },
): ProColumns<QueryTableItem>[] => {
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
          onClick={() => !!actions?.editRow && actions.editRow(record)}
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
              onClick={() => !!actions?.editRow && actions.editRow(record)}
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
