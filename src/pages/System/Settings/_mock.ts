import { Request, Response } from 'express';
import Mock, { Random } from 'mockjs';

export default {
  'PUT /api/v1/system/info/edit': (req: Request, res: Response) => {
    const body = req.body;
    res.send({
      success: true,
      data: body,
    });
  },
};
