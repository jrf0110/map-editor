define(function(require){
  var worlds = {};

  var allGrass = function( size ){
    var tiles = [];

    for ( var y = 0; y < size; ++y ){
      tiles[ y ] = [];

      for ( var x = 0; x < size; ++x ){
        tiles[ y ][ x ] = 'ground ground-grass-1';
      }
    }

    return tiles;
  };

  worlds['all-grass-100x100'] = {
    name: 'All Grass 100x100'
  , size: 100
  , tiles: allGrass( 100 )
  };

  worlds['all-grass-200x200'] = {
    name: 'All Grass 200x200'
  , size: 200
  , tiles: allGrass( 200 )
  };

  return worlds;
});