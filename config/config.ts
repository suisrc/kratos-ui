// https://umijs.org/config/
import { defineConfig } from 'umi';

import proxy from './proxy';
import route from './route';

import defaultSettings from './defaultSettings';

// const { REACT_APP_ENV } = process.env;

export default defineConfig({
  locale: {
    default: 'zh-CN',
    antd: true,
    //title: false,
    //baseNavigator: true,
    //baseSeparator: '-',
  },
  antd: {
    //dark: true, // 开启暗色主题
    //compact: true, // 开启紧凑主题
  },
  dva: {
    hmr: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  routes: [...route],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    '@primary-color': defaultSettings.primaryColor,
  },
  // 左侧菜单 https://umijs.org/zh-CN/plugins/plugin-layout
  //layout: {
  //name: defaultSettings.title,
  //locale: true,
  //logo: '/icons/logo-192x192.png',
  //},
  // 请求 @umijs/plugin-request
  // request: {
  //   dataField: 'data',
  // },
  title: defaultSettings.title,
  // favicon: '/assets/favicon.ico',
  ignoreMomentLocale: true,
  proxy: proxy['zgo'], //proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  plugins: [
    //'umi-plugin-setting-drawer'
  ],
});
