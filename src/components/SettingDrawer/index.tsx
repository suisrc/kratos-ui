import { CloseOutlined, SettingOutlined } from '@ant-design/icons';

import { Divider, Drawer, List, Switch, message, Alert } from 'antd';
import { createBrowserHistory } from 'history';
import { stringify, parse } from 'qs';
import React, { useState, useEffect, useRef } from 'react';
import useMergeValue from 'use-merge-value';

import { useIntl as i18n } from 'umi';

import { Settings, SettingDrawerProps } from '@ant-design/pro-layout';

import defaultSettings from '../../../config/defaultSettings';
import { isBrowser } from '../../utils/utils';

import BlockCheckbox from './BlockCheckbox';
import LayoutSetting from './LayoutChange';

import './index.less';

interface BodyProps {
  title: string;
}

type MergerSettingsType<T> = Partial<T> & {
  primaryColor?: string;
  colorWeak?: boolean;
};

const Body: React.FC<BodyProps> = ({ children, title }) => (
  <div style={{ marginBottom: 24 }}>
    <h3 className="ant-pro-setting-drawer-title">{title}</h3>
    {children}
  </div>
);

let oldSetting: MergerSettingsType<Settings> = {};
const getDifferentSetting = (state: Partial<Settings>) => {
  const stateObj: Partial<Settings> = {};
  Object.keys(state).forEach(key => {
    if (state[key] !== oldSetting[key] && key !== 'collapse') {
      stateObj[key] = state[key];
    }
  });

  delete stateObj.menu;
  return stateObj;
};

const updateTheme = (
  dark: boolean,
  color?: string,
  hideMessageLoading = false,
  publicPath = '/theme',
) => {
  // ssr
  if (
    typeof window === 'undefined' ||
    !(window as any).umi_plugin_ant_themeVar
  ) {
    return;
  }
  let hide: any = () => null;
  if (!hideMessageLoading) {
    hide = message.loading(
      i18n().formatMessage({
        id: 'app.setting.loading',
        defaultMessage: '正在加载主题',
      }),
    );
  }

  const href = dark ? `${publicPath}/dark` : `${publicPath}/`;
  // 如果是 dark，并且是 color=daybreak，无需进行拼接
  let colorFileName =
    dark && color
      ? `-${encodeURIComponent(color)}`
      : encodeURIComponent(color || '');
  if (color === 'daybreak' && dark) {
    colorFileName = '';
  }

  const dom = document.getElementById('theme-style') as HTMLLinkElement;
  // 如果这两个都是空
  if (!href && !colorFileName) {
    if (dom) {
      dom.remove();
      localStorage.removeItem('site-theme');
    }
    return;
  }

  const url = `${href}${colorFileName || ''}.css`;
  if (dom) {
    dom.onload = () => {
      window.setTimeout(() => {
        hide();
      });
    };
    dom.href = url;
  } else {
    const style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.id = 'theme-style';
    style.onload = () => {
      window.setTimeout(() => {
        hide();
      });
    };
    style.href = url;
    if (document.body.append) {
      document.body.append(style);
    } else {
      document.body.appendChild(style);
    }
  }

  localStorage.setItem('site-theme', dark ? 'dark' : 'light');
};

/**
 * 导航模式
 */
const getLayoutList = () => {
  const list = [
    {
      key: 'sidemenu',
      url: '/icons/setting/sidemenu.svg',
      title: i18n().formatMessage({ id: 'app.setting.sidemenu' }),
    },
    {
      key: 'topmenu',
      url: '/icons/setting/topmenu.svg',
      title: i18n().formatMessage({ id: 'app.setting.topmenu' }),
    },
  ];
  return list;
};

/**
 * 整体模式
 */
const getThemeList = () => {
  const list: {
    key: string;
    fileName: string;
    modifyVars: {
      '@primary-color': string;
    };
    theme: 'dark' | 'light';
  }[] = (window as any).umi_plugin_ant_themeVar || [];
  const themeList = [
    {
      key: 'light',
      url: '/icons/setting/light.svg',
      title: i18n().formatMessage({ id: 'app.setting.pagestyle.light' }),
    },
    {
      key: 'dark',
      url: '/icons/setting/dark.svg',
      title: i18n().formatMessage({
        id: 'app.setting.pagestyle.dark',
        defaultMessage: '',
      }),
    },
  ];

  const darkColorList: {
    key: string;
    color: string;
    theme: 'dark' | 'light';
  }[] = [
    {
      key: 'daybreak',
      color: '#1890ff',
      theme: 'dark',
    },
  ];

  const lightColorList: {
    key: string;
    color: string;
    theme: 'dark' | 'light';
  }[] = [
    {
      key: 'daybreak',
      color: '#1890ff',
      theme: 'dark',
    },
  ];

  if (list.find(item => item.theme === 'dark')) {
    themeList.push({
      key: 'realDark',
      url: 'assets/settingdrawer/realDark.svg',
      title: i18n().formatMessage({
        id: 'app.setting.pagestyle.dark',
        defaultMessage: '',
      }),
    });
  }
  // insert  theme color List
  list.forEach(item => {
    const color = (item.modifyVars || {})['@primary-color'];
    if (item.theme === 'dark' && color) {
      darkColorList.push({
        color,
        ...item,
      });
    }
    if (!item.theme || item.theme === 'light') {
      lightColorList.push({
        color,
        ...item,
      });
    }
  });

  return {
    colorList: {
      dark: darkColorList,
      light: lightColorList,
    },
    themeList,
  };
};

/**
 * 初始化的时候需要做的工作
 * @param param0
 */
const initState = (
  settings: Partial<Settings>,
  onSettingChange: SettingDrawerProps['onSettingChange'],
  publicPath?: string,
) => {
  if (!isBrowser()) {
    return;
  }

  let loadedStyle = false;

  if (window.location.search) {
    const params = parse(window.location.search.replace('?', '')) as {
      primaryColor: string;
      navTheme: string;
    };
    const replaceSetting = {};
    Object.keys(params).forEach(key => {
      if (defaultSettings[key]) {
        replaceSetting[key] = params[key];
      }
    });
    if (onSettingChange) {
      onSettingChange({
        ...settings,
        ...replaceSetting,
      });
    }

    // 如果 url 中设置主题，进行一次加载。
    if (oldSetting.navTheme !== params.navTheme && params.navTheme) {
      updateTheme(
        settings.navTheme === 'realDark',
        params.primaryColor,
        true,
        publicPath,
      );
      loadedStyle = true;
    }
  }

  if (loadedStyle) {
    return;
  }

  // 如果 url 中没有设置主题，并且 url 中的没有加载，进行一次加载。
  if (defaultSettings.navTheme !== settings.navTheme && settings.navTheme) {
    updateTheme(
      settings.navTheme === 'realDark',
      settings.primaryColor,
      true,
      publicPath,
    );
  }
};

const getParamsFromUrl = (settings: MergerSettingsType<Settings>) => {
  if (!isBrowser()) {
    return defaultSettings;
  }
  // 第一次进入与 浏览器参数同步一下
  let params = {};
  if (window.location.search) {
    params = parse(window.location.search.replace('?', ''));
  }
  return {
    ...defaultSettings,
    ...settings,
    ...params,
  };
};

/**
 * 可视化配置组件
 * @param props
 */
const SettingDrawer: React.FC<SettingDrawerProps> = props => {
  const {
    settings: propsSettings = {},
    hideLoading = false,
    getContainer,
    onSettingChange,
  } = props;
  const firstRender = useRef<boolean>(true);

  const [show, setShow] = useMergeValue(false, {
    value: props.collapse,
    onChange: props.onCollapseChange,
  });
  const [settingState, setSettingState] = useMergeValue<Partial<Settings>>(
    () => getParamsFromUrl(propsSettings),
    {
      value: propsSettings,
      onChange: onSettingChange,
    },
  );

  const { navTheme = 'dark', layout = 'sidemenu' } = settingState || {};

  useEffect(() => {
    // 记住默认的选择，方便做 diff，然后保存到 url 参数中
    oldSetting = {
      ...defaultSettings,
      ...propsSettings,
    };

    //如果不是浏览器 都没有必要做了
    if (!isBrowser()) {
      return;
    }

    initState(settingState, setSettingState, props.publicPath);
  }, []);

  /**
   * 修改设置
   * @param key
   * @param value
   * @param hideMessageLoading
   */
  const changeSetting = (
    key: string,
    value: string | boolean,
    hideMessageLoading?: boolean,
  ) => {
    const nextState = { ...settingState };
    nextState[key] = value;

    if (key === 'navTheme') {
      updateTheme(
        value === 'realDark',
        undefined,
        hideMessageLoading,
        props.publicPath,
      );
      nextState.primaryColor = 'daybreak';
    }

    if (key === 'primaryColor') {
      updateTheme(
        nextState.navTheme === 'realDark',
        value === 'daybreak' ? '' : (value as string),
        hideMessageLoading,
        props.publicPath,
      );
    }

    if (key === 'layout') {
      nextState.contentWidth = value === 'topmenu' ? 'Fixed' : 'Fluid';
    }
    setSettingState(nextState);
  };

  const themeList = getThemeList();
  const layoutList = getLayoutList();

  useEffect(() => {
    // 如果不是浏览器 都没有必要做了
    if (!isBrowser()) {
      return;
    }
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const browserHistory = createBrowserHistory();
    let params = {};
    if (window.location.search) {
      params = parse(window.location.search.replace('?', ''));
    }

    const diffParams = getDifferentSetting({ ...params, ...settingState });
    if (Object.keys(settingState).length < 1) {
      return;
    }

    browserHistory.replace({
      search: stringify(diffParams),
    });
  }, [JSON.stringify(settingState)]);

  return (
    <Drawer
      visible={show}
      width={300}
      onClose={() => setShow(false)}
      placement="right"
      getContainer={getContainer}
      handler={
        <div
          className="ant-pro-setting-drawer-handle"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <CloseOutlined
              style={{
                color: '#fff',
                fontSize: 20,
              }}
            />
          ) : (
            <SettingOutlined
              style={{
                color: '#fff',
                fontSize: 20,
              }}
            />
          )}
        </div>
      }
      style={{
        zIndex: 999,
      }}
    >
      <div className="ant-pro-setting-drawer-content">
        <Body
          title={i18n().formatMessage({
            id: 'app.setting.pagestyle',
            defaultMessage: 'Page style setting',
          })}
        >
          <BlockCheckbox
            list={themeList.themeList}
            value={navTheme}
            onChange={value => changeSetting('navTheme', value, hideLoading)}
          />
        </Body>
        <Divider />
        <Body
          title={i18n().formatMessage({ id: 'app.setting.navigationmode' })}
        >
          <BlockCheckbox
            list={layoutList}
            value={layout}
            onChange={value => changeSetting('layout', value, hideLoading)}
          />
        </Body>
        <Divider />
        <LayoutSetting settings={settingState} changeSetting={changeSetting} />
      </div>
    </Drawer>
  );
};

export default SettingDrawer;
