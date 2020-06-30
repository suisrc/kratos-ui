// 虚拟请求

import { Request, Response } from 'express';

import Mock from 'mockjs';

export default {
  'GET /api/v1/system/users/list': (req: Request, res: Response) => {
    const { pageNo, pageSize } = req.query;
    //console.log(req.params);
    const data = Mock.mock({
      sign: 'KdickdixcjkDisd',
      total: 100,
      [`list|${pageSize}`]: [
        {
          id: '@integer(1, 10000)',
          unique: '@word',
          name: '@cname',
          nickname: '@ctitle(3, 5)',

          'roles|1-2': ['@word'],
          'gateways|1-2': ['@word'],

          updateAt: '@datetime',
          createAt: '@datetime',
        },
      ],
    });
    res.send({
      success: true,
      data,
    });
  },
  'DELETE /api/v1/system/users/remove': {
    success: true,
    errorMessage: '操作失败',
  },
};
