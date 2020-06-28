import React from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { DropDownProps } from 'antd/es/dropdown';
import { getLocale, getAllLocales, setLocale, useModel } from 'umi';

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

interface SelectLangProps {
  globalIconClassName?: string;
  //postLocalesData?: (locales: LocalData[]) => LocalData[];
  onItemClick?: (params: ClickParam) => void;
  className?: string;
}

const SelectLang: React.FC<SelectLangProps> = props => {
  const { globalIconClassName, onItemClick, ...restProps } = props;

  const { allLangUIConfig } = useModel('useLocales');

  const selectedLang = getLocale();

  const changeLang = ({ key }: ClickParam): void => setLocale(key);
  const handleClick = onItemClick
    ? (params: ClickParam) => onItemClick(params)
    : changeLang;

  const menuItemStyle = { minWidth: '160px' };
  const langMenu = (
    <Menu selectedKeys={[selectedLang]} onClick={handleClick}>
      {getAllLocales().map(key => (
        <Menu.Item key={key} style={menuItemStyle}>
          <span role="img" aria-label={allLangUIConfig[key]?.label || key}>
            {allLangUIConfig[key]?.icon || '🌐'}
          </span>{' '}
          {allLangUIConfig[key]?.label || key}
        </Menu.Item>
      ))}
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
