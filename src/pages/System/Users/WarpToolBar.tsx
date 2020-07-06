// 涉及所有的请求操作内容
import React, { useState } from 'react';

import {
  UseFetchDataAction,
  RequestData,
} from '@ant-design/pro-table/lib/useFetchData';

import { IntlShape } from 'umi';
import { Button, Dropdown, Menu, message, Modal, Form } from 'antd';
import {
  PlusOutlined,
  DownOutlined,
  ImportOutlined,
  ExportOutlined,
  DeleteOutlined,
  TagsOutlined,
} from '@ant-design/icons';

//import { FormItemProps } from '@/components/BasicEditForm';
import { EditFormViewProps } from '@/components/Modal';

import { QueryTableItem } from './data';

const warpToolBar = (
  i18n: IntlShape,
  action: UseFetchDataAction<any>,
  rows: {
    selectedRowKeys?: React.ReactText[] | undefined;
    selectedRows?: QueryTableItem[] | undefined;
  },
  services?: {
    newRow: () => void;
    removeRows: (items: QueryTableItem[]) => void;
    newTags: (tags: string[], ids: string[]) => void;
    [key: string]: any;
  },
  ref?: {
    setEditFormShow: (show: boolean) => void;
    setEditFormProps: (props: EditFormViewProps) => void;
  },
) => {
  const removeRows = (items: QueryTableItem[]) => {
    Modal.confirm({
      title: '批量删除',
      content: '确认同时删除这些数据吗?',
      onOk: () => {
        services?.removeRows(items);
      },
    });
  };
  //===========================================================
  const openConfigTags = (items: QueryTableItem[]) => {
    ref?.setEditFormProps({
      data: {},
      createFormItemProps: i18n => [
        {
          props: {
            label: '标签',
            name: 'tags',
            rules: [
              {
                required: true,
                message: '请输入标签',
              },
            ],
          },
          valueType: 'string',
          customLayout: true,
          renderHeader: () => (
            <div style={{ marginBottom: 10 }}>多个标签请使用","进行分割</div>
          ),
          valueFormatter: (v: string) => v.trim().split(','),
        },
      ],
      modalProps: {
        title: '标签编辑',
        okText: '提交',
      },
      submit: (value: any) => {
        //console.log(value);
        //console.log(items?.map(v => v.id));
        const ids: string[] = items?.map(v => v.id) as string[];
        services?.newTags(value.tags, ids);
        //setTimeout(() => form.resetFields, 0);
      },
      serviceKey: 'newTags', // 用于回调显示loading状态
    });
    ref?.setEditFormShow(true);
  };
  //===========================================================
  return [
    //<span>{contextHolder}</span>,
    <Button
      type="primary"
      onClick={() => services?.newRow && services.newRow()}
    >
      <PlusOutlined />{' '}
      {i18n.formatMessage({
        id: 'page.system.users.toolbar.new.text',
        defaultMessage: 'New',
      })}
    </Button>,
    <Dropdown
      overlay={
        <Menu
          onClick={e => {
            if (e.key === 'import') {
              message.info('导入功能暂未开放');
            } else if (e.key === 'export') {
              message.info('导入功能暂未开放');
            }
          }}
        >
          <Menu.Item key="import">
            <ImportOutlined />
            &nbsp;
            {i18n.formatMessage({
              id: 'page.system.users.toolbar.import.text',
              defaultMessage: 'Import',
            })}
          </Menu.Item>
          <Menu.Item key="export">
            <ExportOutlined />
            &nbsp;
            {i18n.formatMessage({
              id: 'page.system.users.toolbar.export.text',
              defaultMessage: 'Export',
            })}
          </Menu.Item>
        </Menu>
      }
    >
      <Button>
        {i18n.formatMessage({
          id: 'page.system.users.toolbar.operations.text',
          defaultMessage: '更多操作',
        })}
        &nbsp;
        <DownOutlined />
      </Button>
    </Dropdown>,
    rows?.selectedRows && rows.selectedRows.length > 0 && (
      <Dropdown
        overlay={
          <Menu
            onClick={e => {
              if (e.key === 'remove') {
                removeRows(rows?.selectedRows || []);
              } else if (e.key === 'tags') {
                openConfigTags(rows?.selectedRows || []);
              }
            }}
            selectedKeys={[]}
          >
            <Menu.Item key="remove">
              <DeleteOutlined />
              &nbsp;
              {i18n.formatMessage({
                id: 'page.system.users.toolbar.delete.text',
                defaultMessage: 'Delete',
              })}
            </Menu.Item>
            <Menu.Item key="tags">
              <TagsOutlined />
              &nbsp;
              {i18n.formatMessage({
                id: 'page.system.users.toolbar.tags.text',
                defaultMessage: 'Tags',
              })}
            </Menu.Item>
          </Menu>
        }
      >
        <Button>
          {i18n.formatMessage({
            id: 'page.system.users.toolbar.batch.text',
            defaultMessage: 'Batch',
          })}
          &nbsp;
          <DownOutlined />
        </Button>
      </Dropdown>
    ),
  ];
};

export default warpToolBar;
