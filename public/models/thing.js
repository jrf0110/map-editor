/**
 * Thing
 */

define(function(require){
  var utils = require('utils');

  return utils.Model.extend({
    defaults: {
      x:          0
    , y:          0
    , direction: 'down'
    }

  , move: function( direction ){
      if ( ['up', 'down', 'left', 'right'].indexOf( direction ) === -1 ){
        throw new Error('Models.Thing.move - invalid direction `' + direction + '`');
      }

      var axis = ['up', 'down'].indexOf( direction ) > -1 ? 'y' : 'x';
      var value = this.get( axis ) + ( ['up', 'left'].indexOf( direction ) > -1 ? -1 : 1 );

      this.set( 'direction', direction );

      this.set( axis, value );

      return this;
    }
  });
});