/**
 * Boundary Decider
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var utils = require('utils');

  var bounder = {
    getBounds: function( stage, character ){
      var bounds = [];

      // Just draw a simple rectangle bounding region
      var y, x, startY, startX, endY, endX;

      startY  = character.get('y') - 4;
      endY    = character.get('y') + 4;

      for ( y = startY; y <= endY; y++ ){
        startX  = character.get('x') - 4;
        endX    = character.get('x') + 4;

        for ( x = startX; x <= endX; x++ ){
          bounds.push({ x: x, y: y });
        }
      }

      return bounds;
    }
  };

  return bounder;
});