import React, { FC, useState, ReactNode, useEffect } from 'react';

import { Button, Card, Input, Form, InputNumber, Select, message } from 'antd';
import { useIntl, FormattedMessage, useRequest, IntlShape } from 'umi';

import { Rule, FormInstance } from 'antd/es/form';
import { ButtonProps } from 'antd/es/button';

import PageLoading from '@/components/PageLoading';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const formSubmitLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};

export interface FormItemProps {
  key: string;
  props?: {
    label?: string | ReactNode;
    name?: string;
    rules?: Rule[];
    [key: string]: any;
  };
  formItemProps?: {
    placeholder?: string;
    [key: string]: any;
  };
  child?: React.ReactNode;
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
  formItemId: string;
  createFormItems: (
    i18n: IntlShape,
    ref: {
      // data, setData, submitting,
      form: FormInstance;
      [key: string]: any;
    },
  ) => FormItemProps[];
  queryTableItem: (id: string) => Promise<any>;
  postEditTableItem: (item: any) => Promise<any>;
  postNewTableItem: (item: any) => Promise<any>;
  titleSetter?: (string: any) => void;
  refFormItemsProps?: { [key: string]: any };
}

const EditForm: FC<FormBasicFormProps> = ({
  formItemId: id,
  createFormItems,
  queryTableItem,
  postEditTableItem,
  postNewTableItem,
  titleSetter,
  refFormItemsProps,
}) => {
  // 表单
  const [form] = Form.useForm();
  const i18n = useIntl();

  const [data, setData] = useState(undefined);
  if (!!id) {
    // 初始化数据
    useRequest(() => queryTableItem(id as string), {
      onSuccess: data => {
        formItems.forEach(
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
        formItems.forEach(
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

  const formItems = createFormItems(i18n, {
    form,
    data,
    setData,
    submitting,
    ...(refFormItemsProps || {}),
  });

  if (!!id && !data) {
    return <PageLoading />;
  }

  const onFinish = (values: { [key: string]: any }) => {
    let params = { ...(data || {}), ...values };
    formItems.forEach(
      v => !!v.formatSetter && (params[v.key] = v.formatSetter(params[v.key])),
    );
    submit(params);
  };

  return (
    <Card bordered={false}>
      <Form
        hideRequiredMark
        //style={{ marginTop: 8 }}
        form={form}
        name="edit"
        initialValues={data}
        onFinish={onFinish}
        //onFinishFailed={onFinishFailed}
        //onValuesChange={onValuesChange}
      >
        {formItems.map(item => (
          <FormItem
            key={item.key}
            {...(item.valueType === 'submit'
              ? formSubmitLayout
              : formItemLayout)}
            {...item.props}
          >
            {item.child ||
              (item.valueEnum && (
                <Select
                  placeholder={i18n.formatMessage({
                    id: 'component.form.placeholder.select',
                  })}
                  {...item.formItemProps}
                >
                  {Object.entries(item.valueEnum).map(kv => (
                    <Option key={kv[0]} value={kv[0]}>
                      {kv[1]}
                    </Option>
                  ))}
                </Select>
              )) ||
              (item.valueType === 'number' && (
                <InputNumber
                  placeholder={i18n.formatMessage({
                    id: 'component.form.placeholder.input',
                  })}
                  {...item.formItemProps}
                />
              )) ||
              (item.valueType === 'text' && (
                <TextArea
                  placeholder={i18n.formatMessage({
                    id: 'component.form.placeholder.input',
                  })}
                  {...item.formItemProps}
                />
              )) ||
              (item.valueType === 'submit' &&
                (item.buttons ? (
                  item.buttons.map((v, idx) => (
                    <Button
                      key={idx}
                      {...(idx > 0 && { style: { marginLeft: 8 } })}
                      {...(v.submit && {
                        type: 'primary',
                        htmlType: 'submit',
                        loading: submitting,
                      })}
                      {...v.props}
                    >
                      {v.label}
                    </Button>
                  ))
                ) : (
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    {i18n.formatMessage({ id: 'component.form.button.submit' })}
                  </Button>
                ))) ||
              (item.valueType === 'string' && (
                <Input
                  placeholder={i18n.formatMessage({
                    id: 'component.form.placeholder.input',
                  })}
                  {...item.formItemProps}
                />
              ))}
          </FormItem>
        ))}
      </Form>
    </Card>
  );
};

export default EditForm;
