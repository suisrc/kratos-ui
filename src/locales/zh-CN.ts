import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';
import signin from './zh-CN/signin';

export default {
  'site.title': '站点 - 标题',
  'about.title': '关于 - 标题',
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...component,
  ...signin,
};
