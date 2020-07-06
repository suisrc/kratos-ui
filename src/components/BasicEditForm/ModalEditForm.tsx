import React, { FC, useEffect, useState } from 'react';

import { Form, message, Modal } from 'antd';
import { useIntl, useRequest, IntlShape } from 'umi';

import { FormInstance } from 'antd/es/form';

import { FormItemProps } from './index';
import EditFormItems from './EditFormItems';

interface ModalEditFormProps {
  data: any;

  postEditTableItem: (item: any) => Promise<any>;
  postNewTableItem: (item: any) => Promise<any>;
  titleSetter?: (title: string) => void;

  createFormItemProps: (
    i18n: IntlShape,
    ref: {
      // data, setData, submitting,
      form: FormInstance;
      [key: string]: any;
    },
  ) => FormItemProps[];
  refFormItemParams?: { [key: string]: any };

  refModalProps?: { [key: string]: any };
  onSubmit?: (form: FormInstance) => void;
  onSubmitSuccess?: (form: FormInstance, data: any, params: any) => void;
  onSubmitError?: (form: FormInstance, error: any, params: any) => void;
}

const DefaultForm: FC<ModalEditFormProps> = ({
  data,
  postEditTableItem,
  postNewTableItem,
  titleSetter,
  createFormItemProps,
  refFormItemParams,
  refModalProps,
  onSubmit,
  onSubmitSuccess,
  onSubmitError,
}) => {
  // 表单
  const [form] = Form.useForm();
  const i18n = useIntl();

  const [initData, setInitData] = useState<{}>();

  const { run: submit, loading: submitting } = useRequest(
    (item: any) => (data ? postEditTableItem : postNewTableItem)(item),
    {
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
    },
  );

  const onFinish = (values: { [key: string]: any }) => {
    let params = { ...(data || {}), ...values };
    formItemProps.forEach(
      v =>
        !!v.valueFormatter &&
        !!v.props?.name &&
        (params[v.props?.name] = v.valueFormatter(params[v.props?.name])),
    );
    submit(params);
  };

  const formItemProps = createFormItemProps(i18n, {
    form,
    data,
    submitting,
    ...(refFormItemParams || {}),
  });

  useEffect(() => {
    if (data) {
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
    } else if (initData) {
      setInitData({});
      setTimeout(() => form.resetFields(), 0);
      //form.resetFields();
    }
    if (titleSetter) {
      titleSetter(
        i18n.formatMessage({
          id: data ? 'component.form.title.edit' : 'component.form.title.new',
          defaultMessage: 'Edit',
        }),
      );
    }
  }, [data]);

  return (
    <Modal
      title={i18n.formatMessage({
        id: data ? 'component.form.title.edit' : 'component.form.title.new',
        defaultMessage: 'Edit',
      })}
      destroyOnClose
      okText={i18n.formatMessage({ id: 'component.form.button.submit' })}
      onOk={onSubmit ? () => onSubmit(form) : form.submit}
      confirmLoading={submitting}
      {...refModalProps}
      //width={480}
      //bodyStyle={{ padding: '32px 40px 48px' }}
      //title={title}
      //visible={editModalVisible}
      //onCancel={closeModalVisible}
    >
      <Form
        hideRequiredMark
        form={form}
        name="edit"
        initialValues={initData}
        onFinish={onFinish}
        //onFinishFailed={onFinishFailed}
        //onValuesChange={onValuesChange}
      >
        <EditFormItems {...{ formItemProps, submitting }} />
      </Form>
    </Modal>
  );
};

export default DefaultForm;
