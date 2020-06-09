/**
 * umi routes: https://umijs.org/docs/routing
 * https://umijs.org/zh-CN/plugins/plugin-layout#errorcomponent
 */

// 这只是一个🌰而已, 不会产于系统实际运行
const demo = [
  {
    // basic 配置
    path: '/welcome', //配置可以被 path-to-regexp 理解的路径通配符。
    component: './index', //配置 location 和 path 匹配后用于渲染的 React 组件路径。
    // 如果指向 src 目录的文件，可以用 @，也可以用 ../。比如 component: '@/layouts/basic'，或者 component: '../layouts/basic'，推荐用前者。
    exact: true, // 表示是否严格匹配，即 location 是否和 path 完全对应上。
    routes: [], // 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
    redirect: '', // 配置路由跳转。
    wrappers: [], // 配置路由的高阶组件封装。 https://umijs.org/docs/routing#wrappers
    title: '', // 配置路由的标题。

    // layout 配置
    name: 'welcome', //菜单上显示的名称，没有则不显示。
    icon: '', //菜单上显示的 Icon。
    menu: {
      //SideMenu 相关配置。默认为 false，表示在菜单中隐藏此项包括子项。
      name: '欢迎', // 当前菜单名，无默认值，必选，不填则表示不展示。
      icon: 'default', //当前菜单的左侧 icon，可选 antd 的 icon name 和 url，可选。
      hideChildren: true, //在菜单中隐藏他的子项，只展示自己。
      flatMenu: true, //默认为false 在菜单中只隐藏此项，子项往上提，仍旧展示。
    },
    layout: {
      //Layout 相关配置。 默认为 false， 默认展示选择的 layout 主题。
      hideMenu: true, // 当前路由隐藏左侧菜单，默认不隐藏。
      hideNav: true, // 当前路由隐藏导航头，默认不隐藏。
    },
    access: 'canRead', //当 Layout 插件配合 @umijs/plugin-access 插件使用时生效。
    //权限插件会将用户在这里配置的 access 字符串与当前用户所有权限做匹配，如果找到相同的项，并当该权限的值为 false，则当用户访问该路由时，默认展示 403 页面。
  },
];

// 应用路由
// const routes: IBestAFSRoute[] =  [
const routes = [
  {
    path: '/auth/signin',
    component: './Auth/Signin',
    menu: false,
    layout: false,
  },
  {
    path: '/exceptions',
    menu: false,
    routes: [
      { exact: true, path: '401', component: '@/exceptions/401' },
      { exact: true, path: '403', component: '@/exceptions/403' },
      { exact: true, path: '404', component: '@/exceptions/404' },
      { exact: true, path: '500', component: '@/exceptions/500' },
    ],
  },
  {
    name: 'basic',
    path: '/',
    component: '@/layouts/BasicLayout',
    wrappers: ['@/wrappers/auth'],
    routes: [
      {
        name: 'welcome',
        path: '/welcome',
        component: './',
      },
      {
        name: 'account',
        routes: [
          {
            name: 'center',
            path: '/account/center',
            component: './Account/Center',
          },
          {
            name: 'settings',
            path: '/account/settings',
            component: './Account/Settings',
          },
        ],
      },
      // 异常
      { exact: true, path: '/401', component: '@/exceptions/401' },
      { exact: true, path: '/403', component: '@/exceptions/403' },
      { exact: true, path: '/404', component: '@/exceptions/404' },
      { exact: true, path: '/500', component: '@/exceptions/500' },
    ],
  },
];

export default routes;
