import { Effect, Reducer, Redirect } from 'umi';

import {
  queryUserCheckInfo,
  checkUserCaptcha,
  submitNewPassword,
} from './service';

export interface StateType {
  // 执行的步骤verify, modify, result
  // 验证方式 verify-password, verify-mail, verify-phone
  current?: string;
  // 表单数据
  fromData?: {
    signature?: string; // 用于更新密码使用的签名
    password?: string; // 新密码
  };
  stepData?: {
    oldPassword?: string; // 旧密码
    newPassword?: string; // 密码确认
    captcha?: string; // 验证码

    email?: string;
    phone?: string;
  };
  warnData?: {
    warnModifyMessage?: string;
    warnVerifyPassword?: string; // 警告信息
    warnVerifyEmail?: string; // 警告信息
    warnVerifyPhone?: string; // 警告信息
  };
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitNewPassword: Effect;

    verifyOldPassword: Effect;
    verifyCaptchaByEmail: Effect;
    verifyCaptchaByPhone: Effect;

    fetchUserCheckInfo: Effect;
  };
  reducers: {
    saveCurrentStep: Reducer<StateType>;
    saveFormData: Reducer<StateType>;
    saveSetpData: Reducer<StateType>;
    saveWarnData: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'accountPassword',

  state: {
    current: 'verify',
    stepData: {},
    fromData: {},
    warnData: {},
  },

  effects: {
    *fetchUserCheckInfo(_, { call, put }) {
      const res = yield call(queryUserCheckInfo);
      if (res?.success) {
        yield put({
          type: 'saveSetpData',
          payload: res.data,
        });
      }
    },
    *submitNewPassword({ payload }, { call, put }) {
      const res = yield call(submitNewPassword, payload);
      if (res?.success) {
        yield put({
          type: 'saveFormData',
          payload,
        });
        yield put({
          type: 'saveCurrentStep',
          payload: 'result',
        });
      } else {
        yield put({
          type: 'saveWarnData',
          payload: {
            warnModifyMessage: res?.data?.message || res.errorMessage,
          },
        });
      }
    },
    *verifyOldPassword({ payload }, { call, put }) {
      const res = yield call(checkUserCaptcha, {
        type: 'password',
        value: payload['captcha'],
      });
      if (res?.success) {
        yield put({
          type: 'saveFormData',
          payload: res.data,
        });
      } else {
        yield put({
          type: 'saveWarnData',
          payload: {
            warnVerifyPassword: res?.data?.message || res?.errorMessage,
          },
        });
      }
    },
    *verifyCaptchaByEmail({ payload }, { call, put }) {
      const res = yield call(checkUserCaptcha, {
        type: 'email',
        value: payload['captcha'],
      });
      if (res?.success) {
        yield put({
          type: 'saveFormData',
          payload: res.data,
        });
      } else {
        yield put({
          type: 'saveWarnData',
          payload: { warnVerifyEmail: res?.data?.message || res?.errorMessage },
        });
      }
    },
    *verifyCaptchaByPhone({ payload }, { call, put }) {
      const res = yield call(checkUserCaptcha, {
        type: 'phone',
        value: payload['captcha'],
      });
      if (res?.success) {
        yield put({
          type: 'saveFormData',
          payload: res.data,
        });
        yield put({
          type: 'saveCurrentStep',
          payload: 'modify',
        });
      } else {
        yield put({
          type: 'saveWarnData',
          payload: { warnVerifyPhone: res?.data?.message || res?.errorMessage },
        });
      }
    },
  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
        warnData: {},
      };
    },
    saveFormData(state, { payload }) {
      return {
        ...state,
        fromData: { ...state?.fromData, ...payload },
      };
    },
    saveSetpData(state, { payload }) {
      return {
        ...state,
        stepData: { ...state?.stepData, ...payload },
      };
    },
    saveWarnData(state, { payload }) {
      return {
        ...state,
        warnData: payload,
      };
    },
  },
};

export default Model;
