import React, { useState, useEffect } from 'react';
import { IntlShape, useRequest } from 'umi';
import { ProColumns } from '@ant-design/pro-table';

import { Tag, Popconfirm } from 'antd';
import { CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

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
    kindLangs?: {};
    kindSystem?: {};
    [key: string]: any;
  },
): ProColumns<QueryTableItem>[] => {
  return [
    {
      hideInSearch: true,
      order: 30,
      title: i18n.formatMessage({
        id: 'page.system.language.table.id.title',
        defaultMessage: 'ID',
      }),
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <a onClick={() => !!actions?.editRow && actions.editRow(record)}>
          {text}
        </a>
      ),
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.language.table.key.title',
        defaultMessage: '标识',
      }),
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.language.table.value.title',
        defaultMessage: '内容',
      }),
      ellipsis: true,
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.language.table.lang.title',
        defaultMessage: '语言',
      }),
      dataIndex: 'lang',
      key: 'lang',
      filters: undefined,
      valueEnum: actions?.kindLangs || {},
      formItemProps: {
        allowClear: true,
        clearIcon: <CloseOutlined />,
        mode: 'multiple',
      },
      render: text => <Tag color={primaryColor}>{text}</Tag>,
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.language.table.system.title',
        defaultMessage: '系统',
      }),
      dataIndex: 'system',
      key: 'system',
      filters: undefined,
      valueEnum: actions?.kindSystem || {},
      formItemProps: {
        allowClear: true,
        clearIcon: <CloseOutlined />,
        mode: 'multiple',
      },
      render: (_, record) => (
        <>
          {record.system &&
            record.system.map((tag, idx) => (
              <Tag color={primaryColor} key={idx}>
                {tag}
              </Tag>
            ))}
        </>
      ),
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.language.table.createAt.title',
        defaultMessage: '创建时间',
      }),
      valueType: 'dateTimeRange',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.language.table.action.title',
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
                id: 'page.system.gateway.language.action.delete.message',
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
