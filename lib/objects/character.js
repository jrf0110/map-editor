var utils = require('utils');
var Thing = require('./thing').factory();

module.exports.factory = function(){
  return utils.extend( {}, Thing, {
    name:               { type: 'text' }
  , avatar:             { type: 'text' }
  , sprite:             { type: 'text' }
  });
};