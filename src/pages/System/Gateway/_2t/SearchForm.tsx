//  页面查询使用的条件

import React, { useState } from 'react';
import { useRequest } from 'umi';

interface DefaultViewProps {
  setQueryFormParams?: (qc: any) => void; // 执行查询
}

const DefaultView: React.FC<DefaultViewProps> = ({ setQueryFormParams }) => {
  return <div>🍔🍔🍔查询表单</div>;
};

export default DefaultView;
