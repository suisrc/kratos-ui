# 🍊个🌰

``` ts
import { Request, Response } from 'express';
import { getResult } from './result';

const getAccess = () => {
  //return null;
  return 'admin';
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/v1/user/current': (req: Request, res: Response) => {
    setTimeout(() => {
      if (!getAccess()) {
        res.status(401).send({
          data: {
            //userid: null,
          },
          errorCode: '401',
          errorMessage: '请先登录！',
          success: true,
        });
        return;
      }
      res.send(
        getResult({
          name: 'Demo User',
          avatar: '/icons/logo-192x192.png',
          userid: '00000001',
          email: 'user@quay.run',
          signature: '家天下',
          title: '技术专家',
          group: '技术部－XXX',
          tags: [
            {
              key: '0',
              label: '火星',
            },
            {
              key: '1',
              label: '月球',
            },
          ],
          notifyCount: 12,
          unreadCount: 11,
          access: getAccess(),
          country: '中国',
          geographic: {
            province: {
              label: '辽宁省',
              key: '110000',
            },
            city: {
              label: '大连市',
              key: '116000',
            },
          },
          address: '高新园区 99 号',
          phone: '0411-99999999',
        }),
      );
    }, 300);
  },
};

```