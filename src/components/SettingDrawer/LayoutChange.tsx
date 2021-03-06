import React from 'react';
import { List, Tooltip, Select, Switch } from 'antd';

import { useIntl } from 'umi';
import { Settings } from '@ant-design/pro-layout';

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
  settings: Partial<
    Settings & {
      menuSearch?: boolean;
    }
  >;
  changeSetting: (key: string, value: any) => void;
}> = ({ settings = {}, changeSetting }) => {
  const i18n = useIntl();
  //const { initialState: { settings } } = useModel('@@initialState');
  const { contentWidth, fixedHeader, layout, fixSiderbar, menuSearch } =
    settings || {};

  return (
    <List
      split={false}
      dataSource={[
        {
          title: i18n.formatMessage({
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
              {layout === 'side' ? null : (
                <Select.Option value="Fixed">
                  {i18n.formatMessage({
                    id: 'app.setting.content-width.fixed',
                    defaultMessage: 'Fixed',
                  })}
                </Select.Option>
              )}
              <Select.Option value="Fluid">
                {i18n.formatMessage({
                  id: 'app.setting.content-width.fluid',
                  defaultMessage: 'Fluid',
                })}
              </Select.Option>
            </Select>
          ),
        },
        {
          title: i18n.formatMessage({
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
          title: i18n.formatMessage({
            id: 'app.setting.fixedsidebar',
            defaultMessage: 'Fixed Sidebar',
          }),
          disabled: layout === 'top',
          disabledReason: i18n.formatMessage({
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
        {
          title: i18n.formatMessage({
            id: 'app.setting.searchmenu',
            defaultMessage: 'Search Menu',
          }),
          disabled: layout === 'top',
          action: (
            <Switch
              size="small"
              checked={!!menuSearch}
              onChange={checked => changeSetting('menuSearch', checked)}
            />
          ),
        },
      ]}
      renderItem={renderLayoutSettingItem}
    />
  );
};

export default LayoutSetting;
