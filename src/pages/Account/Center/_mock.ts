// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { ListItemDataType } from './data.d';
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

export default {
  // 支持值为 Object 和 Array
  'GET  /api/v1/user/current/detail': getResult({
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    signature: '明月别枝惊鹊，清风半夜鸣蝉。',
    title: '南宋词人',
    group: '南宋－将领－词人－豪放派',
    tags: [
      { key: '0', label: '将领' },
      { key: '1', label: '词人' },
      { key: '2', label: '豪放派' },
      { key: '3', label: '稼轩居士' },
      { key: '4', label: '幼安' },
      { key: '5', label: '坦夫' },
      { key: '6', label: '词中之龙' },
      { key: '7', label: '苏辛' },
      { key: '8', label: '济南二安' },
    ],
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
  'POST  /api/v1/user/current/tags/update': getResult(
    {},
    {
      success: false,
      errorCode: 'USER-TAG-ERROR',
      errorMessage: '无法更新',
      showType: 2,
    },
  ),
  'GET  /api/v1/user/current/applications': getResult(
    [
      {
        id: '0001',
        title: 'CRM',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
        cover:
          'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
        updatedAt: new Date(
          new Date().getTime() - 1000 * 60 * 60 * 15,
        ).getTime(),
        createdAt: new Date(
          new Date().getTime() - 1000 * 60 * 60 * 20,
        ).getTime(),
        content: '千丈悬崖削翠，一川落日镕金。',
        href: 'https://ant.design',
        tags: ['crm'],
        cnToken: 2,
        pvCount: 837,
      },
    ],
    {},
  ),
  'GET  /api/v1/user/current/projects': getResult(
    [
      {
        id: '0001',
        title: 'CRM',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
        cover:
          'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
        updatedAt: new Date(
          new Date().getTime() - 1000 * 60 * 60 * 15,
        ).getTime(),
        createdAt: new Date(
          new Date().getTime() - 1000 * 60 * 60 * 20,
        ).getTime(),
        content: '千丈悬崖削翠，一川落日镕金。',
        href: 'https://ant.design',
        tags: ['crm'],
      },
    ],
    {},
  ),
  'GET  /api/v1/user/current/news': getResult([], {}),
};
