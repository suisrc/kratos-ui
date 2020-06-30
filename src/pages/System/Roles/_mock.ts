// 虚拟请求

import { Request, Response } from 'express';

import Mock from 'mockjs';

export default {
  'GET /api/v1/system/roles/list': (req: Request, res: Response) => {
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

          'tags|1-2': [{ id: '@integer(1, 10000)', name: '@cword(2,4)' }],
          desc: '@cword(5, 30)',

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
  'DELETE /api/v1/system/roles/remove': {
    success: true,
    errorMessage: '操作失败',
  },
};
