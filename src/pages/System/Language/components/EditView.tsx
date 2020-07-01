import React, { useState } from 'react';

import { IntlShape } from 'umi';
import { Modal } from 'antd';

import { CloseOutlined } from '@ant-design/icons';

import BasicEditForm, { FormItemProps } from '@/components/BasicEditForm';

import {
  postNewTableItem,
  postEditTableItem,
  queryTableItem,
} from '../service';

const createFormItems = (
  i18n: IntlShape,
  ref: { [key: string]: any },
): FormItemProps[] => {
  //console.log(ref);
  return [
    {
      key: 'key',
      layout: true,
      props: {
        label: '标识',
        name: 'key',
        rules: [
          {
            required: true,
            message: '请输入网关名称',
          },
        ],
      },
      valueType: 'string',
    },
    {
      key: 'value',
      layout: true,
      props: {
        label: '内容',
        name: 'value',
        rules: [
          {
            required: true,
            message: '请输入网关名称',
          },
        ],
      },
      valueType: 'string',
    },
    {
      key: 'lang',
      layout: true,
      props: {
        label: '语言',
        name: 'lang',
        rules: [
          {
            required: true,
            message: '请选择归属语言',
          },
        ],
      },
      valueEnum: ref?.actions?.kindLangs || {},
    },
    {
      key: 'system',
      layout: true,
      props: {
        label: '系统',
        name: 'system',
      },
      valueEnum: ref?.actions?.kindSystem || {},
      formItemProps: {
        allowClear: true,
        clearIcon: <CloseOutlined />,
        mode: 'multiple',
      },
    },
  ];
};

interface EditViewProps {
  editItemId: string | undefined;
  editModalVisible: boolean;
  closeModalVisible: () => void;
  refFormItemsProps: {
    [key: string]: any;
  };
}
const EditView: React.FC<EditViewProps> = ({
  editItemId,
  editModalVisible,
  closeModalVisible,
  refFormItemsProps,
}) => {
  return (
    <Modal
      width={480}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="规则配置"
      visible={editModalVisible}
      //footer={renderFooter()}
      onCancel={() => closeModalVisible()}
    >
      <BasicEditForm
        formItemId={editItemId as string}
        {...{
          createFormItems,
          queryTableItem,
          postNewTableItem,
          postEditTableItem,
        }}
        refFormItemsProps={refFormItemsProps}
      />
    </Modal>
  );
};

export default EditView;
