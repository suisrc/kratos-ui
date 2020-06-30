// 虚拟请求

import { Request, Response } from 'express';

import Mock, { Random } from 'mockjs';

export default {
  'GET  /api/v1/system/gateway/list': (req: Request, res: Response) => {
    const { pageNo, pageSize } = req.query;
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
  'DELETE /api/v1/system/gateway/remove': {
    success: true,
    errorMessage: '操作失败',
  },
  'GET /api/v1/system/gateway/item': {
    success: true,
    data: Mock.mock({
      id: '@integer(1, 10000)',
      unique: '@word',
      name: '@cname',

      methods: function() {
        return ['GET', 'POST', 'PUT', 'DELETE'].filter(v => Random.boolean());
      },
      'domains|2-3': ['@domain'],
      'paths|2-4': [/\/\w+\/\w+\/\w+/],
      allow: '@boolean',
      priority: '@integer(32, 126)',
      netmask: '@ip',

      updateAt: '@datetime',
      createAt: '@datetime',
    }),
  },

  'PUT /api/v1/system/gateway/item': (req: Request, res: Response) =>
    setTimeout(() => {
      const body = req.body;
      res.send({
        success: true,
        data: { ...body },
      });
    }, 1000),
  'POST /api/v1/system/gateway/item': (req: Request, res: Response) =>
    setTimeout(() => {
      const body = req.body;
      res.send({
        success: true,
        data: { ...body, id: 123 },
      });
    }, 1000),
};
