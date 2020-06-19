// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

export default {
  'POST  /api/v1/user/current/change/password': (
    req: Request,
    res: Response,
  ) => {
    const { password } = req.body;
    setTimeout(() => {
      if (password === '123') {
        res.send({
          success: true,
        });
      } else {
        res.send({
          success: false,
          errorCode: 'CHPWD-001',
          errorMessage: '密码签名异常',
        });
      }
    }, 300);
  },

  'GET /api/v1/user/current/check/info': {
    success: true,
    data: {
      email: 'kra***@quarkus.org',
      phone: '188****8888',
    },
  },

  'POST  /api/v1/user/current/check/captcha': (req: Request, res: Response) => {
    const { value } = req.body;
    setTimeout(() => {
      if (value === '123456') {
        res.send({
          success: true,
          data: {
            signature: 'ickisdciudjcudixjdix',
          },
        });
      } else {
        res.send({
          success: false,
          errorCode: 'CHK-001',
          errorMessage: '验证码错误',
        });
      }
    }, 300);
  },
};
