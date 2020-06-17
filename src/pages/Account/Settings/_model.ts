//
// 使用useRequest简化内容, 可以省略model.ts内容
// 一般如果业务被前端实现,且比较复杂时候(非一两个请求就能完成), 这需要独立的model完成实现
// 如果业务比较简单,只有1,2个接口就能完成时候,则直接使用useRequest即可
//
// import {useDispatch,useSelector,useModel,useIntl,IntlShape,} from 'umi';
//const dispatch = useDispatch();
//const loadingEffect = useSelector((state: any) => state.loading);
//const loading = loadingEffect.effects['accountSettings/fetchConfigBase'];
//const base: ConfigBase = useSelector((state: any) => state['accountSettings'].base);
//useEffect(() => {dispatch({ type: 'accountSettings/fetchConfigBase' })}, []);
//
import { Effect, Reducer } from 'umi';
import {
  ConfigBase,
  ConfigSecurity,
  ConfigBinding,
  ConfigNotification,
  GeographicItemType,
} from './data';
import {
  queryUserBasic,
  queryProvince,
  queryCity,
  queryUserSecurity,
  queryUserBinding,
  queryUserNotices,
} from './service';

export interface ModelState {
  province?: Record<string, GeographicItemType[]>;
  city?: Record<string, GeographicItemType[]>;

  base?: Partial<ConfigBase>;
  security?: Partial<ConfigSecurity>;
  binding?: Partial<ConfigBinding>;
  notices?: Partial<ConfigNotification>;
}

export interface ModelType {
  namespace: string;
  state: ModelState;
  effects: {
    fetchProvince: Effect;
    fetchCity: Effect;

    fetchConfigBase: Effect;
    fetchConfigSecurity: Effect;
    fetchConfigBinding: Effect;
    fetchConfigNotification: Effect;
  };
  reducers: {
    setProvince: Reducer<ModelState>;
    setCity: Reducer<ModelState>;

    setConfigBase: Reducer<ModelState>;
    setConfigSecurity: Reducer<ModelState>;
    setConfigBinding: Reducer<ModelState>;
    setConfigNotification: Reducer<ModelState>;
  };
}

const Model: ModelType = {
  namespace: 'accountSettings',

  state: {},

  effects: {
    *fetchConfigBase(_, { call, put }) {
      const response = yield call(queryUserBasic);
      if (response?.success) {
        yield put({
          type: 'setConfigBase',
          payload: response.data,
        });
      }
    },
    *fetchConfigSecurity(_, { call, put }) {
      const response = yield call(queryUserSecurity);
      if (response?.success) {
        yield put({
          type: 'setConfigSecurity',
          payload: response.data,
        });
      }
    },
    *fetchConfigBinding(_, { call, put }) {
      const response = yield call(queryUserBinding);
      if (response?.success) {
        yield put({
          type: 'setConfigBinding',
          payload: response.data,
        });
      }
    },
    *fetchConfigNotification(_, { call, put }) {
      const response = yield call(queryUserNotices);
      if (response?.success) {
        yield put({
          type: 'setConfigNotices',
          payload: response.data,
        });
      }
    },
    *fetchProvince({ payload: country }, { call, put }) {
      const response = yield call(queryProvince, country);
      if (response?.success) {
        let pp = ({}[country] = response.data);
        yield put({
          type: 'setProvince',
          payload: pp,
        });
      }
    },
    *fetchCity({ payload: { country, province } }, { call, put }) {
      const response = yield call(queryCity, country, province);
      if (response?.success) {
        let cc = ({}[country + '_' + province] = response.data);
        yield put({
          type: 'setCity',
          payload: cc,
        });
      }
    },
  },

  reducers: {
    setConfigBase(state, action) {
      return {
        ...state,
        base: action.payload,
      };
    },
    setConfigSecurity(state, action) {
      return {
        ...state,
        security: action.payload,
      };
    },
    setConfigBinding(state, action) {
      return {
        ...state,
        binding: action.payload,
      };
    },
    setConfigNotification(state, action) {
      return {
        ...state,
        notices: action.payload,
      };
    },
    setProvince(state, action) {
      return {
        ...state,
        province: { ...state?.province, ...action.payload },
      };
    },
    setCity(state, action) {
      return {
        ...state,
        city: { ...state?.city, ...action.payload },
      };
    },
  },
};

export default Model;
