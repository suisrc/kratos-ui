import React, { useState, useEffect } from 'react';

import { useIntl, IntlShape } from 'umi';

import { Form, Modal } from 'antd';

import { BaseResult } from '@ahooksjs/use-request/es/types';
import { ModalFuncProps } from 'antd/es/modal';
import { ModalStaticFunctions } from 'antd/es/modal/confirm';
import { FormInstance, FormProps } from 'antd/es/form';

import EditFormItems from '../BasicEditForm/EditFormItems';
import { FormItemProps } from '../BasicEditForm';

//==============================================================
//==============================================================
//==============================================================

/**
 * 注意,使用有局限性,必须通过contextHolder挂载modal
 */
export const openEditForm = (
  modal: Pick<ModalStaticFunctions, 'confirm'>,
  modalProps: ModalFuncProps,
  formItems: (form: FormInstance) => FormItemProps[],
  form: FormInstance,
  request?: BaseResult<any, any>,
  submit?: API.WithFalse<(value: { [key: string]: any }) => void>,
  formProps?: FormProps,
) => {
  //const [form] = Form.useForm();
  //const [modal, contextHolder] = Modal.useModal();
  const formItemProps = formItems(form);

  const onFinish = submit
    ? (values: { [key: string]: any }) => {
        let params = { ...values };
        formItemProps.forEach(
          v =>
            !!v.valueFormatter &&
            !!v.props?.name &&
            (params[v.props?.name] = v.valueFormatter(params[v.props?.name])),
        );
        submit(params);
      }
    : undefined;

  const result: {
    destroy: () => void;
    update: (newConfig: ModalFuncProps) => void;
  } = modal.confirm({
    content: (
      <Form
        hideRequiredMark
        form={form}
        name="edit"
        layout="horizontal"
        onFinish={onFinish}
        {...formProps}
      >
        <EditFormItems
          formItemProps={formItemProps}
          submitting={request?.loading}
        />
      </Form>
    ),
    onOk: form.submit,
    ...modalProps,
  });

  return result;
};

//==============================================================
//==============================================================
//==============================================================
//
// const [editFormShow, setEditFormShow] = useState(false);
// const [editFormProps, setEditFormProps] = useState({});
// <EditFormView visible={editFormVisible} {...editFormProps} />
export interface EditFormViewProps {
  serviceKey?: string;
  data?: { [key: string]: any };

  createFormItemProps?: (
    i18n: IntlShape,
    ref: {
      // data, setData, submitting,
      form: FormInstance;
      [key: string]: any;
    },
  ) => FormItemProps[];
  refFormItemParams?: { [key: string]: any };

  submit?: API.WithFalse<(value: { [key: string]: any }) => void>;
  modalProps?: ModalFuncProps;
  formProps?: FormProps;
}
export const EditFormView: React.FC<{
  visible: boolean;
  setVisible: (show: boolean) => void;
  submitting: boolean;
} & EditFormViewProps> = ({
  visible,
  setVisible,
  submitting,
  data,
  createFormItemProps,
  refFormItemParams,
  submit,
  modalProps,
  formProps,
}) => {
  const i18n = useIntl();
  const [form] = Form.useForm();
  const [initData, setInitData] = useState<{}>();

  const formItemProps = createFormItemProps
    ? createFormItemProps(i18n, {
        form,
        data,
        ...(refFormItemParams || {}),
      })
    : undefined;

  useEffect(() => {
    if (!!data && !!formItemProps) {
      //console.log(data);
      let params = { ...(data || {}) };
      formItemProps.forEach(
        v =>
          !!v.valueParser &&
          !!v.props?.name &&
          (params[v.props?.name] = v.valueParser(params[v.props?.name])),
      );
      setInitData(params);
      setTimeout(() => form.resetFields(), 0); // 异步刷新,否则会有数据不同步问题
      //form.resetFields();
    } else if (!!initData) {
      setInitData({});
      setTimeout(() => form.resetFields(), 0);
      //form.resetFields();
    }
  }, [data]);
  if (!formItemProps) {
    return <div />; // 没有捆绑任何内容
  }
  const onFinish = !submit
    ? undefined
    : (values: { [key: string]: any }) => {
        let params = { ...values };
        formItemProps.forEach(
          v =>
            !!v.valueFormatter &&
            !!v.props?.name &&
            (params[v.props?.name] = v.valueFormatter(params[v.props?.name])),
        );
        submit(params);
      };
  //const submitting2 = !!submitKey && !!loading[submitKey];
  //console.log(submitting);
  return (
    <Modal
      title={i18n.formatMessage({
        id: data ? 'component.form.title.edit' : 'component.form.title.new',
        defaultMessage: 'Edit',
      })}
      destroyOnClose
      confirmLoading={submitting}
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={form.submit}
      {...modalProps}
    >
      <Form
        hideRequiredMark
        form={form}
        name="modal-form"
        layout="horizontal"
        onFinish={onFinish}
        {...formProps}
      >
        <EditFormItems formItemProps={formItemProps} />
      </Form>
    </Modal>
  );
};

//const ModalSelf = {
//  openEditForm,
//  EditFormView,
//};
//
//export default ModalSelf;
