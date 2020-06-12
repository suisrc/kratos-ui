import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
//import { DefaultFooter } from '@ant-design/pro-layout';
import DefaultFooter from './DefaultFooter';
import { useModel } from 'umi';

const developerLinks = [
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
];

export default () => {
  const { initialState } = useModel('@@initialState');

  const developer = initialState?.systemInfo?.developer;
  // console.log(initialState?.systemInfo);
  return (
    <DefaultFooter
      copyright={
        initialState?.systemInfo?.copyright ||
        'Copyright © 2020 kratos.quarkus.org'
      }
      beian={initialState?.systemInfo?.beian}
      links={developer === undefined || developer ? developerLinks : undefined}
    />
  );
};
