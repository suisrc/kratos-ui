// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './settings';
import proxy from './proxy';
import route from './route';

// const { REACT_APP_ENV } = process.env;

export default defineConfig({
  locale: {
    antd: true,
  },
  dva: {},
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  routes: route,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  layout: {
    name: defaultSettings.title,
    locale: true,
    logo: '@/assets/logo.svg',
  },
  title: defaultSettings.title,
  ignoreMomentLocale: true,
  proxy: proxy['dev'], //proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
