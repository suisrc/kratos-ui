// 💩 https://preview.pro.ant.design/

// 默认主题
import { Settings as LayoutSettings } from '@ant-design/pro-layout';
export interface DefaultSettings {
  [key: string]: any;
}

const defaultSettings: LayoutSettings = {
  navTheme: 'light',
  primaryColor: '#13C2C2',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  menu: {
    locale: true,
  },
  title: 'Kratos',
  iconfontUrl: '',
};

export default defaultSettings;
