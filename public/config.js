/**
 * Config
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var module  = require('module');
  var utils   = require('utils');
  var env     = require('env');

  var config = {
    defaults: {
      spriteDir: '/assets/sprites'
    , tileSize: 40
    }

  , dev: {

    }

  , prod: {

    }
  };

  var exports = utils.clone( config[ env.env ] );
  utils.defaults( exports, config.defaults );

  return exports;
});