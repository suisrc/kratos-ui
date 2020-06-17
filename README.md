# kratos-ui

## 说明
项目受[ory/kratos](https://github.com/ory/kratos)启发，要构建一个云原生身份和用户管理系统，目前好的解决方案有[keycloak](https://www.keycloak.org/)，由于java开发，且功能复杂，并不适合轻应用。[ory/kratos](https://github.com/ory/kratos)为golang开发，但是目前并没有提供可用版本。鉴于[gluu](https://www.gluu.org/)的影响，使用[Reactjs](https://reactjs.org/)用于应用鉴权系统，其庞大的组件库很好的解决了鉴权系统的重复开发问题。同时鉴于系统的稳定性和可扩展性，使用[Eggjs](https://eggjs.org/) 作为应用的web框架，使用[Umijs](https://umijs.org/)开发用于登录，注册，管理部分的交互页面。  
该部分仅仅是项目的UI部分

## 构建

### kratos-app构建

```
cnpm init egg --type=simple
cnpm i
```

### kratos-ui构建

```
tyarn create @umijs/umi-app
tyarn install
umi dev
```
插件安装
```
tyarn add @umijs/preset-ui -D
tyarn add @umijs/plugin-ui -D
```

### 脚手架安装
```
cnpm i tyarn -g
tyarn global add umi
cnpm i umi@2.13.13 -g
umi ui
```

## 特别鸣谢
[Eggjs](https://eggjs.org/) 企业级Node.js框架  
[Umijs](https://umijs.org/) 可插拔的企业级 react 应用框架  
[Reactjs](https://reactjs.org/) 一个用于构建用户界面的JavaScript库  
[Passort](http://www.passportjs.org/) Node.js的身份验证中间件  