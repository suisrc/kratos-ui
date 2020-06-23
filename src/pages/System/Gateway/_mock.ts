// 虚拟请求

import { Request, Response } from 'express';

import Mock from 'mockjs';

export default {
  'GET  /api/v1/system/gateway/api/list': (req: Request, res: Response) => {
    const { pageNo, pageSize, total } = req.query;
    console.log(req.params);
    const data = Mock.mock({
      total: 55,
      [`list|${pageSize}`]: [
        {
          id: '@guid',
          name: '@cname',
          'gender|1': ['male', 'female'],
          email: '@email',
          disabled: false,
        },
      ],
    });
    res.send({
      success: true,
      data,
    });
  },
};
