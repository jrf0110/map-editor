define(function(require){
  var utils   = require('utils');
  var Things  = require('../collections/things');

  var World = utils.Model.extend({
    urlRoot: '/api/worlds'

  , setTransforms: {
      things: function( val ){
        var things = new Things( val, { world: this } );

        this.thingPositions = {};

        things.each( this.cacheThingPosition.bind( this ) );

        things.on( 'change:x change:y', this.onThingsChange, this );

        return things;
      }
    }

  , canMove: function( x, y ){
      if ( x < 0 || y < 0 ) return false;
      if ( x >= this.attributes.tiles.length ) return false;
      if ( y >= this.attributes.tiles.length ) return false;

      if ( this.thingPositions[ x + 'x' + y ] ) return false;

      return true;
    }

  , cacheThingPosition: function( thing ){
      var x, y, l, ll;

      if ( thing.changedAttributes() ){
        for ( y = thing.previous('y'), l = thing.previous('y') + thing.previous('height'); y < l; ++y ){
          for ( x = thing.previous('x'), ll = thing.previous('x') + thing.previous('width'); x < ll; ++x ){
            delete this.thingPositions[ x + 'x' + y ];
          }
        }
      }
    
      for ( y = thing.get('y'), l = thing.get('y') + thing.get('height'); y < l; ++y ){
        for ( x = thing.get('x'), ll = thing.get('x') + thing.get('width'); x < ll; ++x ){
          this.thingPositions[ x + 'x' + y ] = true;
        }
      }

      return this;
    }

  , onThingsChange: function( thing ){
      this.cacheThingPosition( thing );
    }
  });

  var world = new World();

  return world;
});