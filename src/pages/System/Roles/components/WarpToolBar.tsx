// 涉及所有的请求操作内容
import React from 'react';

import { UseFetchDataAction } from '@ant-design/pro-table/lib/useFetchData';

import { IntlShape, useRequest, history } from 'umi';
import { Button, Dropdown, Menu, Modal } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';

import { QueryTableItem } from '../data';
import { postRemoveTableItem } from '../service';

const warpToolBar = (
  _: UseFetchDataAction<any>,
  rows: {
    selectedRowKeys?: React.ReactText[] | undefined;
    selectedRows?: QueryTableItem[] | undefined;
  },
  ref: {
    i18n: IntlShape;
    actionRef: any;
  },
) => {
  const { i18n, actionRef } = ref;
  //===========================================================
  const newRow = () => {
    history.push('/system/roles/edit?id=');
  };
  //===========================================================
  const { run: removeRowsByIds } = useRequest(postRemoveTableItem, {
    manual: true,
    onSuccess: _ => actionRef?.current?.reloadAndRest(),
  });
  const removeRows = (items: QueryTableItem[]) => {
    const modal = Modal.confirm({
      title: '批量删除',
      content: '确认同时删除这些数据吗?',
      okText: '删除',
      onOk: async () => {
        modal.update({ okButtonProps: { loading: true } });
        await removeRowsByIds(items.map(v => v.id as string));
        modal.update({ okButtonProps: { loading: false } });
      },
    });
  };
  return [
    <Button type="primary" onClick={newRow}>
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
              if (e.key === 'remove') {
                removeRows(rows?.selectedRows || []);
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
