import React from 'react';

import { Form, Modal } from 'antd';
import { ModalFuncProps } from 'antd/es/modal';
import { ModalStaticFunctions } from 'antd/es/modal/confirm';
import { FormInstance, FormProps } from 'antd/es/form';

import EditFormItems, {
  EditFormItemProps,
} from '../BasicEditForm/EditFormItems';

/**
 * 注意,不支持Form参数初始化
 */
const openEditForm = (
  modal: Pick<ModalStaticFunctions, 'confirm'>,
  modalProps: ModalFuncProps,
  formItems: (form: FormInstance) => EditFormItemProps,
  form: FormInstance,
  submit?: API.WithFalse<(value: { [key: string]: any }) => void>,
  formProps?: FormProps,
) => {
  //const [form] = Form.useForm();
  //const [modal, contextHolder] = Modal.useModal();
  const efp = formItems(form);

  const onFinish = submit
    ? (values: { [key: string]: any }) => {
        let params = { ...values };
        efp.formItemProps.forEach(
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
        <EditFormItems {...efp} />
      </Form>
    ),
    onOk: form.submit,
    ...modalProps,
  });

  return result;
};

const ModalSelf = {
  openEditForm,
};

export default ModalSelf;
