# useXXX用法

该用户是reactjs新功能之一,使用该用法,对于组件来,不用在构建class完成构建模块  
### [reactjs](https://reactjs.org/docs/hooks-state.html)
钩子[列表](https://reactjs.org/docs/hooks-reference.html#gatsby-focus-wrapper)  
常用的如下:  

useState: 定义状态对象, 跨渲染周期的  
useRef: 定义数据对象, 跨渲染周期的  
useCallback: 定义内部方法,该方法不用每次渲染都被重新构建,最后一个参数,可以监控伴随变化的内容,如果监听的内容不变,那么返回值也不会改变(前提是没有参数的情况)  
useEffect: 类似初始化方法, 返回值如果是一个方法的话,该方法会在释放组件时候执行  

``` TypeScript
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
//========================================同下
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```
所以整体上,它可以让我们的代码更加精简,并且无需关注繁琐的'bind'操作

### [umijs](https://hooks.umijs.org/zh-CN/hooks)
比较常用的如下:  
  
useModel: 加载模型, 可以在models中定义模块,然后在useModel中引用,最常用的如下  
useAccess: 权限控制  
useRequest: 网络请求  
  
``` TypeScript
const { initialState, setInitialState, refresh, loading } = useModel('@@initialState'); // 获取全局初始化数据模型
const { menus, setMenus, settings, setSettings } = useModel('AuthUser'); // 获取应用模型
const access = useAccess(); // 获取权限控制
const { data, error, loading } = useRequest(getUsername); // 获取网络请求
```
