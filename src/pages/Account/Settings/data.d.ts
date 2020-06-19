export interface GeographicItemType {
  name?: string;
  id: string;
}

export interface GeographicType {
  country?: GeographicItemType;
  province?: GeographicItemType;
  city?: GeographicItemType;
  address?: string;
}

export interface ConfigBase {
  userid: string;
  name: string;
  avatar: string;

  email: string;
  phone: string;
  title: string;
  group: string;

  signature: string;

  geographic?: GeographicType;
  //geographicIds?: string[];
  //geographicAddress?: string;
}

export interface ConfigSecurity {
  password: 'none' | 'weak' | 'medium' | 'strong';
  phone: string;
  email: string;
  mfa: boolean;
}

export interface PlatformBinding {
  platform: string; // 平台
  appid: string; // 应用id, 对于同一平台，可能出现多ID问题
  title: string; // 应用标题， 主要用于静态显示
  signature?: string; // 签名，由后台给出，全局唯一，且随机生成
  icon?: string; // 图标

  binding: boolean;
}
export interface ConfigBinding {
  platforms: PlatformBinding[];
}

export interface ConfigNotification {
  message?: boolean;
  todo?: boolean;
}
