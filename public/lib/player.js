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

  var Player = function( characters, options ){
    options = options || {};

    this.characters = characters;
    this.options = options;
  };

  Player.prototype.requestAction = function( turn, callback ){
    gamepad.takeControl( turn.character );
    viewport.follow( turn.character );
  };

  return Player;
});