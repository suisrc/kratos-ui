import React, { FC } from 'react';

import { Button, Input, Form, InputNumber, Select } from 'antd';
import { useIntl } from 'umi';

import { FormInstance } from 'antd/es/form';
import { FormItemProps } from './index';

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

interface EditFormProps {
  formItem?: any;
  formItemProps: FormItemProps[];
  onFinish: (values: { [key: string]: any }) => void;
  submitting: boolean;
  form: FormInstance;
}

const EditForm: FC<EditFormProps> = ({
  formItem,
  formItemProps,
  onFinish,
  submitting,
  form,
}) => {
  const i18n = useIntl();
  return (
    <Form
      hideRequiredMark
      //style={{ marginTop: 8 }}
      form={form}
      name="edit"
      initialValues={formItem}
      onFinish={onFinish}
      //onFinishFailed={onFinishFailed}
      //onValuesChange={onValuesChange}
    >
      {formItemProps.map(item => (
        <FormItem
          key={item.key}
          {...(item.layout ||
            (item.valueType === 'submit' ? formSubmitLayout : formItemLayout))}
          {...item.props}
        >
          {(item.render && item.render(item)) ||
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
  );
};

export default EditForm;
