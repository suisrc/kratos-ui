import React from 'react';

import { IRouteComponentProps } from 'umi';

// https://umijs.org/zh-CN/plugins/plugin-layout
// https://pro.ant.design/blog/new-pro-use-cn
const Layout: React.FC<IRouteComponentProps> = (
  props: IRouteComponentProps,
) => <>{props.children}</>;

export default Layout;
