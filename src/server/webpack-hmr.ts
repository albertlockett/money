import * as core from "express-serve-static-core";
import * as webpack from 'webpack';


require('babel-register')({ only: /webpack.config.js/ });
const webpackConfig = require('../../../webpack.config.js').default;

// setup webpack HMR
export const addWebpackHMR = (app: core.Express) : void => {

  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, 
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require("webpack-hot-middleware")(compiler));

};


