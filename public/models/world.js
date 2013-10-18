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

  , canMove: function( x, y ){
      if ( x < 0 || y < 0 ) return false;
      if ( x >= this.attributes.tiles.length ) return false;
      if ( y >= this.attributes.tiles.length ) return false;

      return true;
    }
  });

  var world = new World();

  return world;
});