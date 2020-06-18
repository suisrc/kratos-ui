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

//const AvatarUpdateUrl = 'https://www.mocky.io/v2/5cc8019d300000980a055e76';
const AvatarUpdateUrl = '/api/v1/user/current/avatar/upload';
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
  const [uploading, setUploading] = useState(false);

  const onPreview = async (file: any) => {
    // 预览使用
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    if (imgWindow) {
      imgWindow.document.write(image.outerHTML);
    }
  };
  const props = {
    name: 'file',
    action: AvatarUpdateUrl,
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info: UploadChangeParam) {
      setUploading(info.file.status === 'uploading');
      if (info.file.status === 'done') {
        if (info.file.response?.data?.url) {
          setAvatar(info.file.response.data.url);
        }
      } else if (info.file.status === 'error') {
        message.error(`上传失败`);
      }
    },
    onPreview, // 预览使用 预览使用 预览使用
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
      <ImgCrop rotate shape="round">
        <Upload {...props} showUploadList={false}>
          <div className={styles.button_view}>
            <Button>
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
