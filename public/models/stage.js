define(function(require){
  var utils   = require('utils');
  var Things  = require('../collections/things');

  var Stage = utils.Model.extend({
    urlRoot: '/api/levels'

  , setTransforms: {
      things: function( val ){
        var things = new Things( val, { stage: this } );

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
        y = thing.previous('y') + thing.previous('perceivedModY');
        
        l = y + thing.previous('height') + thing.previous('perceivedModHeight');

        for (; y < l; ++y ){
          x = thing.previous('x') + thing.previous('perceivedModX');
          ll = x + thing.previous('width') + thing.previous('perceivedModWidth');
          for (; x < ll; ++x ){
            delete this.thingPositions[ x + 'x' + y ];
          }
        }
      }

      y = thing.get('y') + thing.get('perceivedModY');
      l = y + thing.get('height') + thing.get('perceivedModHeight');

      for (; y < l; ++y ){
        x = thing.get('x') + thing.get('perceivedModX');
        ll = x + thing.get('width') + thing.get('perceivedModWidth');
        for (; x < ll; ++x ){
          this.thingPositions[ x + 'x' + y ] = true;
        }
      }

      return this;
    }

  , onThingsChange: function( thing ){
      this.cacheThingPosition( thing );
    }
  });

  return Stage;
});