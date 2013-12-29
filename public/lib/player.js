/**
 * Player
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var viewport  = require('viewport');
  var gamepad   = require('gamepad');
  var utils     = require('utils');

  var Player = function( options ){
    options = options || {};

    this.characters = options.characters;
    this.type = options.type || 'human';

    return this;
  };

  Player.prototype.requestAction = function( turn ){
    gamepad.takeControl( turn.character );
    viewport.follow( turn.character );

    gamepad.once( 'enter', function(){
      gamepad.dropControl();

      turn.move = {
        x: turn.character.get('x')
      , y: turn.character.get('y')
      };

      turn.complete();
    });

    return this;
  };

  return Player;
});