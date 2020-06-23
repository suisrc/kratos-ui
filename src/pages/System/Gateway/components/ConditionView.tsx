//  页面查询使用的条件

import React, { useState } from 'react';
import { useRequest } from 'umi';

import { QueryCondition } from '../data';

interface DefaultViewProps {
  setCondition?: (qc: QueryCondition) => void; // 执行查询
}

const DefaultView: React.FC<DefaultViewProps> = ({ setCondition }) => {
  return <div>🍔🍔🍔开发中</div>;
};

export default DefaultView;
