/**
 * Collections.Heroes
 */

define(function(require){
  var utils = require('utils');
  var user  = require('user');
  var Hero  = require('../models/hero');

  var Heroes = utils.Collection.extend({
    url: function(){
      return [ '/api/users', user.get('id'), 'heroes'].join('/');
    }

  , model: Hero
  });

  return Heroes;
});