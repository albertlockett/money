import path from 'path';

export default {
  entry: {
    app: path.join(__dirname, 'lib', 'es5', 'app', 'index.js')
  },
  target: 'web',
  output: {
    path: path.join(__dirname, 'lib', 'docbase'),
    filename: 'bundle.js'
  }
};
