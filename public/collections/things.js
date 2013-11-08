define(function(require){
  var utils = require('utils');
  var Thing = require('../models/thing');

  var Things = utils.Collection.extend({
    url: function(){
      return this.stage.url() + '/things';
    }

  , model: Thing

  , initialize: function( models, options ){
      this.stage = options.stage;
      return this;
    }
  });

  return Things;
});