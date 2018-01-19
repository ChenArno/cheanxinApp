var merge = require('webpack-merge');
var devEnv = require('./dev.env');

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_API: '"http://192.168.4.116"',
  BASE_PORT:'"8080"',
  SYS_CODE:'"sys0002"',
  MODULE_URL:'"/tianji-paas-consumer"'
});
