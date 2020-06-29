import React from 'react';
import { FormattedMessage, Link, IntlShape } from 'umi';
import { ColumnType } from 'antd/es/table';

import { Input, Tag, Switch, Select, Divider } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import { QueryTableItem } from '../data';

import styles from '../index.less';

// https://ant.design/components/tag-cn/
const colors = {
  GET: 'blue',
  POST: 'green',
  PUT: 'orange',
  DELETE: 'red',
  DEF: 'purple',
  DOMAIN: 'blue',
};
const createColumns: (
  i18n: IntlShape,
) => ColumnType<QueryTableItem>[] = i18n => {
  return [
    {
      title: i18n.formatMessage({
        id: 'page.system.gateway.table.unique.title',
        defaultMessage: 'Unique',
      }),
      //condition: <Input />,
      dataIndex: 'unique',
      key: 'unique',
      render: (text, record) => (
        <Link to={`/system/gateway/edit?id=${record.id}`}>{text}</Link>
      ),
    },
    {
      title: (
        <FormattedMessage
          id="page.system.gateway.table.name.title"
          defaultMessage="Name"
        />
      ),
      //condition: <Input />,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.gateway.table.method.title',
        defaultMessage: 'Method',
      }),
      condition: (
        <Select allowClear mode="multiple">
          <Select.Option value="GET">GET</Select.Option>
          <Select.Option value="POST">POST</Select.Option>
          <Select.Option value="PUT">PUT</Select.Option>
          <Select.Option value="DELETE">DELETE</Select.Option>
        </Select>
      ),
      dataIndex: 'methods',
      key: 'method',
      render: (methods: string[]) => (
        <>
          {methods?.length ? (
            methods.map(tag => (
              <Tag color={colors[tag] || colors.DEF} key={tag || 'def'}>
                {tag || '*'}
              </Tag>
            ))
          ) : (
            <Tag color={colors.DEF} key="def">
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
      //condition: <Input />,
      dataIndex: 'domains',
      key: 'domain',
      //render: (domains: string[]) =>
      //  domains?.length
      //    ? domains.reduce((pre, cur, idx) => pre + (idx ? '|' : '') + cur, '')
      //    : '*',
      render: (domains: string[]) => (
        <div>
          {domains?.length
            ? domains.map(item => (
                <>
                  <span>{item}</span>
                  <br />
                </>
              ))
            : '*'}
        </div>
      ),
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.gateway.table.path.title',
        defaultMessage: 'Path',
      }),
      //condition: <Input />,
      dataIndex: 'paths',
      key: 'path',
      renderText: (paths: string[]) => (
        <div>
          {paths?.length
            ? paths.map(item => (
                <>
                  <span>{item}</span>
                  <br />
                </>
              ))
            : '*'}
        </div>
      ),
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.gateway.table.priority.title',
        defaultMessage: 'Priority',
      }),
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.gateway.table.netmask.title',
        defaultMessage: 'Netmask',
      }),
      //condition: <Input />,
      dataIndex: 'netmask',
      key: 'netmask',
    },
    {
      title: i18n.formatMessage({
        id: 'page.system.gateway.table.allow.title',
        defaultMessage: 'Allow',
      }),
      //condition: (
      //  <Select allowClear>
      //    <Select.Option value="true">
      //      <FormattedMessage
      //        id="page.system.gateway.condition.allow.allow"
      //        defaultMessage="Allow"
      //      />
      //    </Select.Option>
      //    <Select.Option value="false">
      //      <FormattedMessage
      //        id="page.system.gateway.condition.allow.block"
      //        defaultMessage="Block"
      //      />
      //    </Select.Option>
      //  </Select>
      //),
      dataIndex: 'allow',
      key: 'allow',
      render: (allow, record) => (
        <Switch
          defaultChecked={allow || true}
          disabled
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
      render: (_, record) => (
        <>
          <span className={styles.operating}>
            <Link to={`/system/gateway/edit?id=${record.id}`}>
              <EditOutlined />
            </Link>
          </span>
          <Divider type="vertical" />
          <span className={styles.operating}>
            <a>
              <DeleteOutlined />
            </a>
          </span>
        </>
      ),
    },
  ];
};

export default createColumns;
