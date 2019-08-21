# react-component-starter
React 组件脚手架，可以调试、打包、发布单个 React 组件。

## 初始化脚手架

想使用本脚手架，只需要：

```sh
git clone https://github.com/caihuascript/react-simple-utils.git component_name
```

## 调试

调试指的是本地调试 React 组件，只需要：

```
npm start
```

## 注意

   如果无法正常启动可能是node版本问题
   切换host
   
   是本地变量问题导致（打开host）
   127.0.0.1 localhost

## 打包

打包指的是将 React 组件编译打包成 js 和 css 文件，方便其他组件调用，只需要：

```sh
npm run dist
```

## 发布

发布指的是将 React 组件发布到 npm 仓库中，首先执行此命令重新指定你的 npm 包的 name 和 version 等信息：

```sh
npm init
```

然后，登录 npm：

```sh
npm login
```

最后，发布：

```sh
npm publish
```

## 调用 React 组件

发布完成后，就可以在调用了。

首先，安装你发布的 React 组件

```sh
npm i react_component --save
```

然后，在代码中调用：

```js
import ReactComponent from 'react_component';
```
就可以使用了！