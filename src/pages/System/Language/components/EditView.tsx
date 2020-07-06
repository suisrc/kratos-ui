import React, { useState, useRef } from 'react';

import { IntlShape, useRequest } from 'umi';

import { CloseOutlined } from '@ant-design/icons';
//import { FormInstance } from 'antd/es/form';

import { FormItemProps } from '@/components/BasicEditForm';
import ModalEditForm from '@/components/BasicEditForm/ModalEditForm';

import {
  postNewTableItem,
  postEditTableItem,
  queryKindLang,
  queryKindSystem,
} from '../service';

const createFormItemProps = (ref: {
  i18n: IntlShape;
  //[key: string]: any;
}): FormItemProps[] => {
  //console.log(ref);
  const { i18n } = ref;
  const { data: kindLangs } = useRequest(queryKindLang);
  const { data: kindSystem } = useRequest(queryKindSystem);
  return [
    {
      key: 'key',
      customLayout: true,
      props: {
        label: '标识',
        name: 'key',
        rules: [
          {
            required: true,
            message: '请输入标识',
          },
        ],
      },
      valueType: 'string',
    },
    {
      key: 'value',
      customLayout: true,
      props: {
        label: '内容',
        name: 'value',
        rules: [
          {
            required: true,
            message: '请输入内容',
          },
        ],
      },
      valueType: 'string',
    },
    {
      key: 'lang',
      customLayout: true,
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
      valueEnum: kindLangs || {},
    },
    {
      key: 'system',
      customLayout: true,
      props: {
        label: '系统',
        name: 'system',
      },
      valueEnum: kindSystem || {},
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
  closeModalVisible: (reload?: boolean) => void;
  refFormItemParams?: { [key: string]: any };
}
const EditView: React.FC<EditViewProps> = ({
  data,
  setData,
  editModalVisible,
  closeModalVisible,
  refFormItemParams,
}) => {
  //const [title, setTitle] = useState('Loading');
  return (
    <ModalEditForm
      //titleSetter={setTitle}
      //onSubmit={form => form.submit()}
      onSubmitSuccess={(_, data) => {
        setData(data);
        closeModalVisible(true);
      }}
      data={data}
      createFormItemProps={createFormItemProps}
      postNewTableItem={postNewTableItem}
      postEditTableItem={postEditTableItem}
      refFormItemParams={refFormItemParams}
      modalProps={{
        //title: title,
        width: 640,
        bodyStyl: { padding: '32px 40px 48px' },
        visible: editModalVisible,
        onCancel: () => closeModalVisible(),
      }}
    />
  );
};

export default EditView;
