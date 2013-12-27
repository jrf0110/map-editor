/**
 * Turn Decider
 *
 * Figures out whose turn it is
 */

if (typeof module === 'object' && typeof define !== 'function') {
  var define = function(factory) {
    module.exports = factory(require, exports, module);
  };
}


define(function(require){
  var utils = require('utils');

  var turns = Object.create({
    init: function( players ){
      this.players = players;
      this.turnTick = 0;
      this.playerCharTurnTick = {};

      for ( var i = 0, l = this.players.length; i < l; ++i ){
        this.playerCharTurnTick[ i ] = 0;
      }
    }

    // Simple turn-cycling algorithm that really sucks
  , next: function(){
      var currPlayer;
      var turn = {
        player: this.players[
          currPlayer = this.turnTick++ % this.players.length
        ]
      };
console.log(turn.player.characters);
      turn.character = turn.player.characters[
        this.playerCharTurnTick[ currPlayer ]++ % turn.player.characters.length
      ];
console.log("Turn", turn);
      return turn;
    }
  });

  return turns;
});