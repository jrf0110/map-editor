/**
 * Level
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var Stage = require('./stage');
  var Level = Stage.extend({
    
  });

  return Level;
});