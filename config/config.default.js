/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1599016689974_2893';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    security: {
      csrf: {
        enable: false
      },
    },
    multipart: {
      mode: 'stream',
      autoFields: true,
      fileExtensions: ['.xls', '.xlsx', '.txt', '.doc'],
    },
    cluster: {
      listen: {
        port: 6000,
        hostname: '127.0.0.1',
      }
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
