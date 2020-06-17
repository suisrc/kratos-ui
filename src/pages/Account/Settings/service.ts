import request from 'umi-request';
import { ConfigBase } from './data';

export async function queryUserBasic() {
  return request('/api/v1/user/current/config/base');
}

export async function postUserBasic(config: ConfigBase) {
  return request('/api/v1/user/current/config/base', {
    method: 'POST',
    data: config,
  });
}

export async function queryCountry() {
  return request('/api/v1/geographic/country');
}

export async function queryProvince(country: string) {
  return request(`/api/v1/geographic/province/${country}`);
}

export async function queryCity(country: string, province: string) {
  return request(`/api/v1/geographic/city/${country}/${province}`);
}

export async function queryUserSecurity() {
  return request('/api/v1/user/current/config/security');
}

export async function queryUserBinding() {
  return request('/api/v1/user/current/config/binding');
}

export async function queryUserNotices() {
  return request('/api/v1/user/current/config/notices');
}
