/**
 * Models.Hero
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var utils = require('utils');
  var Hero = utils.Model.extend({
    
  });

  return Hero;
});