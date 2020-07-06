// 主页面

import React, { useState, useRef } from 'react';
import { useRequest, useIntl } from 'umi';
import ProTable, { ActionType } from '@ant-design/pro-table';

import warpToolBar from './components/WarpToolBar';
import { QueryTableItem, QueryParams, QuerySort, QueryFilter } from './data';
import { queryTableList } from './service';
import { createColumns } from './columns';
import styles from './index.less';

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
  const columns = createColumns({ i18n, actionRef });

  return (
    //<PageHeaderWrapper className={styles.pageHeader}>
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
        warpToolBar(action, rows, { i18n, actionRef })
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
    //</PageHeaderWrapper>
  );
};

export default DefaultView;
