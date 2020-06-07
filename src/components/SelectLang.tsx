import React from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { DropDownProps } from 'antd/es/dropdown';
import { getLocale, getAllLocales, setLocale } from 'umi';

export interface HeaderDropdownProps extends DropDownProps {
  overlayClassName?: string;
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomCenter';
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlayClassName: cls,
  ...restProps
}) => (
  <Dropdown
    getPopupContainer={trigger => trigger.parentNode as HTMLElement}
    overlayClassName={cls}
    {...restProps}
  />
);

interface LocalData {
  lang: string;
  label?: string;
  icon?: string;
  title?: string;
}

interface SelectLangProps {
  globalIconClassName?: string;
  postLocalesData?: (locales: LocalData[]) => LocalData[];
  onItemClick?: (params: ClickParam) => void;
  className?: string;
}

const transformArrayToObject = (allLangUIConfig: LocalData[]) => {
  return allLangUIConfig.reduce((obj, item) => {
    if (!item.lang) {
      return obj;
    }

    return {
      ...obj,
      [item.lang]: item,
    };
  }, {});
};

const defaultLangUConfigMap = {
  'zh-CN': {
    lang: 'zh-CN',
    label: '简体中文',
    icon: '🇨🇳',
    title: '语言',
  },
  'en-US': {
    lang: 'en-US',
    label: 'English',
    icon: '🇺🇸',
    title: 'Language',
  },
};

// export const SelectLang: React.FC<SelectLangProps> = props => {
const SelectLang: React.FC<SelectLangProps> = props => {
  const {
    globalIconClassName,
    postLocalesData,
    onItemClick,
    ...restProps
  } = props;
  const selectedLang = getLocale();

  const changeLang = ({ key }: ClickParam): void => setLocale(key);

  const defaultLangUConfig = getAllLocales().map(
    key =>
      defaultLangUConfigMap[key] || {
        lang: key,
        label: key,
        icon: '🌐',
        title: key,
      },
  );

  const allLangUIConfig = transformArrayToObject(
    postLocalesData ? postLocalesData(defaultLangUConfig) : defaultLangUConfig,
  );

  const handleClick = onItemClick
    ? (params: ClickParam) => onItemClick(params)
    : changeLang;

  const menuItemStyle = { minWidth: '160px' };
  const langMenu = (
    <Menu selectedKeys={[selectedLang]} onClick={handleClick}>
      <Menu.Item key={'en-US'} style={menuItemStyle}>
        <span
          role="img"
          aria-label={allLangUIConfig['en-US']?.label || 'en-US'}
        >
          {allLangUIConfig['en-US']?.icon || '🌐'}
        </span>{' '}
        {allLangUIConfig['en-US']?.label || 'en-US'}
      </Menu.Item>
      <Menu.Item key={'zh-CN'} style={menuItemStyle}>
        <span
          role="img"
          aria-label={allLangUIConfig['zh-CN']?.label || 'zh-CN'}
        >
          {allLangUIConfig['zh-CN']?.icon || '🌐'}
        </span>{' '}
        {allLangUIConfig['zh-CN']?.label || 'zh-CN'}
      </Menu.Item>
    </Menu>
  );

  const style = {
    cursor: 'pointer',
    padding: '0 12px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
  };

  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight" {...restProps}>
      <span className={globalIconClassName} style={style}>
        <GlobalOutlined title={allLangUIConfig[selectedLang]?.title} />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
