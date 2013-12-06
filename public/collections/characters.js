/**
 * Collection Characters
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var utils = require('utils');
  var Character = require('../models/character');

  var Characters = utils.Collection.extend({
    model: Character
  });

  return Characters;
});