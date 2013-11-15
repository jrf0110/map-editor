/**
 * Thing
 */

define(function(require){
  var utils     = require('utils');
  var boundary  = require('boundary');

  return utils.Model.extend({
    defaults: {
      x:                    0
    , y:                    0
    , direction:            'down'
    , perceivedModX:        0
    , perceivedModY:        0
    , perceivedModWidth:    0
    , perceivedModHeight:   0
    }

  , move: function( direction ){
      if ( ['up', 'down', 'left', 'right'].indexOf( direction ) === -1 ){
        throw new Error('Models.Thing.move - invalid direction `' + direction + '`');
      }

      var axis = ['up', 'down'].indexOf( direction ) > -1 ? 'y' : 'x';
      var value = this.get( axis ) + ( ['up', 'left'].indexOf( direction ) > -1 ? -1 : 1 );

      this.set( 'direction', direction );

      var canMove = boundary.check(
        axis === 'x' ? value : this.get('x')
      , axis === 'y' ? value : this.get('y')
      );

      if ( !canMove ) return this;
      this.set( axis, value );

      return this;
    }
  });
});