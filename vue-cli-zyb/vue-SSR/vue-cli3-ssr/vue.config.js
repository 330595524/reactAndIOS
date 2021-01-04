const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const env = process.env;
const isServer = env.RUN_ENV === "server";

module.exports = {
  lintOnSave: false,
  publicPath: "./",
  outputDir: `dist/${env.RUN_ENV}`,
  configureWebpack: {
    // 将 entry 指向应用程序的 server / client 文件
    entry: `./src/entry-${env.RUN_ENV}.js`,
    devtool: "eval",
    // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
    // 并且还会在编译 Vue 组件时，
    // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
    target: isServer ? "node" : "web",
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    output: {
      libraryTarget: isServer ? "commonjs2" : undefined,
    },
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    externals: isServer
      ? nodeExternals({
          // 不要外置化 webpack 需要处理的依赖模块。
          // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
          // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
          allowlist: /\.css$/,
        })
      : undefined,
    optimization: { splitChunks: isServer ? false : undefined },
    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 服务端默认文件名为 `vue-ssr-server-bundle.json`
    // 客户端默认文件名为 `vue-ssr-client-manifest.json`
    plugins: [isServer ? new VueSSRServerPlugin() : new VueSSRClientPlugin()],
  },
};

