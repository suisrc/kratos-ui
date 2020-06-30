import React, { FC, useState } from 'react';

import { Button, Card, Input, Form, InputNumber, Select, message } from 'antd';
import { useIntl, FormattedMessage, useRequest } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { getPageQuery } from '@/utils/utils';
import PageLoading from '@/components/PageLoading';

import {
  postNewTableItem,
  postEditTableItem,
  queryTableItem,
} from '../service';

import { createFormItems } from './EditFormItems';
import { QueryTableItem } from '../data';

import styles from '../index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

interface FormBasicFormProps {}

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

const EditForm: FC<FormBasicFormProps> = _ => {
  // 表单
  const [form] = Form.useForm();
  const i18n = useIntl();

  const { id } = getPageQuery();
  const [data, setData] = useState(undefined);
  const formItems = createFormItems(i18n, { form });
  if (!!id) {
    // 初始化数据
    useRequest(() => queryTableItem(id as string), {
      onSuccess: data => {
        formItems.forEach(
          v => !!v.formatGet && (data[v.key] = v.formatGet(data[v.key])),
        );
        setData(data);
      },
    });
  }
  const { run: submit, loading: submitting } = useRequest(
    (item: QueryTableItem) =>
      (data ? postEditTableItem : postNewTableItem)(item),
    {
      manual: true,
      onSuccess: data => {
        formItems.forEach(
          v => !!v.formatGet && (data[v.key] = v.formatGet(data[v.key])),
        );
        setData(data);
        message.success(
          i18n.formatMessage({
            id: 'page.system.gateway.edit.success',
            defaultMessage: 'Success',
          }),
        );
        form.resetFields();
      },
    },
  );

  if (!!id && !data) {
    return <PageLoading />;
  }

  const onFinish = (values: { [key: string]: any }) => {
    let params = { ...(data || {}), ...values };
    formItems.forEach(
      v => !!v.formatSet && (params[v.key] = v.formatSet(params[v.key])),
    );
    submit(params);
  };

  return (
    <PageHeaderWrapper
      title={i18n.formatMessage({
        id: data
          ? 'page.system.gateway.edit.title'
          : 'page.system.gateway.new.title',
        defaultMessage: 'Edit',
      })}
      className={styles.pageHeader}
    >
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
                (item.valueType === 'string' && (
                  <Input
                    placeholder={i18n.formatMessage({
                      id: 'component.form.placeholder.input',
                    })}
                    {...item.formItemProps}
                  />
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
                (item.valueType === 'submit' && (
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    {item.label || (
                      <FormattedMessage id="component.form.button.submit" />
                    )}
                  </Button>
                ))}
            </FormItem>
          ))}
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default EditForm;
