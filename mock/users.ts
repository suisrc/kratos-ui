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
          avatar: '/icons/logo-192x192.png', // 头像
          name: 'Demo User', // 名称
          userid: '00000001', // 用户ID
          unreadCount: 15, // 未读消息计数
          datetime: new Date(), // 获取当前信息的时间
          system: '', // 该字段主要是有前端给出,用以记录使用, 不同system带来的access也是不同的
          access: access, // 返回权限列表,注意,其返回的权限只是部分确认的权限,而不是全部权限,并且,返回的权限是跟当前系统相关的
          role: {
            id: '10000001', // 角色ID, 如果角色存在,那么id和name是必须存在的内容
            name: '系统管理员', // 角色名称
            avatar: '/icons/logo-192x192.png', // 角色头像
            show: true,
          }, // 多角色用户,登陆系统后,是能使用单角色
          menus: [
            // UserMenuItem[]
            // 用户显示的菜单,注意,这里的菜单,不仅仅限制于当前所拥有的菜单内容
            // 兼容MenuDataItem类型
            ...menus,
          ],
        }),
      );
    }, 300);
  },
};

const access: any = {
  admin: true,
  canAccess: true,
};

const menus: any[] = [
  {
    name: 'account',
    //locale: 'menu.account', // 通过name字段合并
    key: '002',
    icon1: 'iconuser',
    children: [
      {
        name: 'center',
        //locale: 'menu.account.center',
        path: '/account/center',
        key: '001001',
        //parentKeys: ['001'], // 通过pro_layout_parentKeys合成
        icon1: 'iconcontrol',
      },
      {
        name: 'settings',
        //locale: 'menu.account.settings',
        path: '/account/settings',
        key: '001002',
        //parentKeys: ['001'],
        icon1: 'iconsetting',
      },
    ],
  },
  {
    name: 'system',
    key: '003',
    locale: 'menu.system.settings',
    icon1: 'iconcontrol',
    path: '/system/settings',
  },
];
