var utils   = require('./lib/utils');
var eConfig = require('./env');
var config  = {};

/**
 * Change configuration environment
 * @param  {String} env The environment to change to
 */
var changeEnvironment = function(env){
  if (env === null || !config.hasOwnProperty(env)) env = 'dev';

  var key;

  for (key in module.exports) delete module.exports[key];

  var _config = {};

  _config = utils.merge( utils.clone(config.default), config[env] );

  for (key in _config) module.exports[key] = _config[key];

  module.exports.env = env;
  module.exports.changeEnvironment = changeEnvironment;
};

/**
 * Default Configuration
 * Specific environments will override defaults
 */
config.default = {

  httpPort: process.env.MAP_EDITOR_PORT || 3300

, cookieSecret: process.env.MAP_EDITOR_COOKIE_SECRET || 'default cookie secret'

, db: {
    database: 'map_editor'
  }
};

/**
 * Test Configuration
 */
config.test = {
  
};

/**
 * Dev Configuration
 */
config.dev = {

};

/**
 * Production Configuration
 */
config.prod = {
  
};

module.exports = {};

// Set the initial environment
changeEnvironment( process.env.MAP_EDITOR_ENV || 'dev' );
