import React, { useState, useEffect } from 'react';

import { useIntl, IntlShape, useRequest } from 'umi';

import { Form, Modal, message } from 'antd';

import { BaseResult } from '@ahooksjs/use-request/es/types';
import { ModalFuncProps } from 'antd/es/modal';
import { ModalStaticFunctions } from 'antd/es/modal/confirm';
import { FormInstance, FormProps } from 'antd/es/form';

import EditFormItems from '../BasicEditForm/EditFormItems';
import { FormItemProps } from '../BasicEditForm';

//==============================================================
/**
 * 注意,使用有局限性,必须通过contextHolder挂载modal
 *
 * 💊使用该内容,不是一个明智的决定,特别注意
 * 💊如果发生特殊情况,可以通过该内容临时解决,可以通过contextHolder将modal挂在到任意位置
 *
 * 一下内容必须外部声明,同时必须挂载contextHolder
 * const [form] = Form.useForm();
 * const [modal, contextHolder] = Modal.useModal();
 *
 * 💊使用该内容,不是一个明智的决定,特别注意
 */
export const openEditForm = (
  modal: Pick<ModalStaticFunctions, 'confirm'>,
  modalProps: ModalFuncProps,
  formItems: (form: FormInstance) => FormItemProps[],
  form: FormInstance,
  submit?: API.WithFalse<(value: { [key: string]: any }) => void>,
  formProps?: FormProps,
) => {
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
        <EditFormItems formItemProps={formItemProps} />
      </Form>
    ),
    onOk: form.submit,
    ...modalProps,
  });

  return result;
};

//==============================================================
export interface EditFormViewProps {
  data?: { [key: string]: any };

  createFormItemProps?: (ref: {
    i18n: IntlShape;
    // data, setData, submitting,
    form: FormInstance;
    [key: string]: any;
  }) => FormItemProps[];
  refFormItemParams?: { [key: string]: any };

  submit?: API.WithFalse<
    (
      value: { [key: string]: any },
      submit: (...args: any[]) => Promise<any>,
    ) => void
  >;
  modalProps?: ModalFuncProps;
  formProps?: FormProps;

  request?: (...args: any[]) => any;
  onSubmitSuccess?: (form: FormInstance, data: any, params: any) => void;
  onSubmitError?: (form: FormInstance, error: any, params: any) => void;
  onSubmit?: (form: FormInstance) => void;
}
export const EditFormView: React.FC<{
  visible: boolean;
  setVisible: (show: boolean) => void;
} & EditFormViewProps> = ({
  visible,
  setVisible,
  data,
  createFormItemProps,
  refFormItemParams,

  submit,
  modalProps,
  formProps,

  request,
  onSubmit,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const i18n = useIntl();
  const [form] = Form.useForm();
  const [initData, setInitData] = useState<{}>();

  const { run: submitRun, loading: submitting } = useRequest(request || '', {
    manual: true,
    onSuccess: (data, params) => {
      message.success(
        i18n.formatMessage({
          id: 'component.form.result.success',
          defaultMessage: 'Success',
        }),
      );
      !!onSubmitSuccess && onSubmitSuccess(form, data, params);
    },
    onError: (error, params) => {
      !!onSubmitError && onSubmitError(form, error, params);
    },
  });

  const formItemProps = createFormItemProps
    ? createFormItemProps({
        i18n,
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
        !!submit ? submit(params, submitRun) : submitRun(params);
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
      onOk={onSubmit ? () => onSubmit(form) : form.submit}
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
