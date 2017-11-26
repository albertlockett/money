import path from 'path';
import webpack from 'webpack';

export default {
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      path.join(__dirname, 'src', 'app', 'index.tsx')
    ],
    login: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      path.join(__dirname, 'src', 'app', 'login.tsx')
    ]
  },
  target: 'web',
  output: {
    path: path.join(__dirname, 'lib', 'docbase'),
    publicPath: '/',
    filename: '[name]-bundle.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" }, 
          { loader: "css-loader" }, 
          { loader: "sass-loader" }
        ]
      },
      { 
        test: /\.tsx?$/, 
        loader: "awesome-typescript-loader",
        options: {
          configFileName: "tsconfig.app.json"
        }
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
