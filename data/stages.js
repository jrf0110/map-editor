/**
 * Stages
 *
 * {
    id:         { type: 'serial', primaryKey: true }
  , name:       { type: 'text' }
  , size:       { type: 'integer' }
  , tiles:      { type: 'json', default: "'[]'" }
  , things:     { type: 'json', default: "'{}'" }
  }
 */

var data = module.exports = [];

var size = 100;
data.push({
  name: 'Plains 1'
, size: size
, tiles: (function(){
    var i, ii, result = [], inner;

    for ( i = 0; i < size; i++ ){
      inner = [];
      for ( ii = 0; ii < size; ii++ ){
        inner.push('ground ground-grass-1');
      }
      result.push( inner );
    }
    return result;
  })()

, things: [{"type":"House","x":10,"y":18,"width":10,"height":6,"direction":"down","perceivedModX":1,"perceivedModY":2,"perceivedModWidth":-2,"perceivedModHeight":-1}]
});

var size = 80;
data.push({
  name: 'Plains 2'
, size: size
, tiles: (function(){
    var i, ii, result = [], inner;

    for ( i = 0; i < size; i++ ){
      inner = [];
      for ( ii = 0; ii < size; ii++ ){
        inner.push('ground ground-grass-1');
      }
      result.push( inner );
    }
    return result;
  })()

, things: [{"type":"House","x":8,"y":18,"width":6,"height":6,"direction":"down","perceivedModX":1,"perceivedModY":2,"perceivedModWidth":-2,"perceivedModHeight":-1}]
});