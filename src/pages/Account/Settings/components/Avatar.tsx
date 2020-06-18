import {
  LoadingOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import { FormattedMessage, useRequest } from 'umi';

import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';

import { UploadChangeParam } from 'antd/es/upload';
import { postUploadAvatarFile } from '../service';

import styles from './base.less';

import 'antd/es/modal/style';
import 'antd/es/slider/style';

//interface UploadFileStateType {
//    name: string;
//    status: 'done' | 'uploading' | 'error';
//    url: string;
//}

// https://ant.design/components/upload-cn/#components-upload-demo-crop-image
// https://github.com/nanxiaobei/antd-img-crop/blob/master/README.zh-CN.md
// 头像组件
const AvatarView = ({
  avatar,
  setAvatar,
}: {
  avatar: string;
  setAvatar: (avatar: string) => void;
}) => {
  const { run: upload, loading: uploading } = useRequest(postUploadAvatarFile, {
    // 上传文件
    manual: true,
    onSuccess: (data, _) => {
      if (data?.url) {
        setAvatar(data.url);
      }
    },
  });
  const props = {
    name: 'file',
    customRequest(option: any) {
      const formData = new FormData();
      formData.append('file', option.file);
      upload(formData);
    },
  };

  return (
    <>
      <div className={styles.avatar_title}>
        <FormattedMessage
          id="page.account.settings.base.avatar"
          defaultMessage="Avatar"
        />
      </div>
      <div className={styles.avatar}>
        {avatar ? (
          <img src={avatar} alt="avatar" />
        ) : (
          <UserOutlined alt="avatar" />
        )}
      </div>
      <ImgCrop /*rotate shape="round" */>
        <Upload {...props} showUploadList={false}>
          <div className={styles.button_view}>
            <Button disabled={uploading}>
              {uploading ? <LoadingOutlined /> : <UploadOutlined />}
              <FormattedMessage
                id="page.account.settings.base.avatar.change"
                defaultMessage="更改头像"
              />
            </Button>
          </div>
        </Upload>
      </ImgCrop>
    </>
  );
};

export default AvatarView;
