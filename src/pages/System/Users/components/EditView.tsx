import React, { useState } from 'react';

import { IntlShape } from 'umi';
import { Divider, Card, Transfer, Tag, Empty } from 'antd';
import { FormInstance } from 'antd/es/form';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { FormItemCards, EditFormCard } from '@/components/BasicEditForm';

import {
  postNewTableItem,
  postEditTableItem,
  queryTableItem,
} from '../service';

import styles from '../index.less';
import { getPageQuery } from '@/utils/utils';
import { TagType } from '../data';

const createFormCardProps = (
  i18n: IntlShape,
  ref: {
    form?: FormInstance;
    services?: any;
    [key: string]: any;
  },
): FormItemCards[] => {
  const { form, services } = ref;
  return [
    {
      title: '基本配置',
      formItems: [
        {
          key: 'unique',
          props: {
            label: '编码',
            name: 'unique',
          },
          formItemProps: {
            disabled: true,
          },
          valueType: 'string',
        },
        {
          key: 'name',
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
          key: 'nickname',
          props: {
            label: '昵称',
            name: 'nickname',
            rules: [
              {
                required: true,
                message: '请输入昵称',
              },
            ],
          },
          valueType: 'string',
        },
        {
          key: 'tags',
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
          key: 'roles',
          props: {
            label: '角色',
            name: 'roles',
          },
          render: _ => {
            //const value = ref?.form?.getFieldValue('gateways');
            //console.log(value);
            return (
              <>
                <Transfer
                  dataSource={services?.ruleDataSources || {}}
                  listStyle={{
                    width: '100%',
                  }}
                />
              </>
            );
          },
        },
        {
          key: 'gateways',
          props: {
            label: '网关',
            name: 'gateways',
          },
          render: _ => {
            //const value = ref?.form?.getFieldValue('gateways');
            //console.log(value);
            return (
              <>
                <Transfer
                  listStyle={{
                    width: '100%',
                  }}
                />
              </>
            );
          },
        },
      ],
    },
    {
      formItems: [
        {
          key: 'submit',
          valueType: 'submit',
          renderHeader: _ => <Divider />,
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
