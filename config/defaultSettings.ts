// 💩 https://preview.pro.ant.design/
// 💩 将SettingDrawer纳入开发环境进行动态编译风格实在太慢了,
// 💩 推荐使用https://preview.pro.ant.design/的例子,然后生成模板替换一下内容

// 默认主题
import { Settings as ProSettings } from '@ant-design/pro-layout';
export interface DefaultSettings {
  [key: string]: any;
}

const defaultSettings: ProSettings = {
  navTheme: 'light',
  primaryColor: '#1890ff',
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
