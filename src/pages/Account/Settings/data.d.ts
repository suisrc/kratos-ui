export interface GeographicItemType {
  name: string;
  id: string;
}

export interface GeographicType {
  country: GeographicItemType;
  province: GeographicItemType;
  city: GeographicItemType;
  address: string;
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
  id: string;
  name: string;
  avatar: string;
  binding: boolean;
}
export interface ConfigBinding {
  platforms: PlatformBinding[];
}

export interface ConfigNotification {
  notice: boolean;
  message: boolean;
  task: boolean;
}
