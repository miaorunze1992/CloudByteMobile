# CloudByteMobile

# CB_APP_FRONT

 ###### 启动项目
 npx react-native run-ios --simulator 'iPhone 14'

 ###### 项目目录_需要继续完善
 ```
 CloudByte/
├── App.tsx
├── app.json
├── index.ts
├── package.json
└── src/
    ├── assets/
    │   ├── fonts/
    │   └── images/
    ├── components/
    │   ├── Common/
    │   └── MyComponent/
    │       ├── MyComponent.tsx
    │       └── styles.ts
    ├── config/
    │   ├── api.ts
    │   ├── colors.ts
    │   ├── routes.ts
    │   └── theme.ts
    ├── hooks/
    ├── navigation/
    │   ├── AppNavigator.tsx
    │   ├── index.ts
    │   └── StackNavigators/
    ├── screens/
    │   ├── Home/
    │   │   ├── HomeScreen.tsx
    │   │   └── styles.ts
    │   └── Profile/
    │       ├── ProfileScreen.tsx
    │       └── styles.ts
    ├── services/
    │   ├── api/
    │   └── storage/
    ├── store/
    │   ├── actions/
    │   ├── reducers/
    │   └── index.ts
    └── utils/
        ├── formatters.ts
        ├── helpers.ts
        └── validators.ts
 ```
assets：存放项目中使用的静态资源，如字体、图片等。
components：存放可复用的UI组件。每个组件都有一个独立的文件夹，包含组件代码和样式文件。
config：存放项目配置文件，如API配置、颜色定义、路由配置和主题设置。
hooks：存放自定义React Hooks。
navigation：存放导航相关的代码。AppNavigator负责管理顶层导航，其他导航器（如堆栈导航器、选项卡导航器等）放在子文件夹中。
screens：存放应用程序的各个屏幕。每个屏幕都有一个独立的文件夹，包含屏幕代码和样式文件。
services：存放与后端服务交互的代码，如API请求和本地存储操作。
store：存放Redux（或其他状态管理库）相关的代码，如actions、reducers等。
utils：存放通用的工具函数，如格式化、辅助函数和验证器。

