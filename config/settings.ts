// 默认值
import { Settings as ProSettings } from '@ant-design/pro-layout';
export interface DefaultSettings {
  [key: string]: any;
}

const defaultSettings: ProSettings = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'Kratos',
  iconfontUrl: '',
};

export default defaultSettings;
