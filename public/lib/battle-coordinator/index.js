/**
 * Battle Coordinator
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var utils   = require('utils');
  var turns   = require('./turns');
  var bounder = require('./bounder');

  var coordinator = Object.create({
    init: function( options ){
      if ( typeof options !== 'object' ){
        throw new Error([
          '`BattleCoordinator.init` - first argument should be `object`,'
        , 'found `' + typeof options + '`'
        ].join(' '));
      }

      if ( !('players' in options) ){
        throw new Error([
          '`BattleCoordinator.init` - first argument should have'
        , 'a `players` property'
        ].join(' '));
      }

      if ( !('stage' in options) ){
        throw new Error([
          '`BattleCoordinator.init` - first argument should have'
        , 'a `stage` property'
        ].join(' '));
      }

      this.players = options.players;
      this.stage = options.stage;

      turns.init( this.players );
    }

  , start: function(){
      this.tick();
    }

  , tick: function(){
      // Get which players turn it is, and character
      var turn = turns.next();

      // Figure out bounds of movement
      turn.bounds = bounder.getBounds( this.stage, turn.character );

      turn.player.requestAction( turn, function( action ){
        // Validate action
        
      });
    }
  });

  return coordinator;
});