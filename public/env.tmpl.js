/**
 * Env.Tmpl
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  return {
    env: 'dev'
  };
});