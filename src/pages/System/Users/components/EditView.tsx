import React, { useState } from 'react';

import { IntlShape, useIntl } from 'umi';
import {
  Divider,
  Card,
  Transfer,
  Tag,
  Empty,
  Space,
  Tooltip,
  Switch,
} from 'antd';
import { FormInstance } from 'antd/es/form';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { FormItemCards, EditFormCard } from '@/components/BasicEditForm';

import {
  postNewTableItem,
  postEditTableItem,
  queryTableItem,
  createEditService,
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
  const [ruleShowSearch, setRuleShowSearch] = useState(false);
  const [ruleTargetKeys, setRuleTargetKeys] = useState<string[]>([]);
  const [gateShowSearch, setGateShowSearch] = useState(false);
  const [gateTargetKeys, setGateTargetKeys] = useState<string[]>([]);
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
            label: '角色',
            name: 'roles',
          },
          valueParser: vs => {
            setRuleTargetKeys(!vs ? [] : vs.map((v: { id: string }) => v.id));
            return vs;
          },
          valueFormatter: _ =>
            !ruleTargetKeys ? [] : ruleTargetKeys.map(v => ({ id: v })),
          render: _ => {
            //const value = ref?.form?.getFieldValue('roles');
            //const [targetKeys, setTargetKeys] = useState<string[]>([]);
            return (
              <>
                <Transfer
                  listStyle={{
                    width: '100%',
                    height: 300,
                  }}
                  dataSource={services?.ruleDataSources || []}
                  targetKeys={ruleTargetKeys}
                  onChange={setRuleTargetKeys}
                  rowKey={item => item.id}
                  render={item => (
                    <Tooltip title={item.desc}>{item.name}</Tooltip>
                  )}
                  showSearch={ruleShowSearch}
                  filterOption={(inputValue, item) =>
                    item.name.indexOf(inputValue) !== -1
                  }
                />
              </>
            );
          },
        },
        {
          valueType: 'none',
          render: _ => (
            <Switch
              checkedChildren="搜索"
              unCheckedChildren="搜索"
              checked={ruleShowSearch}
              onChange={setRuleShowSearch}
            />
          ),
        },
        {
          props: {
            label: '网关',
            name: 'gateways',
          },
          valueParser: vs => {
            setRuleTargetKeys(!vs ? [] : vs.map((v: { id: string }) => v.id));
            return vs;
          },
          valueFormatter: _ =>
            !ruleTargetKeys ? [] : ruleTargetKeys.map(v => ({ id: v })),
          render: _ => (
            <>
              <Transfer
                listStyle={{
                  width: '100%',
                  height: 300,
                }}
                dataSource={services?.ruleDataSources || []}
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
  const i18n = useIntl();
  const [title, setTitle] = useState('');
  const { id } = getPageQuery() || {};
  const services = createEditService(i18n, {});
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
          refFormItemParams={{ services }}
        />
      </Card>
    </PageHeaderWrapper>
  );
};
