import { Effect, Reducer, Redirect } from 'umi';

import {
  queryUserCheckInfo,
  checkUserCaptcha,
  submitNewPassword,
  queryUserPasswordRuls,
} from './service';

export interface StateType {
  // 执行的步骤verify, modify, result
  // 验证方式 verify-password, verify-mail, verify-phone
  current?: string;
  signature?: string; // 用于更新密码使用的签名
  stepData?: {
    //captcha?: string; // 验证码
    email?: string;
    phone?: string;
  };
  warnData?: {
    warnModifyMessage?: string;

    warnVerifyPassword?: string; // 警告信息
    warnVerifyEmail?: string; // 警告信息
    warnVerifyPhone?: string; // 警告信息
  };
  passwordRules?: {
    pattern: RegExp;
    message: string;
  }[];
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
    fetchUserPasswordRules: Effect;
  };
  reducers: {
    saveCurrentStep: Reducer<StateType>;
    saveSignature: Reducer<StateType>;
    saveSetpData: Reducer<StateType>;
    saveWarnData: Reducer<StateType>;
    savePasswordRules: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'accountPassword',

  state: {
    current: 'verify',
    stepData: {},
    warnData: {},
    passwordRules: [],
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
          type: 'saveSignature',
          payload: res?.data?.signature,
        });
        yield put({
          type: 'saveCurrentStep',
          payload: 'modify',
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
          type: 'saveSignature',
          payload: res?.data?.signature,
        });
        yield put({
          type: 'saveCurrentStep',
          payload: 'modify',
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
          type: 'saveSignature',
          payload: res?.data?.signature,
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
    *fetchUserPasswordRules(_, { call, put }) {
      const res = yield call(queryUserPasswordRuls);
      if (res?.success) {
        yield put({
          type: 'savePasswordRules',
          payload: res.data,
        });
      } else {
        yield put({
          type: 'savePasswordRules',
          payload: [
            {
              //pattern: /^.*(?=.{6,64})(?=.*\d)(?=.*[A-Z]{2,})(?=.*[a-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/,
              pattern: /^.{6,64}$/,
              message: '最短6位，最长64位', // 该内容作为网络异常的保险,一般不会出现
            },
          ],
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
    saveSignature(state, { payload }) {
      return {
        ...state,
        signature: payload,
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
    savePasswordRules(state, { payload }) {
      return {
        ...state,
        passwordRules: payload,
      };
    },
  },
};

export default Model;
