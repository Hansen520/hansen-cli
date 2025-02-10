## 添加相关的依赖文件
pnpm add --save-dev -w @changesets/cli prettier-plugin-organize-imports prettier-plugin-packagejson

## 上传npm初始化
npx changeset init

# 在 cli 包添加 create 包为依赖

--filter 指定在 cli 包下执行 add 命令,  加上 --workspace 就是从本地查找

pnpm --filter cli add @hansen-cli/create --workspace
pnpm --filter create add @hansen-cli/utils --workspace

# 安装ts
pnpm add typescript @types/node -w --save-dev

# 初始化 tsconfig.json
pnpm --filter utils exec npx tsc --init

pnpm --filter utils exec node ./dist/test.js

