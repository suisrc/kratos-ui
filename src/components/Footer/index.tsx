import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020 kratos.quarkus.org"
    links={[
      {
        key: 'Kratos',
        title: 'Kratos',
        href: 'https://kratos.quarkus.org',
        //blankTarget: true,
      },
      {
        key: 'GitHub',
        title: <GithubOutlined />,
        href: 'https://github.com/suisrc/kratos',
        //blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Design',
        href: 'https://ant.design',
        //blankTarget: true,
      },
    ]}
  />
);
