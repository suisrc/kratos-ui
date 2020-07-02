import React, { FC, useState, useEffect, ReactNode, useCallback } from 'react';

import { Form, message } from 'antd';
import { useIntl, useRequest, IntlShape } from 'umi';

import { Rule, FormInstance } from 'antd/es/form';
import { CardProps } from 'antd/es/card';
import { ButtonProps } from 'antd/es/button';

import PageLoading from '../PageLoading';
import EditFormItems from './EditFormItems';
import FormCard, { FormCardProps } from './FormCard';

/**
 *
 */
export interface FormItemProps {
  //key: string;
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
  render?: (item?: FormItemProps, idx?: number, form?: any) => React.ReactNode;
  renderFormItem?: (item?: FormItemProps, idx?: number) => React.ReactNode;
  renderHeader?: (item?: FormItemProps, idx?: number) => React.ReactNode;
  renderFooter?: (item?: FormItemProps, idx?: number) => React.ReactNode;
  valueEnum?: {
    [key: string]: any;
  };
  valueParser?: (value: any) => any;
  valueFormatter?: (value: any) => any;
  valueType?: 'submit' | 'string' | 'number' | 'text' | 'switch' | 'none';
  buttons?: {
    // 只有在valueType=submit才有效
    label: string;
    submit?: boolean;
    props?: ButtonProps; //& { [key: string]: any };
  }[];
  [key: string]: any;
}

/**
 *
 */
export interface FormItemCards {
  formItems: FormItemProps[];
  cardProps?: CardProps;
  title?: string;
  render?: (items: FormItemProps[]) => React.ReactNode;
}

interface FormBasicFormProps {
  dataId?: string;
  data?: any;

  queryTableItem?: (id: string) => Promise<any>;
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
}

const DefaultForm: FC<FormBasicFormProps> = ({
  dataId,

  queryTableItem,
  postEditTableItem,
  postNewTableItem,
  titleSetter,
  createFormItemProps,
  refFormItemParams,
}) => {
  // 表单
  const [form] = Form.useForm();
  const i18n = useIntl();

  const [data, setData] = useState();
  if (!!dataId && queryTableItem) {
    // 初始化数据
    useRequest(() => queryTableItem(dataId as string), {
      onSuccess: data => setData(data),
    });
  }
  const { run: submit, loading: submitting } = useRequest(
    (item: any) => (data ? postEditTableItem : postNewTableItem)(item),
    {
      manual: true,
      onSuccess: data => {
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
      v =>
        !!v.valueFormatter &&
        !!v.props?.name &&
        (params[v.props?.name] = v.valueFormatter(params[v.props?.name])),
    );
    submit(params);
  };
  const initData = useCallback(() => {
    if (!data || !formItemProps) {
      return {};
    }
    //console.log(data);
    let params = { ...(data || {}) };
    formItemProps.forEach(
      v =>
        !!v.valueParser &&
        !!v.props?.name &&
        (params[v.props?.name] = v.valueParser(params[v.props?.name])),
    );
    return params;
  }, [data]);

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
    ...(refFormItemParams || {}),
  });

  if (!!dataId && !data) {
    return <PageLoading />;
  }

  return (
    <Form
      hideRequiredMark
      form={form}
      name="edit"
      initialValues={initData()}
      onFinish={onFinish}
      //onFinishFailed={onFinishFailed}
      //onValuesChange={onValuesChange}
    >
      <EditFormItems {...{ formItemProps, submitting }} />
    </Form>
  );
};

export default DefaultForm;
export const EditFormCard: React.FC<FormCardProps> = FormCard;
