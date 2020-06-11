# dva的数据连接

写在这里是应为,目前,可以使用useModel方法替换之前的写法,且更加简介,这里只是作为一种功能介绍阐述  
通过 umi 导出类型：ConnectRC，ConnectProps，Dispatch，Action，Reducer，ImmerReducer，Effect，Subscription，和所有 model 文件中导出的类型。  
  
新的解决方案中,我们可以使用useEffect, useState, useRef, useCallback, useModel来替换下面的写法  
  
model 用例  
``` TS
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
export interface IndexModelState {
  name: string;
}
export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}
const IndexModel: IndexModelType = {
  namespace: 'index',
  state: {
    name: '',
  },
  effects: {},
    *fetch(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    }
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          })
        }
      });
    }
  }
};
export default IndexModel;
```
page 用例
``` TS
import React, { FC } from 'react';
import { IndexModelState, ConnectProps, Loading, connect } from 'umi';
interface PageProps extends ConnectProps {
  index: IndexModelState;
  loading: boolean;
}
const IndexPage: FC<PageProps> = ({ index, dispatch }) => {
  const { name } = index;
  return <div >Hello {name}</div>;
};
export default connect(({ index, loading }: { index: IndexModelState; loading: Loading }) => ({
  index,
  loading: loading.models.index,
}))(IndexPage);
```
我们一起来找茬  
umi.ConnectProps => PageProps  
React.FC => umi.ConnectRC  
``` TS
import React from 'react';
import { IndexModelState, ConnectRC, Loading, connect } from 'umi';
interface PageProps {
  index: IndexModelState;
  loading: boolean;
}
const IndexPage: ConnectRC<PageProps> = ({ index, dispatch }) => {
  const { name } = index;
  return <div >Hello {name}</div>;
};
export default connect(({ index, loading }: { index: IndexModelState; loading: Loading }) => ({
  index,
  loading: loading.models.index,
}))(IndexPage);
```

另外一个例子  
``` ts
import {connect} from 'dva'

const Home = props=>{
    // 获取数据
    const {user,loading,dispatch} = props
    
    // 发起请求
    useEffect(()=>{
        dispatch({
            type:'user/fetchUser',payload:{}
        })
    },[])
    
    // 渲染页面
    if(loading) return <div>loading...</div>
    return (
        <div>{user.name}<div>
    )
}

export default connect(({loading,user})=>({
    loading:loading.effects['user/fetchUser'],
    user:user.userInfo
}))(Home)
```
``` ts
import {useDispatch,useSelector} from 'dva'

const Home = props=>{
    
    const dispatch = useDispatch()
    
    const loadingEffect = useSelector(state =>state.loading);
    const loading = loadingEffect.effects['user/fetchUser'];
    const user = useSelector(state=>state.user.userInfo)
    
    // 发起请求
    useEffect(()=>{
        dispatch({
            type:'user/fetchUser',payload:{}
        })
    },[])
    
    // 渲染页面
    if(loading) return <div>loading...</div>
    return (
        <div>{user.name}<div>
    )
}

export default Home
```