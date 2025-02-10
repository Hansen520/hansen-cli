



# 相关的模板的介绍

react

vue

h5

# 相关的介绍

为了让自己更好的去优化和改进模板，做了一些相关的知识点的介绍, 本项目是基于pnpm 的 **monorepo**去搭建的，所以避免要有很多这方面的相关知识。

## 初始化子包

`npm init -w packages/core -y`

## 在根目录添加依赖

**-w** 是在根目录安装依赖，加上 -w 才能在根目录安装依赖

`pnpm add --save-dev -w @changesets/cli prettier-plugin-organize-imports prettier-plugin-packagejson`

`pnpm add --save-dev -w typescript @types/node`

## 在给子包添加其他子包的项目

**--filter 指定在 cli 包下执行 add 命令,  加上 --workspace 就是从本地查找**

`pnpm --filter cli add @hansen-cli/create --workspace`

`pnpm --filter create add @hansen-cli/utils --workspace`

## 初始化 tsconfig.json，用exec执行

在子包里面执行命令必需要有**exec**执行项

`pnpm --filter utils exec npx tsc --init`

`pnpm --filter utils exec node ./dist/test.js`

ts一些项目,在package里面添加

```typescript
"type": "module",
"main": "dist/index.js",
"types": "dist/index.d.ts",

```



## 上传npm初始化

`npx changeset init`

然后可以后续的add操作了

`npx changeset add`

然后执行 version 命令来生成最终的 CHANGELOG.md 还有更新版本信息：

`npx changeset version` 

这个命令是基于git的，接下来我们可以进行一系列git操作一直到git commit，最后可以了推送的npm里面的，记得npm一定要登录噢，登录`npm adduser`

`npx changeset publish`

## 脚手架添加命令

在cli里面添加命令，代表这个可以被直接npx执行

切记在cli里面头部加上 `\#!/usr/bin/env node`

```javascript
"bin": {
    "hansen-cli": "./dist/index.js"
},
```

