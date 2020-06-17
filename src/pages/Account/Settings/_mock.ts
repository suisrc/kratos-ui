// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

import city from './geographic/city.json';
import province from './geographic/province.json';

import { getResult } from '../../../../mock/result';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET  /api/v1/user/current/config/base': getResult({
    userid: '00001',
    name: '辛弃疾',
    email: 'kratos@quarkus.org',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',

    signature: '明月别枝惊鹊，清风半夜鸣蝉。',
    title: '南宋词人',
    group: '南宋－将领－词人－豪放派',
    phone: '188****8888',

    geographic: {
      country: {
        name: '中国',
        id: '86',
      },
      province: {
        name: '山东省',
        id: '370000',
      },
      city: {
        name: '济南市',
        id: '370100',
      },
      address: '历城区遥墙镇四风闸村',
    },
  }),

  //==============================================================
  'GET /api/v1/geographic/country1': getResult([
    {
      id: '86',
      name: '中国',
    },
  ]),
  'GET  /api/v1/geographic/province1/:country': (
    req: Request,
    res: Response,
  ) => {
    res.send(getResult([...province]));
  },
  'GET  /api/v1/geographic/city1/:country/:province': (
    req: Request,
    res: Response,
  ) => {
    res.send(getResult([...city[req.params.province]]));
  },
  //==============================================================
  'GET  /api/v1/geographic/province': (req: Request, res: Response) => {
    res.send(getResult([...province]));
  },
  'GET  /api/v1/geographic/city/:province': (req: Request, res: Response) => {
    res.send(getResult([...city[req.params.province]]));
  },
  //==============================================================

  'GET /api/v1/user/current/config/security': getResult({
    password: 'weak',
    phone: '188****8888',
    email: 'kratos@quarkus.org',
    mfa: false,
  }),
  'GET /api/v1/user/current/config/binding': getResult({
    platforms: [
      {
        id: '129832',
        name: '支付宝',
        avatar: 'iconalipay-circle-fill',
        bingding: false,
      },
      {
        id: '129833',
        name: '微信',
        avatar:
          'https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon48_appwx_logo.png',
        bingding: true,
      },
      {
        id: '129834',
        name: '钉钉',
        avatar: 'icondingtalk',
        bingding: true,
      },
    ],
  }),
  'GET /api/v1/user/current/config/notices': getResult({
    message: true,
    todo: true,
  }),
};
