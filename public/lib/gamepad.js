/**
 * Gamepad
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var utils = require('utils');
  var world = require('world');

  var gamepad = {
    takeControl: function( character ){
      gamepad.character = character;
      return gamepad;
    }

  , dropControl: function(){
      delete gamepad.character;
      return gamepad;
    }

  , up: function(){
      if ( !gamepad.character ) return gamepad;
     gamepad.character.move('up');
     return gamepad;
    }

  , right: function(){
      if ( !gamepad.character ) return gamepad;
      gamepad.character.move('right');
      return gamepad;
    }

  , down: function(){
      if ( !gamepad.character ) return gamepad;
      gamepad.character.move('down');
      return gamepad;
    }

  , left: function(){
      if ( !gamepad.character ) return gamepad;
      gamepad.character.move('left');
      return gamepad;
    }
  };

  utils.key( 'w', utils.throttle( gamepad.up, 100 ) );
  utils.key( 's', utils.throttle( gamepad.down, 100 ) );
  utils.key( 'a', utils.throttle( gamepad.left, 100 ) );
  utils.key( 'd', utils.throttle( gamepad.right, 100 ) );

  return gamepad;
});