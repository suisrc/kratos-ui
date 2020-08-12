import { getResult } from './result';

import CN from './locale-CN';

export default {
  'GET /api/v1/system/info': getResult({
    key: 'kratos',
    name: 'Kratos', // 系统名称
    copyright: 'Copyright © 2020 kratos.suisrc.com', //
    beian: '辽ICP备15002381号', // 备案信息,中国国内需要
    //developer: false,
    iconfontUrls: ['//at.alicdn.com/t/font_1866669_1ybdy8kelkq.js'],
  }),
  'GET /api/v1/system/locales': getResult({
    ...CN,
  }),
};
