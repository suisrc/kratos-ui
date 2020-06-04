import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020 quay.run"
    links={[
      {
        key: 'Kratos',
        title: 'Kratos',
        href: 'https://kratos.quay.run',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/suisrc/kratos',
        blankTarget: true,
      },
      {
        key: 'AntDesign',
        title: 'AntDesign',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);
