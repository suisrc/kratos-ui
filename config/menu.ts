/**
 * https://umijs.org/zh-CN/plugins/plugin-layout
 * umi routes: https://umijs.org/docs/routing
 * https://umijs.org/zh-CN/plugins/plugin-layout#errorcomponent
 */

// authority?: string[] | string;
// children?: MenuDataItem[]; // 子菜单
// hideChildrenInMenu?: boolean;
// hideInMenu?: boolean;
// icon?: React.ReactNode; // 使用icon1替换
// locale?: string | false; // menu.welcome, 可以直接抽取i18n对应的内容,如果不配置,可以通过name抽取
// name: string; // 必须字段,如果不存在,内容会被隐藏
// key?: string; // 全局唯一标识符,在当前系统中, 层级结构,每层使用3个字符
// path?: string; // 和route.ts路由对应
// [key: string]: any;
// parentKeys?: string[]; // 在使用openkeys内容时候,很重要,必须存在, 当前系统不用给出,会使用getKeysFromMenuData函数重建

//import { MenuDataItem } from 'antd/es/menu/MenuItem';
import { MenuDataItem } from '@ant-design/pro-layout';

/**
 * 🍔特别注意,如果使用Menu的openkey, 请在指定菜单叶子节点的时候,指定parentKeys内容
 * 🌈实际操作发现,初始化页面,Menu被加载4次,导致初始化的openkey无法使用
 *
 * 🍉 icon1: ant@4对icon不再支持,这里用icon1代替icon, 在 components/IconFont 中处理
 * 🍉 parentKeys中存放其所有的上级目录.
 *
 * 🍉 path => umijs重新处理 => itemPath
 * 🍉 parentKeys => umijs重新处理 => pro_layout_parentKeys
 * 🍉 locale => umijs重新处理(menu + 名称合并) => menu.account.center
 */
const menus: MenuDataItem[] = [
  {
    name: 'welcome',
    path: '/welcome',
    locale: false,
    key: '000',
    icon: 'iconhome',
  },
  {
    name: 'account',
    //locale: 'menu.account', // 通过name字段合并
    key: '001',
    icon: 'iconuser',
    children: [
      {
        name: 'center',
        //locale: 'menu.account.center',
        path: '/account/center',
        key: '001001',
        //parentKeys: ['001'], // 通过pro_layout_parentKeys合成
        icon: 'iconcontrol',
      },
      {
        name: 'settings',
        //locale: 'menu.account.settings',
        path: '/account/settings',
        key: '001002',
        //parentKeys: ['001'],
        icon: 'iconsetting',
      },
    ],
  },
];

export default menus;
