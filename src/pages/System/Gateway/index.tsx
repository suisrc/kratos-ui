// 主页面

import React, { useState } from 'react';
import { useRequest } from 'umi';
import { Table, Pagination } from 'antd';

import PageLoading from '@/components/PageLoading';

import Condition from './components/ConditionView';
import { queryGatewayApis } from './service';
import { QueryCondition } from './data';
import createColumns from './columns';
import styles from './index.less';

const DefaultView = () => {
  const [condition, setCondition] = useState<QueryCondition>({});
  const [total, setTotal] = useState(undefined);

  const { data, loading, pagination } = useRequest(
    ({ current, pageSize }) =>
      queryGatewayApis({ ...condition, current, pageSize, total }),
    {
      refreshDeps: [condition],
      paginated: true,
      formatResult: (res: any) => {
        if (typeof res?.data?.total === 'number') {
          setTotal(res.data.total); // 缓存total, 不用重复计算
        }
        return res.data;
      },
    },
  );

  const [columns] = useState(() => createColumns()); //  只加载一次
  //const columns = useCallback(() => createColumns(), []); // 每次换页都会更新

  if (!data || loading) {
    return <PageLoading />;
  }

  return (
    <div className={styles.container}>
      <Condition
        setCondition={qc => {
          setCondition(qc);
          setTotal(undefined); // 条件发生变更,需要重新计算total
        }}
      />
      <Table
        columns={columns}
        dataSource={data?.list}
        rowKey="id"
        pagination={false}
      />
      <Pagination
        {...(pagination as any)}
        showQuickJumper
        showSizeChanger
        onShowSizeChange={pagination.onChange}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </div>
  );
};

export default DefaultView;
