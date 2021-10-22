const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// nodejs의 내보내기 문법
module.exports = (env, options) => {
  // options이 중요하지만 env를 안쓰면 options에 env가 들어온다.
  console.log(env, options);
  return {
    resolve: {
      extensions: [".js"],
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
    entry: "./src/main.js", // entry 포인트는 여러개를 지정 할 수 있다. (객체 리터럴 사용)
    output: {
      // output은 객체 데이터, entry의 key이름에 따라 output 파일 이름이 정해진다.
      // path: '',
      // filename: ''
      publicPath: "/",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.s?css$/,
          use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new HtmlPlugin({
        template: "./src/index.html",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "static",
          },
        ],
      }),
    ],
    // devServer: {
    //   port: 8080,
    //   open: true,
    //   historyApiFallback: true,
    // },
  };
};
