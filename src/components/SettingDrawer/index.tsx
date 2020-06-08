import { CloseOutlined, SettingOutlined } from '@ant-design/icons';

import { Divider, Drawer } from 'antd';
import { createBrowserHistory } from 'history';
import { stringify, parse } from 'qs';
import React, { useEffect, useRef } from 'react';
import useMergeValue from 'use-merge-value';

import { useIntl, IntlShape } from 'umi';
import { Settings } from '@ant-design/pro-layout';

import BlockCheckbox from './BlockCheckbox';
import LayoutSetting from './LayoutChange';

import { isBrowser } from '../../utils/utils';
import defaultSettings from '../../../config/defaultSettings';

import './index.less';

interface BodyProps {
  title: string;
}

const Body: React.FC<BodyProps> = ({ children, title }) => (
  <div style={{ marginBottom: 24 }}>
    <h3 className="ant-pro-setting-drawer-title">{title}</h3>
    {children}
  </div>
);
export interface SettingDrawerProps {
  settings?: Partial<Settings>;
  collapse?: boolean;
  getContainer?: any;
  publicPath?: string;
  onCollapseChange?: (collapse: boolean) => void;
  onSettingChange?: (settings: Partial<Settings>) => void;
  onDiffUriParams?: (search: any) => void;
}

let oldSetting: Partial<Settings> = {};
const getDifferentSetting = (state: Partial<Settings>) => {
  const stateObj: Partial<Settings> = {};
  Object.keys(state).forEach(key => {
    if (
      [
        'navTheme',
        'layout',
        'contentWidth',
        'fixedHeader',
        'fixSiderbar',
        'primaryColor',
        'colorWeak',
      ].indexOf(key) < 0
    ) {
      return;
    }
    if (state[key] !== oldSetting[key] /*&& key !== 'collapse'*/) {
      stateObj[key] = state[key];
    }
  });
  delete stateObj.menu;
  return stateObj;
};

/**
 * 导航模式
 */
const getLayoutList = (i18n: IntlShape) => {
  const list = [
    {
      key: 'sidemenu',
      url: '/icons/setting/sidemenu.svg',
      title: i18n.formatMessage({ id: 'app.setting.sidemenu' }),
    },
    {
      key: 'topmenu',
      url: '/icons/setting/topmenu.svg',
      title: i18n.formatMessage({ id: 'app.setting.topmenu' }),
    },
  ];
  return list;
};

/**
 * 整体模式
 */
const getThemeList = (i18n: IntlShape) => {
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
      title: i18n.formatMessage({ id: 'app.setting.pagestyle.light' }),
    },
    {
      key: 'dark',
      url: '/icons/setting/dark.svg',
      title: i18n.formatMessage({
        id: 'app.setting.pagestyle.dark',
        defaultMessage: '',
      }),
    },
  ];

  return themeList;
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
  }
};

const getParamsFromUrl = (settings: Partial<Settings>) => {
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
  const i18n = useIntl();

  const { settings: propsSettings = {}, getContainer, onSettingChange } = props;
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

  /**
   * 修改设置
   * @param key
   * @param value
   * @param hideMessageLoading
   */
  const changeSetting = (key: string, value: string | boolean) => {
    const nextState = { ...settingState };
    nextState[key] = value;

    if (key === 'layout') {
      nextState.contentWidth = value === 'topmenu' ? 'Fixed' : 'Fluid';
    }
    setSettingState(nextState);
  };

  const themeList = getThemeList(i18n);
  const layoutList = getLayoutList(i18n);

  useEffect(() => {
    // 记住默认的选择，方便做 diff，然后保存到 url 参数中
    oldSetting = {
      ...defaultSettings,
      ...propsSettings,
    };
    if (!isBrowser()) {
      return;
    }
    initState(settingState, setSettingState, props.publicPath);
  }, []);

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
    if (props.onDiffUriParams) {
      props.onDiffUriParams(stringify(diffParams));
    }
    browserHistory.replace({
      search: stringify(diffParams),
    });
  }, [JSON.stringify(settingState)]);

  return (
    <>
      <div
        className="ant-pro-setting-drawer-handle2"
        onClick={() => setShow(!show)}
      >
        <SettingOutlined style={{ color: '#fff', fontSize: 20 }} />
      </div>
      <Drawer
        visible={show}
        width={300}
        onClose={() => setShow(false)}
        placement="right"
        getContainer={getContainer}
        //handler={
        //  <div
        //    className="ant-pro-setting-drawer-handle"
        //    onClick={() => setShow(!show)}
        //  >
        //    {show ? (
        //      <CloseOutlined
        //        style={{
        //          color: '#fff',
        //          fontSize: 20,
        //        }}
        //      />
        //    ) : (
        //      <SettingOutlined
        //        style={{
        //          color: '#fff',
        //          fontSize: 20,
        //        }}
        //      />
        //    )}
        //  </div>
        //}
        style={{
          zIndex: 999,
        }}
      >
        <div className="ant-pro-setting-drawer-content">
          <Body title={i18n.formatMessage({ id: 'app.setting.pagestyle' })}>
            <BlockCheckbox
              list={themeList}
              value={navTheme}
              onChange={value => changeSetting('navTheme', value)}
            />
          </Body>
          <Divider />
          <Body
            title={i18n.formatMessage({ id: 'app.setting.navigationmode' })}
          >
            <BlockCheckbox
              list={layoutList}
              value={layout}
              onChange={value => changeSetting('layout', value)}
            />
          </Body>
          <Divider />
          <LayoutSetting
            settings={settingState}
            changeSetting={changeSetting}
          />
        </div>
      </Drawer>
    </>
  );
};

export default SettingDrawer;
