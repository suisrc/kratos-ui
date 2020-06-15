// import request from 'umi-request';
import request from '@/utils/request';

import { TagType } from './data';

// 获取当前用户详情
// 当前用户基本信息可以通过useModel('@@initialState')?.currentUser获取
export async function queryUserDetail() {
  return request('/api/v1/user/current/detail');
}

export async function postUserTags(params: TagType[]) {
  return request('/api/v1/user/current/tags/update', {
    method: 'POST',
  });
}

export async function queryNews() {
  return request('/api/v1/user/current/news');
}

export async function queryApplications() {
  return request('/api/v1/user/current/application');
}

export async function queryProjects() {
  return request('/api/v1/user/current/projects');
}
