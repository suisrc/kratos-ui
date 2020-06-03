// import mockjs from 'mockjs';
import { Request, Response } from 'express';

function getFakeCaptcha(req: Request, res: Response) {
  return res.json('captcha-xxx');
}

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
  'POST  /api/login/account': (req: Request, res: Response) => {
    const { password, userName, type } = req.body;
    if (password === 'ant.design' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === 'ant.design' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
