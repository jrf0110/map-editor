/**
 * Gamepad
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var utils   = require('utils');
  var config  = require('config');

  var gamepad = Object.create( utils.extend({
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

  , start: function(){
      gamepad.trigger('enter');
      return gamepad;
    }
  }, utils.Events ));

  utils.key( 'enter', function(){
    gamepad.trigger('enter');
  });
  utils.key( 'e', function(){
    gamepad.trigger('enter');
  });

  var keys = {
    'w': 'up'
  , 's': 'down'
  , 'a': 'left'
  , 'd': 'right'
  };

  Object.keys( keys ).forEach( function( key ){
    utils.key( key, utils.throttle( gamepad[ keys[ key ] ], config.thingMoveDuration ) );
  });

  [
  //   'w+a'
  // , 'w+d'
  // , 's+a'
  // , 's+d'
  ].forEach( function( combo ){
    var handler = utils.throttle( function(){
      var comboA = combo.split('+');
      gamepad[ keys[ comboA[0] ] ]();
      gamepad[ keys[ comboA[1] ] ]();
    }, config.thingMoveDuration );

    utils.key( combo, handler );
  });

  return gamepad;
});