const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost',
  compress: true,
  open: true,
  stats: {
    colors: true,
    chunks: false,
    assets: false,
    timings: false,
    modules: false,
    hash: false,
    version: false
  } 
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(3000, () => {
  console.log('dev server listening on port 5000');
});