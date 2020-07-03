// 主页面

import React, { useState, useRef } from 'react';
import { useRequest, useIntl } from 'umi';
import ProTable, { ActionType } from '@ant-design/pro-table';

import warpToolBar from './WarpToolBar';
import { QueryTableItem, QueryParams, QuerySort, QueryFilter } from './data';
import { queryTableList, createViewService } from './service';
import { createColumns } from './columns';
import styles from './index.less';
import EditView from './components/EditView';

// https://protable.ant.design/getting-started
// https://protable.ant.design/api#table
const DefaultView = () => {
  const i18n = useIntl();
  const [pageSign, setPageSign] = useState(undefined);

  const actionRef = useRef<ActionType>();
  const { run: queryTableItems } = useRequest(
    (params: QueryParams, sort: QuerySort, filter: QueryFilter) =>
      queryTableList({ ...params, pageSign }, sort, filter),
    {
      manual: true,
      formatResult: (res: any) => {
        if (res?.data?.sign) {
          setPageSign(res.data.sign);
        }
        return {
          data: res?.data?.list || [],
          total: res?.data?.total || 0,
          success: !!res?.success,
        };
      },
    },
  );

  const [editItem, setEditItem] = useState(undefined);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const services = createViewService(i18n, {
    actionRef,
    setEditItem,
    setEditModalVisible,
  });
  const columns = createColumns(i18n, services);
  //根据需求,createColumns中需要使用use方法,所以无法使用useState嵌套
  //如果使用useState,意味着colums中的内容不在改变
  //const [columns] = useState(() => createColumns(i18n, actions)); //  只加载一次

  return (
    //<PageHeaderWrapper className={styles.pageHeader}>
    <div>
      <ProTable<QueryTableItem>
        //headerTitle="网关管理"
        //dataSource onSubmit onReset loading
        className={styles.container}
        actionRef={actionRef}
        rowKey="id"
        pagination={{
          defaultPageSize: 20,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        request={queryTableItems}
        toolBarRender={(action, rows) =>
          warpToolBar(i18n, action, rows, services)
        }
        tableAlertRender={false}
        //tableAlertRender={({ selectedRowKeys, selectedRows }) => (
        //  <div>已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>&nbsp;项&nbsp;</div>
        //)}
        columns={columns}
        rowSelection={{}}
        search={true}
        //options={{
        //  density: false,
        //  fullScreen: false,
        //}}
      />
      <EditView
        data={editItem}
        setData={setEditItem}
        editModalVisible={editModalVisible}
        closeModalVisible={(reload?: boolean) => {
          reload && actionRef.current?.reloadAndRest();
          setEditModalVisible(false);
        }}
        refFormItemParams={{ services }}
      />
    </div>
    //</PageHeaderWrapper>
  );
};

export default DefaultView;
