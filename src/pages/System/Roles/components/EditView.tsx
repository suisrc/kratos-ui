import React, { useState } from 'react';

import { IntlShape, useIntl, useRequest } from 'umi';
import { Divider, Card, Transfer, Tag, Tooltip, Switch } from 'antd';
import { FormInstance } from 'antd/es/form';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { FormItemCards, EditFormCard } from '@/components/BasicEditForm';
import { getPageQuery } from '@/utils/utils';

import {
  postNewTableItem,
  postEditTableItem,
  queryTableItem,
  queryGatewayDataSources,
} from '../service';

import styles from '../index.less';
import { TagType } from '../data';

const createFormCardProps = (ref: {
  i18n: IntlShape;
  form?: FormInstance;
  //[key: string]: any;
}): FormItemCards[] => {
  const { form } = ref;
  const [gateShowSearch, setGateShowSearch] = useState(false);
  const [gateTargetKeys, setGateTargetKeys] = useState<string[]>([]);

  const { data: gateDataSources } = useRequest(queryGatewayDataSources);
  return [
    {
      title: '基本配置',
      formItems: [
        {
          props: {
            label: '编码',
            name: 'unique',
          },
          formItemProps: {
            disabled: true,
            placeholder: '自动生成',
          },
          valueType: 'string',
        },
        {
          props: {
            label: '名称',
            name: 'name',
            rules: [
              {
                required: true,
                message: '请输入名称',
              },
            ],
          },
          valueType: 'string',
        },
        {
          props: {
            label: '描述',
            name: 'desc',
          },
          valueType: 'text',
        },
        {
          props: {
            label: '标签',
            name: 'tags',
          },
          render: _ => {
            const values: TagType[] = form?.getFieldValue('tags');
            if (!values) {
              return <span />;
            }
            return (
              <>
                {values.map((val, idx) => (
                  <Tag key={idx}>{val.name}&nbsp;</Tag>
                ))}
              </>
            );
          },
        },
      ],
    },
    {
      title: '权限配置',
      formItems: [
        {
          props: {
            label: '网关',
            name: 'gateways',
          },
          valueParser: vs => {
            setGateTargetKeys(!vs ? [] : vs.map((v: { id: string }) => v.id));
            return vs; // 不修改原始数据
          },
          valueFormatter: _ =>
            !gateTargetKeys?.length
              ? undefined
              : gateTargetKeys.map(v => ({ id: v })),
          render: _ => (
            <>
              <Transfer
                listStyle={{
                  width: '100%',
                  height: 300,
                }}
                dataSource={gateDataSources || []}
                targetKeys={gateTargetKeys}
                onChange={setGateTargetKeys}
                rowKey={item => item.id}
                render={item => (
                  <Tooltip title={item.desc}>{item.name}</Tooltip>
                )}
                showSearch={gateShowSearch}
                filterOption={(inputValue, item) =>
                  item.name.indexOf(inputValue) !== -1
                }
              />
            </>
          ),
        },
        {
          valueType: 'none',
          render: _ => (
            <Switch
              checkedChildren="搜索"
              unCheckedChildren="搜索"
              checked={gateShowSearch}
              onChange={setGateShowSearch}
            />
          ),
        },
      ],
    },
    {
      formItems: [
        {
          valueType: 'submit',
          renderHeader: _ => <Divider style={{ marginTop: -32 }} />,
        },
      ],
    },
  ];
};

export default () => {
  const [title, setTitle] = useState('');
  const { id } = getPageQuery() || {};
  return (
    <PageHeaderWrapper title={title || 'Loading'} className={styles.pageHeader}>
      <Card bordered={false}>
        <EditFormCard
          dataId={id as string}
          {...{
            createFormCardProps,
            queryTableItem,
            postNewTableItem,
            postEditTableItem,
          }}
          titleSetter={setTitle}
        />
      </Card>
    </PageHeaderWrapper>
  );
};
