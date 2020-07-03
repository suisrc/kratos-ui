import React, { FC } from 'react';

import { useIntl } from 'umi';

import { Button, Input, Form, InputNumber, Select, Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

//import { FormInstance } from 'antd/es/form';

import { FormItemProps } from './index';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

// xs, sm, md, lg, xl, xxl
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
    xl: { span: 5 },
    xxl: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    xl: { span: 14 },
    xxl: { span: 10 },
  },
};

const formSubmitLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 4 },
    xl: { span: 14, offset: 5 },
    xxl: { span: 10, offset: 7 },
  },
};

export interface EditFormItemProps {
  formItemProps: FormItemProps[];
  submitting?: boolean;
}

const EditFormItems: FC<EditFormItemProps> = ({
  formItemProps,
  submitting,
}) => {
  const i18n = useIntl();
  return (
    <>
      {formItemProps.map(
        (item, idx) =>
          (item.renderFormItem && item.renderFormItem(item, idx)) || (
            <span key={`fitem-${idx}`}>
              {item.renderHeader && item.renderHeader(item, idx)}
              <FormItem
                //key={item.key}
                {...(item.customLayout ||
                  (item.valueType === 'submit' || item.valueType === 'none'
                    ? formSubmitLayout
                    : formItemLayout))}
                {...(item.valueType === 'switch'
                  ? { valuePropName: 'checked' }
                  : {})}
                {...item.props}
              >
                {(item.render && item.render(item, idx)) ||
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
                  (item.valueType === 'switch' && (
                    <Switch
                      defaultChecked={item.formItemProps?.defaultChecked}
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
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
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={submitting}
                      >
                        {i18n.formatMessage({
                          id: 'component.form.button.submit',
                        })}
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
              {item.renderFooter && item.renderFooter(item, idx)}
            </span>
          ),
      )}
    </>
  );
};

export default EditFormItems;
