/**
 * Thing
 */

define(function(require){
  var utils = require('utils');

  return utils.Model.extend({
    defaults: {
      x:      0
    , y:      0
    }
  });
});