// 默认值
export interface DefaultSettings {
  [key: string]: any;
}

const defaultSettings: DefaultSettings = {
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
