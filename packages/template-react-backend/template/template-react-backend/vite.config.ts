import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { ConfigEnv, UserConfig, loadEnv } from "vite";
import { viteExternalsPlugin } from "vite-plugin-externals";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteMockServe } from "vite-plugin-mock";
import compression from 'vite-plugin-compression';
import { themeVariables } from "./config/theme";
import windiCSS from 'vite-plugin-windicss';


export default ({ command, mode }: ConfigEnv): UserConfig => {
  /* 判断是否为开发或者生产模式 */
  const isBuild = command === "build";
  /* 本地根路径 */
  const root = process.cwd();
  /* 通过loadEnv拿到相关的环境变量 */
  // const env = loadEnv(mode, root);
  // const { VITE_PORT, VITE_HTTP_API } = env;
  return {
    base: "/",
    root: process.cwd(),
    /* 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息 */
    clearScreen: false,
    server: {
      open: true,
      host: "0.0.0.0",
      proxy: {
        // 以下示例表示：请求URL中含有"/api"，则反向代理到http://localhost
        // 例如: http://localhost:3000/api/login -> http://localhost/api/login
        "/api": {
          target: "http://localhost/",
          changeOrigin: true,
        },
      },
    },

    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    /* 插件的配置 */
    plugins: [
      react(),
      windiCSS(),
      viteMockServe({
        mockPath: "./mock/" /* 设置模拟数据的存储文件夹 */,
        logger: true /* 是否在控制台显示请求日志 */,
        localEnabled: true /* 设置是否启用本地mock文件 */,
        prodEnabled: true /* 设置打包是否启用mock功能 */,
      }),
      // 使用gzip压缩
      compression({
        ext: '.gz', // 生成的压缩文件后缀
        algorithm: 'gzip', // 压缩算法，默认是 gzip
        deleteOriginFile: false, // 是否删除源文件，默认是 false
      }),
      isBuild &&
        createHtmlPlugin({
          template: "./index.html",
          inject: {
            tags: [
              {
                injectTo: "body",
                tag: "script",
                attrs: {
                  src: "https://static.gonglu.info/lib/react.production.min.js",
                },
              },
              {
                injectTo: "body",
                tag: "script",
                attrs: {
                  src: "https://static.gonglu.info/lib/react-dom.production.min.js",
                },
              },
            ],
          },
        }),
      isBuild &&
        viteExternalsPlugin({
          react: "React",
          "react-dom": "ReactDOM",
          lazy: ["React", "lazy"],
        }),
    ],
    /* css相关的配置 */
    css: {
      /* 样式的重命名 */
      modules: {
        generateScopedName: "[name]__[local]___[hash:base64:5]",
        hashPrefix: "prefix",
      },
      /* 主题颜色的配置 */
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: themeVariables,
        },
      },
    },
    // Externals 和代码分割只能选其一
    // optimizeDeps: {
    // 只打包使用到的第三方依赖库
    // include: ["react", "react-dom", "lodash"],
    // },
    /* 打包的配置 */
    build: {
      target: "modules" /* 打包的方式默认以modules */,
      outDir: "dist" /* 输出的目录 */,
      assetsDir: "assets" /* 打包完的资源存放 */,
      cssCodeSplit: true /* css代码分割 */,
      assetsInlineLimit: 4096 /* 打包限制2g */,
      sourcemap: isBuild /* 只在开发模式下打开sourcemap */,
      chunkSizeWarningLimit: 2000 /* 包分块得极限大小 */,
    },
  };
};
