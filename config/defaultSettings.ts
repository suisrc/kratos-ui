// 💩 https://preview.pro.ant.design/

// 默认主题
import { Settings } from '@ant-design/pro-layout';
//export interface DefaultSettings {
//  [key: string]: any;
//}
export type DefaultSettings = Settings & {
  menuSearch?: boolean;
  menuAccess?: boolean;
  menuDrawer?: boolean;
  //[key: string]: any;
};

// '#1890ff': 'daybreak', //拂晓蓝
// '#F5222D': 'dust', //薄暮
// '#FA541C': 'volcano', //火山
// '#FAAD14': 'sunset', //日暮
// '#13C2C2': 'cyan', //明青
// '#52C41A': 'green', //极光绿
// '#2F54EB': 'geekblue', //极客蓝
// '#722ED1': 'purple', //酱紫

const defaultSettings: DefaultSettings = {
  navTheme: 'light', // light, dark
  primaryColor: '#722ED1',
  layout: 'sidemenu', // sidemenu, topmenu
  contentWidth: 'Fluid', // Fluid, Fixed
  fixedHeader: true,
  fixSiderbar: true,
  menuSearch: false,
  menuAccess: true,
  menuDrawer: false,
  menu: {
    locale: true,
  },
  title: 'Kratos',
  iconfontUrl: '//at.alicdn.com/t/font_1866669_1ybdy8kelkq.js',
};

export default defaultSettings;

/**
 * 使用url记录
 */
export const UsedUrlParams: string[] = [
  'navTheme',
  'layout',
  'contentWidth',
  'fixedHeader',
  'fixSiderbar',
  //'primaryColor',
  'colorWeak',
  'menuSearch',
];

// https://ant.design/docs/react/customize-theme-cn
//
// @primary-color: #1890ff; // 全局主色
// @link-color: #1890ff; // 链接色
// @success-color: #52c41a; // 成功色
// @warning-color: #faad14; // 警告色
// @error-color: #f5222d; // 错误色
// @font-size-base: 14px; // 主字号
// @heading-color: rgba(0, 0, 0, 0.85); // 标题色
// @text-color: rgba(0, 0, 0, 0.65); // 主文本色
// @text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
// @disabled-color: rgba(0, 0, 0, 0.25); // 失效色
// @border-radius-base: 4px; // 组件/浮层圆角
// @border-color-base: #d9d9d9; // 边框色
// @box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // 浮层阴影
