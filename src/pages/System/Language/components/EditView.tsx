import React, { useState, useRef } from 'react';

import { IntlShape } from 'umi';
import { Modal } from 'antd';

import { CloseOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/es/form';

import { FormItemProps } from '@/components/BasicEditForm';
import ModalEditForm from '@/components/BasicEditForm/ModalEditForm';

import {
  postNewTableItem,
  postEditTableItem,
  queryTableItem,
} from '../service';

const createFormItemProps = (
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
  data: any;
  setData: (data: any) => void;

  editModalVisible: boolean;
  closeModalVisible: () => void;
  refFormItemsProps: { [key: string]: any };
}
const EditView: React.FC<EditViewProps> = ({
  data,
  setData,
  editModalVisible,
  closeModalVisible,
  refFormItemsProps,
}) => {
  const [title, setTitle] = useState('Loading');
  return (
    <ModalEditForm
      titleSetter={setTitle}
      //onSubmit={form => form.submit()}
      onSubmitSuccess={(_, data) => {
        setData(data);
        closeModalVisible();
      }}
      data={data}
      createFormItemProps={createFormItemProps}
      postNewTableItem={postNewTableItem}
      postEditTableItem={postEditTableItem}
      refFormItemsProps={refFormItemsProps}
      refModalProps={{
        title: title,
        width: 640,
        bodyStyl: { padding: '32px 40px 48px' },
        visible: editModalVisible,
        onCancel: closeModalVisible,
      }}
    />
  );
};

export default EditView;
