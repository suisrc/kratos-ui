import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message, Cascader } from 'antd';
import { Rule } from 'antd/es/form';

import { FormattedMessage, useIntl, IntlShape, useRequest } from 'umi';
// import { useDispatch,useSelector,useModel } from 'umi';

import React, { useRef, useState } from 'react';

import { queryUserBasic } from '../service';

import { ConfigBase } from '../data.d';

// 可以直接使用Geographic1替换,以获取具有国家的选项
import {
  getGeographicIds,
  reloadResidences,
  loadResidencesData,
  getInitResidences,
} from './Geographic';

import styles from './base.less';
import PageLoading from '@/components/PageLoading';

const { Option } = Select;

// 头像组件
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>
      <FormattedMessage
        id="page.account.settings.base.avatar"
        defaultMessage="Avatar"
      />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          <FormattedMessage
            id="page.account.settings.base.avatar.change"
            defaultMessage="更改头像"
          />
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView = (props: any) => {
  const i18n = useIntl();

  const [residences, setResidences] = useState<any>(undefined);
  const [reloadBase, setReloadBase] = useState(false);
  const view = useRef<HTMLDivElement | undefined>(undefined);
  const {
    data: base,
    loading,
    mutate: setBase,
  }: {
    data: ConfigBase;
    loading: boolean;
    mutate: (newData: ConfigBase) => void;
  } = useRequest(queryUserBasic, {
    formatResult: res => {
      res.data['geographicIds'] = getGeographicIds(res.data.geographic);
      res.data['geographicAddress'] = res.data.geographic?.address || '';
      return res.data;
    },
    onSuccess: (data, params) => {
      //初始化地理坐标
      //初始加载,不需要拉取地理位置坐标
      setResidences(getInitResidences(data?.geographic));
      setReloadBase(true);
    },
  });

  const handleFinish = () => {
    message.success(
      i18n.formatMessage({
        id: 'page.account.settings.base.update.success',
        defaultMessage: '更新基本信息成功',
      }),
    );
  };

  const createFormItem = (
    name: string | string[],
    rules?: Rule[],
    node?: React.ReactNode,
  ) => (
    <Form.Item
      name={name}
      label={i18n.formatMessage({ id: `page.account.settings.base.${name}` })}
      rules={[
        {
          required: true,
          message: i18n.formatMessage({
            id: `page.account.settings.base.${name}.message`,
          }),
        },
        ...(rules || []),
      ]}
    >
      {node || <Input />}
    </Form.Item>
  );

  const prefixSelector = (
    <Form.Item noStyle>
      <Select defaultValue="86" style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  if (loading || !base) {
    return <PageLoading />;
  }

  return (
    <div
      className={styles.baseView}
      ref={(ref: HTMLDivElement) => (view.current = ref)}
    >
      <div className={styles.left}>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={base}
          hideRequiredMark
        >
          {createFormItem('name')}
          {createFormItem('email')}
          {createFormItem(
            'phone',
            [
              {
                pattern: /^1\d{10}$/,
                message: i18n.formatMessage({
                  id: 'page.account.settings.base.phone.2.message',
                }),
              },
            ],
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />,
          )}

          {createFormItem(
            'signature',
            undefined,
            <Input.TextArea
              placeholder={i18n.formatMessage({
                id: 'page.account.settings.base.signature.placeholder',
              })}
              rows={4}
            />,
          )}

          <Form.Item
            name="geographicIds"
            label={i18n.formatMessage({
              id: `page.account.settings.base.geographic`,
            })}
            rules={[
              {
                type: 'array',
                required: true,
                message: i18n.formatMessage({
                  id: `page.account.settings.base.geographic.message`,
                }),
              },
            ]}
          >
            <Cascader
              displayRender={label => label.join(' / ')}
              options={residences}
              fieldNames={{ label: 'name', value: 'id', children: 'children' }}
              loadData={(selectedOptions: any) => {
                // 动态加载数据
                loadResidencesData(selectedOptions, (targetOption: any) => {
                  setResidences([...residences]);
                });
              }}
              onPopupVisibleChange={(show: boolean) => {
                if (show && reloadBase) {
                  // 只有在用户进行省市修改的时候,才会触发拉取全省信息
                  // 第一次拉取省市地理数据
                  setReloadBase(false);
                  reloadResidences(base['geographicIds'], setResidences);
                }
              }}
            />
          </Form.Item>
          <Form.Item
            name="geographicAddress"
            label={i18n.formatMessage({
              id: `page.account.settings.base.address`,
            })}
            rules={[
              {
                required: true,
                message: i18n.formatMessage({
                  id: `page.account.settings.base.address.message`,
                }),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              <FormattedMessage
                id="page.account.settings.base.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.right}>
        <AvatarView avatar={base?.avatar} />
      </div>
    </div>
  );
};
export default BaseView;
