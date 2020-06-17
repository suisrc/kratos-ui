import { Reducer, Effect } from 'umi';

import {
  CurrentUserDetail,
  ListItemDataType,
  NewsItemDataType,
  ApplicationItemDataType,
  ProjectItemDataType,
} from './data.d';
import {
  queryUserDetail,
  queryApplications,
  queryProjects,
  queryNews,
  postUserTags,
} from './service';

export interface ModelState {
  detail: Partial<CurrentUserDetail>;
  applications?: ApplicationItemDataType[];
  projects?: ProjectItemDataType[];
  news?: NewsItemDataType[];
}

export interface ModelType {
  namespace: string;
  state: ModelState;
  effects: {
    fetchUserDetail: Effect;
    putUserTags: Effect;
    fetchApplications: Effect;
    fetchProjects: Effect;
    fetchNews: Effect;
  };
  reducers: {
    saveUserDetail: Reducer<ModelState>;
    saveApplications: Reducer<ModelState>;
    saveProjects: Reducer<ModelState>;
    saveNews: Reducer<ModelState>;
  };
}

const Model: ModelType = {
  namespace: 'accountCenter',

  state: {
    detail: {},
  },

  effects: {
    // *fetch({ payload }, { call, put }) {
    //   const response = yield call(query, payload);
    //   if (response?.success) {}
    //     yield put({
    //       type: 'save',
    //       payload: Array.isArray(response) ? response : [],
    //     });
    //   }
    // },
    *fetchUserDetail(_, { call, put }) {
      const response = yield call(queryUserDetail);
      if (response?.success) {
        yield put({
          type: 'saveUserDetail',
          payload: response.data,
        });
      }
    },
    *putUserTags({ payload }, { call, put }) {
      const response = yield call(postUserTags, payload);
      if (response?.success) {
        const detail = yield call(queryUserDetail);
        if (detail?.success) {
          yield put({
            type: 'saveUserDetail',
            payload: detail.data,
          });
        }
      }
    },
    *fetchApplications(_, { call, put }) {
      const response = yield call(queryApplications);
      if (response?.success) {
        yield put({
          type: 'saveApplications',
          payload: Array.isArray(response.data) ? response.data : [],
        });
      }
    },
    *fetchProjects(_, { call, put }) {
      const response = yield call(queryProjects);
      if (response?.success) {
        yield put({
          type: 'saveProjects',
          payload: Array.isArray(response.data) ? response.data : [],
        });
      }
    },
    *fetchNews(_, { call, put }) {
      const response = yield call(queryNews);
      if (response?.success) {
        yield put({
          type: 'saveNews',
          payload: Array.isArray(response.data) ? response.data : [],
        });
      }
    },
  },

  reducers: {
    saveUserDetail(state, action) {
      return {
        ...state,
        detail: action.payload || {},
      } as ModelState;
    },
    saveApplications(state, action) {
      return {
        ...state,
        applications: action.payload || {},
      } as ModelState;
    },
    saveProjects(state, action) {
      return {
        ...state,
        projects: action.payload || {},
      } as ModelState;
    },
    saveNews(state, action) {
      return {
        ...state,
        news: action.payload || {},
      } as ModelState;
    },
  },
};

export default Model;
