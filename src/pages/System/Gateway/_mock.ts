// 虚拟请求

import { Request, Response } from 'express';

import Mock, { Random } from 'mockjs';

export default {
  'GET  /api/v1/system/gateway/list': (req: Request, res: Response) => {
    const { pageNo, pageSize, total } = req.query;
    //console.log(req.params);
    const data = Mock.mock({
      sign: 'KdickdixcjkDisd',
      total: 55,
      [`list|${pageSize}`]: [
        {
          id: '@integer(1, 10000)',
          unique: '@word',
          name: '@cname',

          //method: ['GET', 'POST', 'PUT', 'DELETE', ''],
          methods: function() {
            return ['GET', 'POST', 'PUT', 'DELETE'].filter(v =>
              Random.boolean(),
            );
          },
          'domains|0-2': ['@domain'],
          'paths|0-2': [/\/\w+\/\w+\/\w+/],
          allow: '@boolean',
          priority: '@integer(32, 126)',
          netmask: '@ip',

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
  'DELETE /api/v1/system/gateway/delete': {
    success: true,
    errorMessage: '操作失败',
  },
};
