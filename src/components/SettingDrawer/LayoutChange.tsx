import React from 'react';
import { List, Tooltip, Select, Switch } from 'antd';

import { useIntl as i18n } from 'umi';

import { Settings } from '@ant-design/pro-layout';
import defaultSettings from '../../../config/defaultSettings';

export interface SettingItemProps {
  title: React.ReactNode;
  action: React.ReactElement;
  disabled?: boolean;
  disabledReason?: React.ReactNode;
}

export const renderLayoutSettingItem = (item: SettingItemProps) => {
  const action = React.cloneElement(item.action, {
    disabled: item.disabled,
  });
  return (
    <Tooltip title={item.disabled ? item.disabledReason : ''} placement="left">
      <List.Item actions={[action]}>
        <span style={{ opacity: item.disabled ? 0.5 : 1 }}>{item.title}</span>
      </List.Item>
    </Tooltip>
  );
};
const LayoutSetting: React.FC<{
  settings: Partial<Settings>;
  changeSetting: (key: string, value: any, hideLoading?: boolean) => void;
}> = ({ settings = {}, changeSetting }) => {
  const { contentWidth, fixedHeader, layout, fixSiderbar } =
    settings || defaultSettings;
  return (
    <List
      split={false}
      dataSource={[
        {
          title: i18n().formatMessage({
            id: 'app.setting.content-width',
            defaultMessage: 'Content Width',
          }),
          action: (
            <Select<string>
              value={contentWidth || 'Fixed'}
              size="small"
              onSelect={value => changeSetting('contentWidth', value)}
              style={{ width: 80 }}
            >
              {layout === 'sidemenu' ? null : (
                <Select.Option value="Fixed">
                  {i18n().formatMessage({
                    id: 'app.setting.content-width.fixed',
                    defaultMessage: 'Fixed',
                  })}
                </Select.Option>
              )}
              <Select.Option value="Fluid">
                {i18n().formatMessage({
                  id: 'app.setting.content-width.fluid',
                  defaultMessage: 'Fluid',
                })}
              </Select.Option>
            </Select>
          ),
        },
        {
          title: i18n().formatMessage({
            id: 'app.setting.fixedheader',
            defaultMessage: 'Fixed Header',
          }),
          action: (
            <Switch
              size="small"
              checked={!!fixedHeader}
              onChange={checked => changeSetting('fixedHeader', checked)}
            />
          ),
        },
        {
          title: i18n().formatMessage({
            id: 'app.setting.fixedsidebar',
            defaultMessage: 'Fixed Sidebar',
          }),
          disabled: layout === 'topmenu',
          disabledReason: i18n().formatMessage({
            id: 'app.setting.fixedsidebar.hint',
            defaultMessage: 'Works on Side Menu Layout',
          }),
          action: (
            <Switch
              size="small"
              checked={!!fixSiderbar}
              onChange={checked => changeSetting('fixSiderbar', checked)}
            />
          ),
        },
      ]}
      renderItem={renderLayoutSettingItem}
    />
  );
};

export default LayoutSetting;
