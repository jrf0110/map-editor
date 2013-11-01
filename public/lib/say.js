/**
 * Say Text
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var utils = require('utils');
  var say = {
    prep: function( $el ){
      var $p = $el.find('> p').clone();
      $el.find('> p').remove();
    }
  };

  return say;
});