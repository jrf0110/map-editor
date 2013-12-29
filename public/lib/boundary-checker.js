/**
 * Boundary Checker
 *
 * This is kind of a hack module. I'm using it as a proxy to stage since
 * Models.Thing requires some way of seeing if it "canMove" somewhere.
 * World seems like the best place for the can something move logic.
 *
 * However, World depends on Collections.Things which depends on
 * Models.Thing, so that would produce a cyclic dependency.
 *
 * The solution would be to take the Thing position move logic out and
 * move it somewhere else, though I'm not sure where.
 */

define(function(require){
  var utils = require('utils');

  var checker = {
    setStage: function( stage ){
      checker.stage = stage;
    }

  , check: function( x, y ){
      return checker.stage.model.canMove( x, y );
    }
  };

  return checker;
});