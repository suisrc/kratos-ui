import { getResult } from './result';

export default {
  'GET /api/v1/system/info': getResult({
    name: 'Kratos1', // 系统名称
    copyright: 'Copyright © 2020 kratos.suisrc.com', //
    beian: '辽ICP备15002381号', // 备案信息,中国国内需要
    //developer: false,
  }),
};
