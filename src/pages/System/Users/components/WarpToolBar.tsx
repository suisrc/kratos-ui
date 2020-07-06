// 涉及所有的请求操作内容
import React, { useState } from 'react';

import { UseFetchDataAction } from '@ant-design/pro-table/lib/useFetchData';

import { IntlShape, useRequest, history } from 'umi';
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

import { QueryTableItem } from '../data';
import { postNewUserTags, postRemoveTableItem } from '../service';

const warpToolBar = (
  _: UseFetchDataAction<any>,
  rows: {
    selectedRowKeys?: React.ReactText[] | undefined;
    selectedRows?: QueryTableItem[] | undefined;
  },
  ref: {
    i18n: IntlShape;
    setEditFormShow: (show: boolean) => void;
    setEditFormProps: (props: EditFormViewProps) => void;
    actionRef: any;
    //[key: string]: any;
  },
) => {
  const { i18n, setEditFormShow, setEditFormProps, actionRef } = ref;
  //===========================================================
  const newRow = () => {
    history.push('/system/users/edit?id=');
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
  //===========================================================
  const openConfigTags = (items: QueryTableItem[]) => {
    // 🎊这是一种实验性的写法,在实际生产中,不推荐使用这种写法
    // 🎊最好使用常规写法,在components中新建一个Modal内容,可以继承BasicEditForm中的ModalEditForm.
    // 🎊注意,注意,注意.
    setEditFormProps({
      data: {},
      createFormItemProps: _ => [
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
      submit: (
        value: { [key: string]: any },
        submit: (...args: any[]) => Promise<any>,
      ) => {
        //console.log(value);
        //console.log(items?.map(v => v.id));
        const ids: string[] = items?.map(v => v.id) as string[];
        submit(value.tags, ids);
        //setTimeout(() => form.resetFields, 0);
      },
      request: postNewUserTags,
      onSubmitSuccess: () => {
        actionRef?.current?.reloadAndRest();
        setEditFormShow(false);
      },
    });
    setEditFormShow(true);
  };
  //===========================================================

  //===========================================================
  return [
    //<span>{contextHolder}</span>,
    <Button type="primary" onClick={newRow}>
      <PlusOutlined />{' '}
      {i18n.formatMessage({
        id: 'page.system.users.toolbar.new.text',
        defaultMessage: 'New',
      })}
    </Button>,
    //<Dropdown
    //  overlay={
    //    <Menu
    //      onClick={e => {
    //        if (e.key === 'import') {
    //          message.info('导入功能暂未开放');
    //        } else if (e.key === 'export') {
    //          message.info('导入功能暂未开放');
    //        }
    //      }}
    //    >
    //      <Menu.Item key="import">
    //        <ImportOutlined />
    //        &nbsp;
    //        {i18n.formatMessage({
    //          id: 'page.system.users.toolbar.import.text',
    //          defaultMessage: 'Import',
    //        })}
    //      </Menu.Item>
    //      <Menu.Item key="export">
    //        <ExportOutlined />
    //        &nbsp;
    //        {i18n.formatMessage({
    //          id: 'page.system.users.toolbar.export.text',
    //          defaultMessage: 'Export',
    //        })}
    //      </Menu.Item>
    //    </Menu>
    //  }
    //>
    //  <Button>
    //    {i18n.formatMessage({
    //      id: 'page.system.users.toolbar.operations.text',
    //      defaultMessage: '更多操作',
    //    })}
    //    &nbsp;
    //    <DownOutlined />
    //  </Button>
    //</Dropdown>,
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
