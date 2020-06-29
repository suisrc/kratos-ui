// 主页面

import React, { useState, useRef } from 'react';
import { useRequest, useIntl } from 'umi';
import { Table, Pagination } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import PageLoading from '@/components/PageLoading';

import SearchForm from './SearchForm';
import { queryTableList } from '../service';
import createColumns from './columns';
import styles from '../index.less';

const DefaultView = () => {
  const [condition, setCondition] = useState({});
  const [total, setTotal] = useState(undefined);

  const { data, loading, pagination } = useRequest(
    (page: { current: number; pageSize: number }) => queryTableList(page),
    {
      refreshDeps: [condition], // 条件变更后,会立即激活查询
      paginated: true,
      formatResult: (res: any) => {
        if (typeof res?.data?.total === 'number') {
          setTotal(res.data.total); // 缓存total, 不用重复计算
        }
        return res.data;
      },
    },
  );

  const i18n = useIntl();
  const [columns] = useState(() => createColumns(i18n)); //  只加载一次
  //const columns = useCallback(() => createColumns(), []); // 每次换页都会更新

  if (!data /*|| loading*/) {
    return <PageLoading />;
  }

  return (
    <PageHeaderWrapper className={styles.pageHeader}>
      <div className={styles.container}>
        <SearchForm
          setQueryFormParams={qc => {
            setCondition(qc);
            setTotal(undefined); // 条件发生变更,需要重新计算total
          }}
        />
        <Table
          columns={columns as any}
          dataSource={data?.list}
          rowKey="id"
          pagination={false}
        />
        <Pagination
          {...(pagination as any)}
          showQuickJumper
          showSizeChanger
          onShowSizeChange={pagination.onChange}
          className={styles.pagination}
        />
      </div>
    </PageHeaderWrapper>
  );
};

export default DefaultView;
