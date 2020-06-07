// 💩 https://preview.pro.ant.design/

// 默认主题
import { Settings } from '@ant-design/pro-layout';
export interface DefaultSettings {
  [key: string]: any;
}

// '#1890ff': 'daybreak', //拂晓蓝
// '#F5222D': 'dust', //薄暮
// '#FA541C': 'volcano', //火山
// '#FAAD14': 'sunset', //日暮
// '#13C2C2': 'cyan', //明青
// '#52C41A': 'green', //极光绿
// '#2F54EB': 'geekblue', //极客蓝
// '#722ED1': 'purple', //酱紫

const defaultSettings: Settings = {
  navTheme: 'light', // light, dark
  primaryColor: '#FA541C',
  layout: 'sidemenu', // sidemenu, topmenu
  contentWidth: 'Fluid', // Fluid, Fixed
  fixedHeader: true,
  fixSiderbar: true,
  menu: {
    locale: true,
  },
  title: 'Kratos',
  iconfontUrl: '',
};

export default defaultSettings;
