import { Button, Input, Select, Form, message, Cascader } from 'antd';
import { Rule } from 'antd/es/form';
import { Store } from 'antd/es/form/interface';
import { LoadingOutlined } from '@ant-design/icons';

import { FormattedMessage, useIntl, useRequest, useModel } from 'umi';
// import { useDispatch,useSelector,useModel } from 'umi';
import React, { useRef, useState } from 'react';

import { updateCurrentUser } from '@/utils/utils';
import { queryUserBasic, postUserBasic } from '../service';

import { ConfigBase } from '../data';

// 可以直接使用Geographic1替换,以获取具有国家的选项
import {
  getGeographicIds,
  reloadResidences,
  loadResidencesData,
  getInitResidences,
  getGeographicByIds,
} from './Geographic';
import AvatarView from './Avatar';

import PageLoading from '@/components/PageLoading';

import styles from './BaseView.less';

const { Option } = Select;

const BaseView = (props: any) => {
  const i18n = useIntl();
  const { initialState, setInitialState, refresh } = useModel('@@initialState');

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

  const { run: handleSubmit, loading: submiting } = useRequest(postUserBasic, {
    manual: true,
    onSuccess: (data, params) => {
      message.success(
        i18n.formatMessage({
          id: 'page.account.settings.base.update.success',
          defaultMessage: '更新基本信息成功',
        }),
      );
      // 更新成功后,修正全局的登陆信息
      // setTimeout(refresh, 0); // 不是很推荐使用这种方式,它会导致所有内容重新刷新
      if (data?.name && data?.avatar) {
        updateCurrentUser(initialState, setInitialState, {
          name: data.name,
          avatar: data.avatar,
        });
        //setInitialState({
        //  ...initialState,
        //  currentUser: {
        //    ...initialState?.currentUser,
        //    name: data.name,
        //    avatar: data.avatar,
        //  }});
      }
    },
  });

  const handleFinish = (vs: Store) => {
    let params: ConfigBase = { ...base, ...vs };
    delete params['geographicAddress'];
    delete params['geographicIds'];
    params.geographic = {
      ...getGeographicByIds(vs.geographicIds),
      address: vs.geographicAddress,
    };
    //console.log(params);
    handleSubmit(params);
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
            <Button htmlType="submit" type="primary" disabled={submiting}>
              {submiting && <LoadingOutlined />}
              <FormattedMessage
                id="page.account.settings.base.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.right}>
        <AvatarView
          avatar={base?.avatar}
          setAvatar={avatar => setBase({ ...base, avatar })}
        />
      </div>
    </div>
  );
};
export default BaseView;
