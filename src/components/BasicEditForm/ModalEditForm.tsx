import React, { FC, useEffect, useRef } from 'react';

import { Form, message, Modal } from 'antd';
import { useIntl, useRequest, IntlShape } from 'umi';

import { FormInstance } from 'antd/es/form';

import EditForm from './EditForm';
import { FormItemProps } from './index';

interface ModalEditFormProps {
  data: any;

  createFormItemProps: (
    i18n: IntlShape,
    ref: {
      // data, setData, submitting,
      form: FormInstance;
      [key: string]: any;
    },
  ) => FormItemProps[];

  postEditTableItem: (item: any) => Promise<any>;
  postNewTableItem: (item: any) => Promise<any>;

  titleSetter?: (title: string) => void;
  refFormItemsProps?: { [key: string]: any };
  refModalProps?: { [key: string]: any };

  onSubmit?: (form: FormInstance) => void;
  onSubmitSuccess?: (form: FormInstance, data: any) => void;
}

const DefaultForm: FC<ModalEditFormProps> = ({
  data,
  createFormItemProps,
  postEditTableItem,
  postNewTableItem,
  titleSetter,
  refFormItemsProps,
  refModalProps,
  onSubmit,
  onSubmitSuccess,
}) => {
  // 表单
  const [form] = Form.useForm();
  const i18n = useIntl();
  const first = useRef(true);

  const { run: submit, loading: submitting } = useRequest(
    (item: any) => (data ? postEditTableItem : postNewTableItem)(item),
    {
      manual: true,
      onSuccess: data => {
        message.success(
          i18n.formatMessage({
            id: 'component.form.result.success',
            defaultMessage: 'Success',
          }),
        );
        onSubmitSuccess && onSubmitSuccess(form, data);
      },
    },
  );

  const onFinish = (values: { [key: string]: any }) => {
    let params = { ...(data || {}), ...values };
    formItemProps.forEach(
      v => !!v.formatSetter && (params[v.key] = v.formatSetter(params[v.key])),
    );
    submit(params);
  };

  useEffect(() => {
    titleSetter &&
      titleSetter(
        i18n.formatMessage({
          id: data ? 'component.form.title.edit' : 'component.form.title.new',
          defaultMessage: 'Edit',
        }),
      );
    formItemProps.forEach(
      v => !!v.formatGetter && (data[v.key] = v.formatGetter(data[v.key])),
    );
    (first.current && ((first.current = false) || true)) || form.resetFields();
  }, [data]);

  const formItemProps = createFormItemProps(i18n, {
    form,
    data,
    submitting,
    ...(refFormItemsProps || {}),
  });

  return (
    <Modal
      destroyOnClose={true}
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
      <EditForm
        formItem={data}
        {...{ form, formItemProps, onFinish, submitting }}
      />
    </Modal>
  );
};

export default DefaultForm;
