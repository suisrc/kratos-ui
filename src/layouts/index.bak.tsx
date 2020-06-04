// config.ts中存在routes的时候,该文件无效
import React, { useState } from 'react';

import { IRouteComponentProps } from 'umi';

export default function(props: IRouteComponentProps) {
  return <>{props.children}</>;
}
