import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message, Cascader } from 'antd';
import { Rule } from 'antd/es/form';

import { FormattedMessage, useIntl, IntlShape, useRequest } from 'umi';
// import { useDispatch,useSelector,useModel } from 'umi';

import React, { useRef, useState, useEffect } from 'react';

import {
  queryUserBasic,
  queryCountry,
  queryProvince,
  queryCity,
} from '../service';

import { ConfigBase, GeographicType } from '../data.d';

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

const reloadResidences = (ss: string[], setResidences: (rs: any[]) => void) => {
  queryCountry().then(country => {
    if (country?.success) {
      queryProvince(ss[0]).then(province => {
        if (province?.success) {
          queryCity(ss[0], ss[1]).then(city => {
            if (city?.success) {
              let selectCountry = country.data.find(
                (item: any) => item.id === ss[0],
              );

              if (selectCountry) {
                selectCountry.children = province.data;
              }
              let selectProvince = province.data.find(
                (item: any) => item.id === ss[1],
              );
              if (selectProvince) {
                selectProvince.children = city.data;
              }
              country.data.map((item: any) => {
                if (!item.children) item.isLeaf = false;
              });
              province.data.map((item: any) => {
                if (!item.children) item.isLeaf = false;
              });
              setResidences(country.data);
            }
          });
        }
      });
    }
  });
};
interface SelectItem {
  name: string;
  id: string;
}

const validatorGeographic = (
  // _: any,
  value: GeographicType,
  callback: (message?: string) => void,
  i18n: IntlShape,
) => {
  const { country, province, city, address } = value;
  if (!country.id) {
    callback('Please input your province!');
  }
  if (!province.id) {
    callback('Please input your province!');
  }
  if (!city.id) {
    callback('Please input your city!');
  }
  if (!address) {
    callback('Please input your city!');
  }
  callback();
};

const validatorPhone = (
  rule: any,
  value: string,
  callback: (message?: string) => void,
) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

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
      res.data['geographicIds'] = [
        res.data.geographic?.country?.id || '',
        res.data.geographic?.province?.id || '',
        res.data.geographic?.city?.id || '',
      ];
      res.data['geographicAddress'] = res.data.geographic?.address || '';

      return res.data;
    },
    onSuccess: (data, params) => {
      //console.log(data);
      //初始化地理坐标
      setResidences([
        {
          ...data.geographic?.country,
          children: [
            {
              ...data.geographic?.province,
              children: [
                {
                  ...data.geographic?.city,
                },
              ],
            },
          ],
        },
      ]);
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

  const loadResidencesData = (selectedOptions: any) => {
    // 配置住宿筛选
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    if (selectedOptions.length === 1) {
      queryProvince(selectedOptions[0].id).then(res => {
        if (res?.success) {
          targetOption.children = res.data;
          targetOption.loading = false;
          setResidences([...residences]);
        }
      });
    } else if (selectedOptions.length === 2) {
      queryCity(selectedOptions[0].id, selectedOptions[1].id).then(res => {
        if (res?.success) {
          targetOption.children = res.data;
          targetOption.loading = false;
          setResidences([...residences]);
        }
      });
    }
  };
  const onPopupVisibleChange = (show: boolean) => {
    if (show && reloadBase) {
      setReloadBase(false);
      reloadResidences(base['geographicIds'], setResidences);
    }
  };
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
              loadData={loadResidencesData}
              options={residences}
              fieldNames={{ label: 'name', value: 'id', children: 'children' }}
              onPopupVisibleChange={onPopupVisibleChange}
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
