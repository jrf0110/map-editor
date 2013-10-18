/**
 * Boundary Checker
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var utils = require('utils');

  var checker = {
    setWorld: function( world ){
      checker.world = world;
    }

  , check: function( x, y ){
      return checker.world.canMove( x, y );
    }
  };

  return checker;
});