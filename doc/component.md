# 组件定义
() 中的内容是可以理解为一个Recat.ReactNode节点的内容,即"<>...</>"内容
{} 中的内容是可以理解为一段Reactjs代码,其中可以通过if...else...等语法处理
{} 中可以随意使用(), 反之不可以,()中的{}只能用于取值和更新操作, ()中的{}可以使用list.map这种写法.
一个简单的布局
============================================================================================
============================================================================================
``` TypeScript
export default (props: any) => <>{props.children}</>;
```
``` ts
const node = (<>{props.children}</>)
export node;
```

使用React.FC声明
``` TypeScript
import { IRouteComponentProps } from 'umi';
const Layout: React.FC<IRouteComponentProps> = (
   props: IRouteComponentProps,
) => <>{props.children}</>;
export default Layout;
```

============================================================================================
============================================================================================
定义组件
``` TypeScript
const SearchMenu: React.FC<{
  setKeyword: (value: string) => void;
  [key: string]: any;
}> = ({ setKeyword, ...props }) => {
  return (
    <Input.Search  onSearch={setKeyword} />
  );
};
export default SearchMenu;
```

推荐的写法, 就是无返回值类型(TS会自己推断返回值)的写法
``` TypeScript
export const SearchMenu = (proprs: {
  setkeyword: (string: string) => void,
  [key: string]: any;
}) => {
  return (
    <Input.Search  onSearch={proprs.setkeyword} />
  );
}
export default SearchMenu;
```

推荐的写法
``` TypeScript
interface SearchMenuProps {
  setkeyword: (string: string) => void,
  [key: string]: any;
}
const SearchMenu: React.FC<SearchMenuProps> = 
({ setKeyword, ...props }) => {
  return (
    <Input.Search  onSearch={setKeyword} />
  );
};
export default SearchMenu;
```
极简的写法
``` TypeScript
interface SearchMenuProps {
  setkeyword: (string: string) => void,
  [key: string]: any;
}
const SearchMenu = ( props: SearchMenuProps ) => {
  return (
    <Input.Search  onSearch={props.setKeyword} />
  );
};
export default SearchMenu;
```

============================================================================================
============================================================================================
使用React.Component定义
``` TypeScript
import React from 'react';
// tsx 编写react 遇见类型“Readonly<{}>”上不存在属性XXX解决办法
// 另一种方法,可以把React.Component改为React.Component<any, any>
// 推荐使用第一种
type StateType = {
  count: number;
};
interface Example {
  state: StateType;
}
class Example extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}

export default Example;
```