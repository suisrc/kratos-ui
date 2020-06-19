import { FormattedMessage, useIntl, useRequest } from 'umi';

import { List } from 'antd';
import React, { Fragment } from 'react';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const ConfigListView: React.FC<{
  data: (
    | {
        title: string;
        description: JSX.Element;
        actions: JSX.Element[];
      }
    | {
        title: string;
        description: string;
        actions: JSX.Element[];
      }
  )[];
}> = ({ data }) => {
  return (
    <Fragment>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default ConfigListView;
