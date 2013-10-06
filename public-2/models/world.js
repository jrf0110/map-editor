define(function(require){
  var utils   = require('utils');
  var Things  = require('../collections/things');

  var World = utils.Model.extend({
    urlRoot: '/api/worlds'

  , setTransforms: {
      things: function( val ){
        return new Things( val, { world: this } );
      }
    }
  });

  var world = new World();

  return world;
});