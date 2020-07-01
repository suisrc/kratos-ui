import React, { useState } from 'react';

import { IntlShape } from 'umi';
import { Switch } from 'antd';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import BasicEditForm, { FormItemProps } from '@/components/BasicEditForm';

import { postEditSystemInfo, querySystemInfo } from '../service';
import styles from '../style.less';

const createFormItemProps = (
  i18n: IntlShape,
  ref: { [key: string]: any },
): FormItemProps[] => {
  return [
    {
      key: 'key',
      props: {
        label: '系统标识',
        name: 'key',
      },
      valueType: 'string',
    },
    {
      key: 'name',
      props: {
        label: '系统名称',
        name: 'name',
      },
      valueType: 'string',
    },
    {
      key: 'copyright',
      props: {
        label: '保护版权',
        name: 'copyright',
      },
      valueType: 'string',
    },
    {
      key: 'beian',
      props: {
        label: '国内备案',
        name: 'beian',
      },
      valueType: 'string',
    },
    {
      key: 'developer',
      props: {
        label: '开发水印',
        name: 'developer',
        valuePropName: 'checked',
      },
      render: _ => (
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      ),
    },
    {
      key: 'submit',
      valueType: 'submit',
      buttons: [
        {
          submit: true,
          label: '更新',
        },
      ],
    },
  ];
};

export default () => {
  return (
    <div style={{ marginTop: '30px' }}>
      <BasicEditForm
        //className={styles.content}
        formItemId="1"
        createFormItemProps={createFormItemProps}
        queryTableItem={querySystemInfo}
        postNewTableItem={postEditSystemInfo}
        postEditTableItem={postEditSystemInfo}
      />
    </div>
  );
};
