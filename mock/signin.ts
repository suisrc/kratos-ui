import { Request, Response } from 'express';
import { getResult } from './result';

export default {
  // 正常登陆 admin 123456
  // 密码错误 admin xxxxxx
  // 角色登陆 role  123456
  // 手机登陆 不限定
  // 'POST  /api/v1/signin': (req: Request, res: Response) => {
  //   const { password, username, type, mobile, captcha, role } = req.body;
  //   if (password === '123456' && username === 'admin') {
  //     res.send(
  //       getResult({
  //         status: 'ok', // ok, error
  //         access_token: '12345678',
  //       }),
  //     );
  //     return;
  //   }
  //   if (username === 'admin') {
  //     // 测试登陆失败
  //     res.send(getResult({ status: 'error' }));
  //     return;
  //   }
  //   if (type === ':account:' && username === 'role' && !role) {
  //     // 测试具有角色的用户
  //     res.send(
  //       getResult({
  //         status: 'error', // 登陆失败
  //         message: '请选择角色',
  //         roles: [
  //           { id: 'admin', name: '管理员' },
  //           { id: '用户', name: '用户' },
  //         ],
  //       }),
  //     );
  //     return;
  //   }
  //   if (type === ':account:' && username === 'role' && !!role) {
  //     res.send(
  //       getResult({
  //         status: 'ok',
  //         access_token: '12345679',
  //       }),
  //     );
  //     return;
  //   }
  //   if (type === ':mobile:') {
  //     // 手机模式登陆测试
  //     res.send(
  //       getResult({
  //         status: 'ok',
  //         access_token: '22345678',
  //       }),
  //     );
  //     return;
  //   }
  //   // 登陆发生异常,不适合登陆
  //   res.send(
  //     getResult(null, {
  //       success: false,
  //       errorCode: 'SIGNIN-ERROR',
  //       errorMessage: '未知异常',
  //     }),
  //   );
  // },
  // 'GET /api/v1/signin/captcha': (req: Request, res: Response) => {
  //   // 获取验证码
  //   res.send(
  //     getResult(null, {
  //       //success: false,
  //       //errorCode: "SIGNIN-CAPTCHA",
  //       //errorMessage: "未知异常",
  //     }),
  //   );
  // },
  // 'GET /api/v1/signout': (req: Request, res: Response) => {
  //   // 登出
  //   res.send(getResult(null));
  // },
  'GET /api/v1/3rd/apps': {
    // 获取可用于第三方登陆的APP
    success: true,
    data: [
      {
        platform: 'dingding',
        appid: '20001',
        name: '钉钉10',
        title: '钉钉11',
        signature: '20001',
        icon: 'icondingtalk',
      },
      {
        platform: 'wechat',
        appid: '10001',
        name: '微信10',
        title: '微信11',
        signature: '10001',
        icon: 'iconwechat-fill',
      },
      {
        platform: 'github',
        appid: '30001',
        name: 'GitHub10',
        title: 'GitHub11',
        signature: '30001',
        icon: 'icongithub-fill',
      },
    ],
  },
  'GET /api/v1/3rd/signin': (req: Request, res: Response) => {
    // 通过第三方登陆系统
    res.send(
      getResult(null, {
        success: false,
        errorCode: 'SIGNIN-3rd',
        errorMessage: '未知异常',
        showType: 3,
      }),
    );
  },
};
