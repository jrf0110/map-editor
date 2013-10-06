define(function(require){
  var utils = require('utils');
  var Thing = require('../models/thing');

  var Things = utils.Collection.extend({
    url: function(){
      return this.world.url() + '/things';
    }

  , model: Thing

  , initialize: function( models, options ){
      this.world = options.world;
      return this;
    }
  });

  return Things;
});