// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

import city from './geographic/city.json';
import province from './geographic/province.json';

/**
 * 获取标准异常
 * @param data
 * @param props
 */
export const getResult = (
  data: any,
  props?: {
    success?: boolean;
    errorCode?: string;
    errorMessage?: string;
    showType?: number;
    traceId?: string;
    host?: string;
    [propName: string]: any;
  },
) => {
  let res: any = {
    success: true,
    traceId: 'demo-123456-12345678',
    host: '127.0.0.1',
  };
  if (props) {
    res = { ...res, ...props };
  }
  if (data) {
    res.data = data;
  }
  return res;
};

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
    phone: '18812348888',

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
  'PUT /api/v1/user/current/config/base/edit': (
    req: Request,
    res: Response,
  ) => {
    setTimeout(() => {
      res.send(getResult(req.body));
    }, 2000);
  },
  'POST /api/v1/user/current/avatar/upload': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send(
        getResult({
          name: 'xxx.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }),
      );
    }, 2000);
  },

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
    email: 'kra****@quarkus.org',
    mfa: false,
  }),
  'GET /api/v1/user/current/config/binding': getResult({
    platforms: [
      {
        appid: '129832',
        title: '支付宝',
        icon: 'iconalipay-circle-fill',
        bingding: false,
      },
      {
        appid: '129833',
        title: '微信',
        icon:
          'https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon48_appwx_logo.png',
        bingding: true,
      },
      {
        appid: '129834',
        title: '钉钉',
        icon: 'icondingtalk',
        bingding: true,
      },
    ],
  }),
  'GET /api/v1/user/current/config/notices': getResult({
    message: false,
    todo: true,
  }),
  'PUT /api/v1/user/current/config/notices/edit': (
    req: Request,
    res: Response,
  ) => {
    setTimeout(() => {
      res.send(getResult(req.body));
    }, 100);
  },
};
