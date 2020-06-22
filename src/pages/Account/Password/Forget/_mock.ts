// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

export default {
  'POST  /api/v1/user/forget/password/change': (
    req: Request,
    res: Response,
  ) => {
    const { password } = req.body;
    setTimeout(() => {
      if (password === '11qqQQ' || password === '123456') {
        res.send({
          success: true,
        });
      } else {
        res.send({
          success: false,
          errorCode: 'CHPWD-001',
          errorMessage: '密码签名异常' + password,
        });
      }
    }, 300);
  },
  'GET /api/v1/user/forget/password/rules': {
    success: true,
    data: [
      {
        //pattern: /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{2,})(?=.*[a-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/,
        pattern: '^.{6,64}$',
        message: '最短6位，最长64位',
      },
      // {
      //   pattern: '^.*(?=.*\\d).*$',
      //   message: '必须包含1个数字',
      // },
      // {
      //   pattern: '^.*(?=.*[a-z]{2,}).*$',
      //   message: '必须包含2个小写字母',
      // },
      // {
      //   pattern: '^.*(?=.*[A-Z]{2,}).*$',
      //   message: '必须包含2个大写字母',
      // },
    ],
  },

  'POST  /api/v1/user/forget/check/captcha': (req: Request, res: Response) => {
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
  'POST /api/v1/user/forget/send/captcha': {
    success: true,
    data: {
      message: '发送验证码成功,请注意查收',
    },
  },
};
