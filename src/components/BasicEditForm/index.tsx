import React, { FC, useState, useEffect, ReactNode } from 'react';

import { Form, message } from 'antd';
import { useIntl, useRequest, IntlShape } from 'umi';

import { Rule, FormInstance } from 'antd/es/form';
import { ButtonProps } from 'antd/es/button';

import EditForm from './EditForm';
import PageLoading from '../PageLoading';

/**
 *
 */
export interface FormItemProps {
  key: string;
  props?: {
    label?: string | ReactNode;
    name?: string;
    rules?: Rule[];
    [key: string]: any;
  };
  layout?:
    | true
    | {
        labelCol?: any;
        wrapperCol?: any;
      };
  formItemProps?: {
    placeholder?: string;
    [key: string]: any;
  };
  render?: (item: FormItemProps) => React.ReactNode;
  valueEnum?: {
    [key: string]: any;
  };
  formatGetter?: (value: any) => any;
  formatSetter?: (value: any) => any;
  valueType?: 'submit' | 'string' | 'number' | 'text';
  buttons?: {
    // 只有在valueType=submit才有效
    label: string;
    submit?: boolean;
    props?: ButtonProps; //& { [key: string]: any };
  }[];
}

interface FormBasicFormProps {
  formItemId?: string;
  formItem?: any;

  createFormItemProps: (
    i18n: IntlShape,
    ref: {
      // data, setData, submitting,
      form: FormInstance;
      [key: string]: any;
    },
  ) => FormItemProps[];

  queryTableItem?: (id: string) => Promise<any>;
  postEditTableItem: (item: any) => Promise<any>;
  postNewTableItem: (item: any) => Promise<any>;

  titleSetter?: (title: string) => void;
  refFormItemsProps?: { [key: string]: any };
}

const DefaultForm: FC<FormBasicFormProps> = ({
  formItemId,
  formItem,

  createFormItemProps,
  queryTableItem,
  postEditTableItem,
  postNewTableItem,

  titleSetter,

  refFormItemsProps,
}) => {
  // 表单
  const [form] = Form.useForm();
  const i18n = useIntl();

  const [data, setData] = useState(formItem);
  if (!!formItemId && queryTableItem) {
    // 初始化数据
    useRequest(() => queryTableItem(formItemId as string), {
      onSuccess: data => {
        formItemProps.forEach(
          v => !!v.formatGetter && (data[v.key] = v.formatGetter(data[v.key])),
        );
        setData(data);
      },
    });
  }
  const { run: submit, loading: submitting } = useRequest(
    (item: any) => (data ? postEditTableItem : postNewTableItem)(item),
    {
      manual: true,
      onSuccess: data => {
        formItemProps.forEach(
          v => !!v.formatGetter && (data[v.key] = v.formatGetter(data[v.key])),
        );
        setData(data);
        message.success(
          i18n.formatMessage({
            id: 'component.form.result.success',
            defaultMessage: 'Success',
          }),
        );
        form.resetFields();
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

  if (titleSetter) {
    useEffect(() => {
      titleSetter(
        i18n.formatMessage({
          id: data ? 'component.form.title.edit' : 'component.form.title.new',
          defaultMessage: 'Edit',
        }),
      );
    }, [data]);
  }

  const formItemProps = createFormItemProps(i18n, {
    form,
    data,
    setData,
    submitting,
    ...(refFormItemsProps || {}),
  });

  if (!!formItemId && !data) {
    return <PageLoading />;
  }

  return (
    <EditForm
      formItem={data}
      {...{ form, formItemProps, onFinish, submitting }}
    />
  );
};

export default DefaultForm;
