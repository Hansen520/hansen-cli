/*
 * @Date: 2025-02-11 14:57:04
 * @Description: vite配置文件
 */
import { ConfigEnv, UserConfig, loadEnv } from 'vite'
import { resolve } from "path";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === "build";
  /* 本地根路径 */
  const root = process.cwd();
  /* 通过loadEnv拿到相关的环境变量 */
  const env = loadEnv(mode, root);
  console.log('env', env, 'isBuild', isBuild);
  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    /* 插件的配置 */
    plugins: [
      react(),
    ]
};
}