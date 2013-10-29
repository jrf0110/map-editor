var fs      = require('fs');
var path    = require('path');
var dirac   = require('dirac');
var config  = require('../config');


dirac.init( config.db );

// Register collections
var dir = path.join( __dirname, 'collections' );

fs.readdirSync( dir ).filter( function( file ){
  return fs.statSync( path.join( dir, file ) ).isFile();
}).map( function( t ){
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

dirac.dals.stages.before( 'insert', castToJSON('tiles') );
dirac.dals.stages.before( 'update', castToJSON('tiles') );

dirac.dals.stages.before( 'insert', castToJSON('things') );
dirac.dals.stages.before( 'update', castToJSON('things') );

module.exports = dirac.dals;