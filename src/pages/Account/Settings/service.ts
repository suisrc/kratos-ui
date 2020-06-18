import request from 'umi-request';
import { ConfigBase } from './data';
import { format } from 'prettier';

export async function queryUserBasic() {
  return request('/api/v1/user/current/config/base');
}

export async function postUserBasic(config: ConfigBase) {
  return request('/api/v1/user/current/config/base/edit', {
    method: 'PUT',
    data: config,
  });
}

//===============================================================
export async function queryCountry1() {
  return request('/api/v1/geographic/country1');
}
export async function queryProvince1(country: string) {
  return request(`/api/v1/geographic/province1/${country}`);
}
export async function queryCity1(country: string, province: string) {
  return request(`/api/v1/geographic/city1/${country}/${province}`);
}
//===============================================================

export async function queryProvince() {
  return request(`/api/v1/geographic/province`);
}
export async function queryCity(province: string) {
  return request(`/api/v1/geographic/city/${province}`);
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

//=========================================================
export async function postUploadAvatarFile(from: FormData) {
  //return request('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
  return request('/api/v1/user/current/avatar/upload', {
    method: 'POST',
    //requestType: 'form',
    data: from,
  });
}
