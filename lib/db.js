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

var castToJSON = function( field ){
  return function( $query, schema, next ){
    if ( typeof ($query.updates || {})[ field ] == 'object' ){
      $query.updates[ field ] = JSON.stringify( $query.updates[ field ] );
    }

    if ( typeof ($query.values || {})[ field ] == 'object' ){
      $query.values[ field ] = JSON.stringify( $query.values[ field ] );
    }

    next();
  };
};

dirac.dals.worlds.before( 'insert', castToJSON('tiles') );
dirac.dals.worlds.before( 'update', castToJSON('tiles') );

dirac.dals.worlds.before( 'insert', castToJSON('things') );
dirac.dals.worlds.before( 'update', castToJSON('things') );

module.exports = dirac.dals;