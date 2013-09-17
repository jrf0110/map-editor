var dirac = require('dirac');
var config = require('../config');

dirac.init( config.db );

// Collection filenames to register with dirac
[
  'worlds'
, 'things'
].map( function( t ){
  return require( './collections/' + t );
}).forEach( dirac.register );

dirac.sync();

var castTilesToJSON = function( $query, schema, next ){
  if ( typeof ($query.updates || {}).tiles == 'object' ){
    $query.values.tiles = JSON.stringify( $query.values.tiles );
  }

  if ( typeof ($query.updates || {}).tiles == 'object' ){
    $query.values.tiles = JSON.stringify( $query.values.tiles );
  }

  next();
};

dirac.dals.worlds.before( 'insert', castTilesToJSON );
dirac.dals.worlds.before( 'update', castTilesToJSON );

module.exports = dirac.dals;