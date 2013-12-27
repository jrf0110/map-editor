/**
 * Models.Hero
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var utils = require('utils');
  var Character = require('./character');

  var Hero = Character.extend({
    initialize: function( attributes ){
      if ( this.get('party') ){
        this.set('party', this.get('party').map( function( p ){
          return new Character( p );
        }));
      }
    }
  });

  return Hero;
});