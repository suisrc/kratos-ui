import React, { useState } from 'react';
import { SettingDrawer } from '@ant-design/pro-layout';

import { IRouteComponentProps } from 'umi';

export default function(props: IRouteComponentProps) {
  const [settings, setSettings] = useState({});
  return (
    <>
      {props.children}
      <SettingDrawer settings={settings} onSettingChange={setSettings} />
    </>
  );
}
