/**
 * umi routes: https://umijs.org/docs/routing
 * https://umijs.org/zh-CN/plugins/plugin-layout#errorcomponent
 */

// 这只是一个🌰而已, 不会产于系统实际运行
const demo = [
  {
    // basic 配置
    path: '/welcome', //配置可以被 path-to-regexp 理解的路径通配符。"/"匹配全程, 非"/"开头,通过上级名称合并后,匹配
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
    //权限插件会将用户在这里配置的 access 字符串与当前用户所有权限做匹配，如果找到相同的项，
    //并当该权限的值为 false，则当用户访问该路由时，默认展示 403 页面。
  },
];

/**
 * 路由
 *
 * 🙄🧻一个有趣的现象
 * BasicLayout重载时候,所有的标题内容都会被重新绘制,
 * 所有对于Layout最好不要重新加载多次,即使它先起来是同一个
 *
 * 当然,如果使用umi自带的layout可能有点别扭(每次点击菜单都会带来菜单闪烁感)
 * 所以当前框架使用自定义的BasicLayout,对该内容进行了修正
 *
 * 权限
 *
 * 当服务器部署时候,页面已经存在,所以,这个时候,我们只能通过"access"来确认该路由是否可以被访问
 * 解决这个问题有两种途径:
 * 1.🚑在我么编写的页面前增加<Access>, 进行验证权限, 这也是比较推荐的方式
 * 2.🚒在Layout中增加过滤器进行过滤, 而在该路由配置中通过access方式给出
 * {name: "account", path: "/account", access: "canAccess", routes: Array(2), unaccessible: true}
 * 如上, 这主要得益于umijs在初始化节点,对配置路由进行了重新处理, 增加了unaccessible字段,可以直接进行判定
 * 不过鉴于该配置可能对性能带来的影响(需要是每次页面渲染时候,都需要确认权限(遍历路由MAP)), 所以这里
 * 会在settings中增加一个开关[menuAccess]用于确认是否需要进行认证,如果使用第一种方式,记得把开关关闭即可.
 * 当然,这也不是什么好的方式,但是作为搬运工🚧的我,先就这么用着吧.
 */
// const routes: IBestAFSRoute[] =  [
const routes = [
  {
    path: '/test',
    component: './System/Gateway',
    exact: true,
  },
  {
    path: '/home',
    component: '@/home',
    exact: true,
  },
  {
    // 认证的内容没有权限
    path: '/auth',
    component: '@/layouts/BlankLayout',
    wrappers: ['@/wrappers/noauth'],
    routes: [
      {
        name: 'signin',
        path: 'signin',
        component: './Auth/Signin',
      },
      {
        name: 'forget-password',
        path: 'forget/password',
        component: './Account/Password/Forget',
      },
    ],
  },
  {
    // 全局异常页面也没有权限, 注意,该内容是全局使用
    path: '/exception',
    routes: [
      { exact: true, path: '401', component: '@/exceptions/401' },
      { exact: true, path: '403', component: '@/exceptions/403' },
      { exact: true, path: '404', component: '@/exceptions/404' },
      { exact: true, path: '500', component: '@/exceptions/500' },
    ],
  },
  {
    // 🌈全局菜单,该内容对于umijs-layout自带的菜单很不友好. 现实就是这样
    name: 'root',
    path: '/',
    component: '@/layouts/BasicLayout', // 全局只使用一次,防止刷新,重回导致菜单闪烁
    wrappers: ['@/wrappers/auth'],
    routes: [
      {
        name: 'welcome',
        path: '/welcome',
        component: './',
      },
      {
        name: 'account',
        path: '/account',
        access: 'signin',
        routes: [
          {
            name: 'center',
            path: 'center',
            component: './Account/Center',
          },
          {
            name: 'settings',
            path: 'settings',
            component: './Account/Settings',
          },
          {
            name: 'change',
            path: 'change',
            routes: [
              {
                name: 'password',
                path: 'password',
                component: './Account/Password/Change',
              },
              {
                name: 'email',
                path: 'email',
                component: './Account/Password/Change/ExtEmail',
              },
              {
                name: 'phone',
                path: 'phone',
                component: './Account/Password/Change/ExtPhone',
              },
            ],
          },
        ],
      },
      {
        name: 'system',
        path: '/system',
        access: 'admin',
        routes: [
          {
            name: 'settings',
            path: 'settings',
            component: './System/Settings',
          },
          {
            name: 'gateway',
            path: 'gateway',
            component: './System/Gateway',
            //component: './System/Gateway/_2t',
          },
          {
            name: 'gateway',
            path: 'gateway/edit',
            component: './System/Gateway/components/EditView',
          },
        ],
      },
      { exact: true, path: '401', component: '@/exceptions/401' },
      { exact: true, path: '403', component: '@/exceptions/403' },
      { exact: true, path: '404', component: '@/exceptions/404' },
      { exact: true, path: '500', component: '@/exceptions/500' },
    ],
  },
];

export default routes;
