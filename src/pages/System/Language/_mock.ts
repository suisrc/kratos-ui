// 虚拟请求

import { Request, Response } from 'express';

import Mock, { Random } from 'mockjs';

export default {
  'GET  /api/v1/system/language/list': (req: Request, res: Response) => {
    const { pageNo, pageSize } = req.query;
    //console.log(req.params);
    const data = Mock.mock({
      sign: 'KdickdixcjkDisd',
      total: 55,
      [`list|${pageSize}`]: [
        {
          id: '@integer(1, 10000)',
          key: /[a-z]+\.[a-z]+\.[a-z]+/,
          value: '@cword(4, 20)',

          'lang|1': ['zh-CN', 'en-US'],
          'system|0-2': ['@word(2,6)'],

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
  'DELETE /api/v1/system/language/remove': {
    success: true,
    errorMessage: '操作失败',
  },
  'GET /api/v1/system/language/item': {
    success: true,
    data: Mock.mock({
      id: '@integer(1, 10000)',
      key: '@word',
      value: '@cwork(4, 20)',

      'lang|1': ['zh-CN', 'en-US'],
      'system|1-4': ['@cwork(2,6)'],

      updateAt: '@datetime',
      createAt: '@datetime',
    }),
  },

  'PUT /api/v1/system/language/item': (req: Request, res: Response) =>
    setTimeout(() => {
      const body = req.body;
      res.send({
        success: true,
        data: { ...body },
      });
    }, 1000),
  'POST /api/v1/system/language/item': (req: Request, res: Response) =>
    setTimeout(() => {
      const body = req.body;
      res.send({
        success: true,
        data: { ...body, id: 123 },
      });
    }, 1000),

  'GET /api/v1/system/language/kinds/lang': (req: Request, res: Response) =>
    setTimeout(() => {
      res.send({
        success: true,
        data: {
          'zh-CN': 'zh-CN',
          'en-US': 'en-US',
          'ja-JP': 'ja-JP',
        },
      });
    }, 3000),
  'GET /api/v1/system/language/kinds/system': (req: Request, res: Response) =>
    setTimeout(() => {
      res.send({
        success: true,
        data: {
          acc: 'acc',
          erp: 'erp',
          crm: 'crm',
        },
      });
    }, 1000),
};
