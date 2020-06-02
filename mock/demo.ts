// import mockjs from 'mockjs';
import { Request, Response } from 'express';

export default {
    // 支持值为 Object 和 Array
    'GET /apix/users': { users: [1, 2] },
    // GET 可忽略
    '/apix/users/1': { id: 1 },
    // 支持自定义函数，API 参考 express@4
    'POST /apix/users/create': (req: Request, res: Response) => {
      // 添加跨域请求头
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end('ok');
    },
    // 'GET /api/tags': mockjs.mock({
    //     'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
    // }),
  }