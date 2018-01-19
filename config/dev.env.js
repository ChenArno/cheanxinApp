var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.7.33"',
  BASE_PORT:'"8088"',
  SYS_CODE:'"sys0002"',
  MODULE_URL:'"/tjpsc"'
  // MODULE_URL:'"/tianji-paas-consumer"'
});
