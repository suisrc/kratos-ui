import React, { FC, useState, useEffect } from 'react';

import { Form, message } from 'antd';
import { useIntl, useRequest, IntlShape } from 'umi';

import { FormInstance } from 'antd/es/form';

import PageLoading from '../PageLoading';
import EditFormCards from './EditFormCards';
import { FormItemCards } from '.';

export interface FormCardProps {
  dataId?: string;
  data?: any;

  queryTableItem?: (id: string) => Promise<any>;
  postEditTableItem: (item: any) => Promise<any>;
  postNewTableItem: (item: any) => Promise<any>;
  titleSetter?: (title: string) => void;

  createFormCardProps: (ref: {
    i18n: IntlShape;
    // data, setData, submitting,
    form: FormInstance;
    [key: string]: any;
  }) => FormItemCards[];
  refFormItemParams?: { [key: string]: any };
}

const DefaultForm: FC<FormCardProps> = ({
  dataId,

  queryTableItem,
  postEditTableItem,
  postNewTableItem,
  titleSetter,
  createFormCardProps,
  refFormItemParams,
}) => {
  // 表单
  const [form] = Form.useForm();
  const i18n = useIntl();

  const [data, setData] = useState<{}>();
  const [initData, setInitData] = useState<{}>();

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
        //form.resetFields();
        setTimeout(() => form.resetFields(), 0);
      },
    },
  );

  const onFinish = (values: { [key: string]: any }) => {
    let params = { ...(data || {}), ...values };
    cfp.forEach(f =>
      f.formItems.forEach(
        v =>
          !!v.valueFormatter &&
          !!v.props?.name &&
          (params[v.props?.name] = v.valueFormatter(params[v.props?.name])),
      ),
    );
    submit(params);
  };

  const cfp = createFormCardProps({
    i18n,
    form,
    data,
    setData,
    submitting,
    ...(refFormItemParams || {}),
  });

  useEffect(() => {
    if (data) {
      //console.log(data);
      let params = { ...(data || {}) };
      cfp.forEach(f =>
        f.formItems.forEach(
          v =>
            !!v.valueParser &&
            !!v.props?.name &&
            (params[v.props?.name] = v.valueParser(params[v.props?.name])),
        ),
      );
      setInitData(params);
      //console.log(params);
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

  if (!!dataId && !initData) {
    return <PageLoading />;
  }
  return (
    <Form
      hideRequiredMark
      form={form}
      name="edit"
      initialValues={initData}
      onFinish={onFinish}
      //onFinishFailed={onFinishFailed}
      //onValuesChange={onValuesChange}
    >
      <EditFormCards {...{ formItemCards: cfp, submitting }} />
    </Form>
  );
};

export default DefaultForm;
