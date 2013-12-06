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

  var turn = Object.create({
    init: function( players ){
      this.players = players;
      this.currPlayerTurnIndex = 0;
      this.playerCharacterCurrentIndices = {};
    }

    // Simple turn-cycling algorithm that really sucks
  , next: function(){
      var turn = {};

      if ( this.currPlayerTurnIndex >= players.length ){
        this.currPlayerTurnIndex = 0;
      }

      turn.player = this.players[ this.currPlayerTurnIndex++ ];


    }
  });

  return turn;
});