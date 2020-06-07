/**
 * https://umijs.org/zh-CN/plugins/plugin-layout
 * umi routes: https://umijs.org/docs/routing
 * https://umijs.org/zh-CN/plugins/plugin-layout#errorcomponent
 */

// authority?: string[] | string;
// children?: MenuDataItem[];
// hideChildrenInMenu?: boolean;
// hideInMenu?: boolean;
// icon?: React.ReactNode;
// locale?: string | false;
// name?: string;
// key?: string;
// path?: string;
// [key: string]: any;
// parentKeys?: string[];

//import { MenuDataItem } from 'antd/es/menu/MenuItem';
import { MenuDataItem } from '@ant-design/pro-layout';

const menus: MenuDataItem[] = [
  {
    name: '欢迎',
    path: '/welcome',
  },
  {
    name: '个人中心',
    children: [
      {
        name: '个人中心',
        path: '/account/center',
      },
      {
        name: '个人配置',
        path: '/account/settings',
      },
    ],
  },
  {
    name: '个人中心2',
    children: [
      {
        name: '个人中心',
        path: '/account2/center',
      },
      {
        name: '个人配置',
        path: '/account2/settings',
      },
    ],
  },
  {
    name: '个人中心3',
    children: [
      {
        name: '个人中心',
        path: '/account3/center',
      },
      {
        name: '个人配置',
        path: '/account3/settings',
      },
    ],
  },
];

export default menus;
