import React from 'react';
import { FormattedMessage } from 'umi';
import { ColumnType } from 'antd/es/table';
import { QueryData } from './data';

const createColumns: () => ColumnType<QueryData>[] = () => {
  return [
    {
      title: (
        <FormattedMessage
          defaultMessage="Name"
          id="page.system.gateway.table.name.title"
        />
      ),
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: (
        <FormattedMessage
          defaultMessage="Email"
          id="page.system.gateway.table.email.title"
        />
      ),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: (
        <FormattedMessage
          defaultMessage="Address"
          id="page.system.gateway.table.address.title"
        />
      ),
      dataIndex: 'address',
      key: 'address',
    },
  ];
};

export default createColumns;
