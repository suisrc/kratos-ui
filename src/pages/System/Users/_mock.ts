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

          'tags|1-2': [{ id: '@integer(1, 10000)', name: '@cword(2,4)' }],
          'roles|1-4': [{ id: '@integer(1, 10000)', name: '@cword(2,4)' }],
          'gateways|1-2': [{ id: '@integer(1, 10000)', name: '@cword(2,4)' }],

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

  'GET /api/v1/system/users/item': {
    success: true,
    data: Mock.mock({
      id: '@integer(1, 10000)',
      unique: '@word',
      name: '@cname',
      nickname: '@ctitle(3, 5)',

      'tags|1-2': [{ id: '@integer(1, 10000)', name: '@cword(2,4)' }],
      'roles|1-4': [{ 'id|+1': 3, name: '@cword(2,4)' }],
      'gateways|1-2': [{ 'id|+1': 3, name: '@cword(2,4)' }],

      updateAt: '@datetime',
      createAt: '@datetime',
    }),
  },

  'PUT /api/v1/system/users/item': (req: Request, res: Response) =>
    setTimeout(() => {
      const body = req.body;
      res.send({
        success: true,
        data: { ...body, unique: body.unique + '-123' },
      });
    }, 1000),
  'POST /api/v1/system/users/item': (req: Request, res: Response) =>
    setTimeout(() => {
      const body = req.body;
      res.send({
        success: true,
        data: { ...body, id: 123, unique: 'kjdickd' },
      });
    }, 1000),

  'GET /api/v1/system/users/rule/sources': (req: Request, res: Response) =>
    setTimeout(() => {
      res.send(
        Mock.mock({
          success: true,
          ['data|20']: [
            {
              'id|+1': 1,
              name: '@word(4, 7)',
              desc: '@cword(4, 7)',
            },
          ],
        }),
      );
    }, 1000),
  'GET /api/v1/system/users/gateway/sources': (req: Request, res: Response) =>
    setTimeout(
      () =>
        res.send(
          Mock.mock({
            success: true,
            ['data|20']: [
              {
                'id|+1': 1,
                name: '@word(4, 7)',
                desc: '@cword(4, 7)',
              },
            ],
          }),
        ),
      1000,
    ),
  'POST /api/v1/system/users/tags': (req: Request, res: Response) =>
    setTimeout(() => res.send({ success: true }), 1000),
};
