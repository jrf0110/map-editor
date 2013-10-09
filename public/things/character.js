/**
 * Character Base
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var utils = require('utils');
  var Thing = require('thing');

  return Thing.extend({
    moveTransition: '-webkit-transform 0.1s linear'

  , initialize: function(){
      this.$el.css( '-webkit-transition', this.moveTransition );
      this.model.on( 'change:x change:y', this.onPositionChange, this );
      return Thing.prototype.initialize.apply( this, arguments );
    }

  , renderPosition: function(){

      Thing.prototype.renderPosition.apply( this, arguments );
      return this;
    }

  , onPositionChange: function( model ){
      this.renderPosition();
    }
  });
});