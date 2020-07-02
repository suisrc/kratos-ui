// 涉及所有的请求操作内容
import React from 'react';

import {
  UseFetchDataAction,
  RequestData,
} from '@ant-design/pro-table/lib/useFetchData';

import { IntlShape } from 'umi';
import { Button, Dropdown, Menu } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';

import { QueryTableItem } from './data';

const warpToolBar = (
  i18n: IntlShape,
  action: UseFetchDataAction<RequestData<QueryTableItem>>,
  rows: {
    selectedRowKeys?: React.ReactText[] | undefined;
    selectedRows?: QueryTableItem[] | undefined;
  },
  services?: {
    newRow?: () => void;
    removeRows?: (items: QueryTableItem[]) => void;
    [key: string]: any;
  },
) => {
  return [
    <Button
      type="primary"
      onClick={() => services?.newRow && services.newRow()}
    >
      <PlusOutlined />{' '}
      {i18n.formatMessage({
        id: 'page.system.gateway.toolbar.new.text',
        defaultMessage: 'New',
      })}
    </Button>,
    rows?.selectedRows && rows.selectedRows.length > 0 && (
      <Dropdown
        overlay={
          <Menu
            onClick={e => {
              if (e.key === 'remove' && !!services?.removeRows) {
                services.removeRows(rows.selectedRows || []);
              }
            }}
            selectedKeys={[]}
          >
            <Menu.Item key="remove">
              {i18n.formatMessage({
                id: 'page.system.gateway.toolbar.delete.text',
                defaultMessage: 'Delete',
              })}
            </Menu.Item>
          </Menu>
        }
      >
        <Button>
          {i18n.formatMessage({
            id: 'page.system.gateway.toolbar.operations.text',
            defaultMessage: 'Batch',
          })}{' '}
          <DownOutlined />
        </Button>
      </Dropdown>
    ),
  ];
};

export default warpToolBar;
