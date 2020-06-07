import { Request, Response } from 'express';
import { getResult } from './result';

export default {
  'POST  /api/v1/signin/account': (req: Request, res: Response) => {
    const { password, username, type, mobile, captcha } = req.body;
    if (password === '123456' && username === 'admin') {
      res.send(
        getResult({
          status: 'ok',
          role: 'admin',
        }),
      );
      return;
    }
    if (password === '123456' && username === 'user') {
      res.send(
        getResult({
          status: 'ok',
          role: 'user',
        }),
      );
      return;
    }
    if (type === ':account:' && username === 'a') {
      res.send(
        getResult({
          status: 'error',
        }),
      );
      return;
    }
    if (type === ':mobile:') {
      res.send(
        getResult({
          status: 'ok',
          role: 'admin',
        }),
      );
      return;
    }
    res.send(
      getResult(null, {
        success: false,
        errorCode: 'SIGNIN-ERROR',
        errorMessage: '未知异常',
      }),
    );
  },
  'GET /api/v1/signin/captcha': (req: Request, res: Response) => {
    res.send(
      getResult(null, {
        //success: false,
        //errorCode: "SIGNIN-CAPTCHA",
        //errorMessage: "未知异常",
      }),
    );
  },
  'GET /api/v1/signin/signout': (req: Request, res: Response) => {
    res.send(getResult(null));
  },
  'GET /api/v1/3rd/apps': {
    success: true,
    data: [
      {
        platform: 'dingding',
        appid: '20001',
        name: '钉钉10',
        title: '钉钉11',
        signature: '20001',
      },
      {
        platform: 'wechat',
        appid: '10001',
        name: '微信10',
        title: '微信11',
        signature: '10001',
      },
      {
        platform: 'github',
        appid: '30001',
        name: 'GitHub10',
        title: 'GitHub11',
        signature: '30001',
      },
    ],
  },
  'GET /api/v1/3rd/signin': (req: Request, res: Response) => {
    res.send(
      getResult(null, {
        success: false,
        errorCode: 'SIGNIN-3rd',
        errorMessage: '未知异常',
      }),
    );
  },
};
