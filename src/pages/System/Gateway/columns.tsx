import React from 'react';
import { FormattedMessage, IntlShape } from 'umi';
import { ProColumns } from '@ant-design/pro-table';

import { Tag, Switch, Popconfirm, Space, Divider } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import { useRequest, history } from 'umi';

import { QueryTableItem } from './data';
import { postRemoveTableItem } from './service';

import styles from './index.less';

// https://ant.design/components/tag-cn/
const colors = {
  GET: 'blue',
  POST: 'green',
  PUT: 'orange',
  DELETE: 'red',
  DEF: 'purple',
  DOMAIN: 'blue',
};

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
    history.push(`/system/gateway/edit?id=${item.id}`);
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
        id: 'page.system.gateway.table.unique.title',
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
          id="page.system.gateway.table.name.title"
          defaultMessage="Name"
        />
      ),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.gateway.table.method.title',
        defaultMessage: 'Method',
      }),
      dataIndex: 'methods',
      key: 'method',
      filters: undefined,
      valueEnum: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
      },
      formItemProps: {
        allowClear: true,
        clearIcon: <CloseOutlined />,
        mode: 'multiple',
      },
      render: (_, record) => (
        <>
          {record.methods?.length ? (
            record.methods.map((tag, idx) => (
              <Tag color={colors[tag] || colors.DEF} key={idx}>
                {tag || '*'}
              </Tag>
            ))
          ) : (
            <Tag color={colors.DEF} key={0}>
              *
            </Tag>
          )}
        </>
      ),
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.gateway.table.domain.title',
        defaultMessage: 'Domain',
      }),
      dataIndex: 'domains',
      key: 'domain',
      render: (_, record) => (
        <>
          {record.domains?.length
            ? record.domains.map((item, idx) => (
                <span key={idx}>
                  {item}
                  <br />
                </span>
              ))
            : '*'}
        </>
      ),
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.gateway.table.path.title',
        defaultMessage: 'Path',
      }),
      dataIndex: 'paths',
      key: 'path',
      render: (_, record) => (
        <>
          {record.paths?.length
            ? record.paths.map((item, idx) => (
                <span key={idx}>
                  {item}
                  <br />
                </span>
              ))
            : '*'}
        </>
      ),
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.gateway.table.priority.title',
        defaultMessage: 'Priority',
      }),
      dataIndex: 'priority',
      key: 'priority',
      sorter: true,
      //defaultSortOrder: 'ascend',
      hideInSearch: true,
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.gateway.table.netmask.title',
        defaultMessage: 'Netmask',
      }),
      dataIndex: 'netmask',
      key: 'netmask',
      // hideInTable: true,
    },
    {
      order: 20,
      title: i18n.formatMessage({
        id: 'page.system.gateway.table.allow.title',
        defaultMessage: 'Allow',
      }),
      dataIndex: 'allow',
      key: 'allow',
      //sorter: true,
      filters: undefined,
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
      formItemProps: {
        allowClear: true,
        clearIcon: <CloseOutlined />,
      },
      render: (_, record) => (
        <Switch
          checked={!!record.allow}
          //disabled
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      ),
    },
    //{
    //  title: i18n.formatMessage({
    //    id: 'page.system.gateway.table.updateAt.title',
    //    defaultMessage: 'UpdateAt',
    //  }),
    //  dataIndex: 'updateAt',
    //  key: 'updateAt',
    //},
    //{
    //  title: i18n.formatMessage({
    //    id: 'page.system.gateway.table.createAt.title',
    //    defaultMessage: 'CreateAt',
    //  }),
    //  dataIndex: 'createAt',
    //  key: 'createAt',
    //},
    {
      title: i18n.formatMessage({
        id: 'page.system.gateway.table.action.title',
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
                id: 'page.system.gateway.table.action.delete.message',
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
