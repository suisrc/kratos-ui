import React, { FC } from 'react';

import { Card } from 'antd';

import { FormItemCards } from './index';
import EditFormItems from './EditFormItems';

interface EditFormCards {
  formItemCards: FormItemCards[];
  submitting: boolean;
}

const EditForm: FC<EditFormCards> = ({ formItemCards, submitting }) => {
  return (
    <>
      {formItemCards.map((item, idx) => (
        <Card
          key={`card-${idx}`}
          title={item.title}
          bordered={false}
          {...item.cardProps}
        >
          <EditFormItems {...{ formItemProps: item.formItems, submitting }} />
        </Card>
      ))}
    </>
  );
};

export default EditForm;
