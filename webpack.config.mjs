import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_PATH = process.env.CI
  ? "/only-task/"
  : "/";

const config = (env) => {
  const isDev = env.mode === "development";

  return {
    mode: env.mode || "production",
    entry: "./main.tsx",
    context: path.resolve(__dirname, "src"),
    devtool: isDev ? "inline-source-map" : "source-map",
    output: {
      clean: true,
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: PUBLIC_PATH,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@types": path.resolve(__dirname, "src/types"),
      },
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
      hot: true,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.(json|png|svg|jpg|jpeg|gif|ico)$/,
          type: "asset/resource",
        },
        {
          test: /\.module\.css$/,
          exclude: /node_modules\/(?!@patterninc\/react-ui).*/,
          // format system needs style-loader because when you import a module, it needs to inject the CSS itself as well. and minicssextractplugin doesn't do that by default
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: /\.module\.s?css$/,
                  localIdentName: '[name]__[local]__[hash:base64:5]',
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.tsx?$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Only Test Task",
        template: path.resolve(__dirname, "webpack.html"),
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "assets", to: "." }],
      }),
    ],
  };
};

export default config;