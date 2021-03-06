/**
 * Character Base
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}

define(function(require){
  var utils     = require('utils');
  var config    = require('config');
  var Thing     = require('thing');
  var gamepad   = require('gamepad');
  var viewport  = require('viewport');

  return Thing.extend({
    moveTransition: [
      '-webkit-transform '
    , config.thingMoveDuration / 1000
    , 's linear'
    ].join('')

  , events: {
      // 'click': 'onClick'
    }

  , template: utils.template([
      '<div class="character looking-{{model.direction}}"></div>'
    ].join(''))

  , initialize: function(){
      this.$el.css( '-webkit-transition', this.moveTransition );
      this.model.on( 'change:x change:y', this.onPositionChange, this );
      this.model.on( 'change:direction',  this.onDirectionChange, this );

      this.direction = this.model.get('direction');

      return Thing.prototype.initialize.apply( this, arguments );
    }

  , render: function(){
      Thing.prototype.render.apply( this, arguments );
      this.$character = this.$el.find('.character');
      this.$character.css(
        'background-image', [
          'url('
        , this.model.get('sprite')
        , ')'
        ].join('')
      );
      this.$character.addClass( 'character-' + [
        this.model.get('width')
      , this.model.get('height')
      ].join('x'));
      return this;
    }

  , renderPosition: function(){
      Thing.prototype.renderPosition.apply( this, arguments );
      return this;
    }

  , changeDirection: function( direction ){
      this.$character.removeClass( 'looking-' + this.direction );
      this.$character.addClass( 'looking-' + direction );
      this.direction = direction;
      return this;
    }

  , onPositionChange: function( model ){
      this.renderPosition();
    }

  , onDirectionChange: function( model ){
      this.changeDirection( model.get('direction') );
    }

  , onClick: function(){
      gamepad.takeControl( this.model );
      viewport.follow( this.model );
    }
  });
});