var fs      = require('fs');
var path    = require('path');
var dirac   = require('dirac');
var config  = require('../config');

dirac.use( require('./db-middleware/json-default')() );
dirac.use( require('./db-middleware/cast-to-json')() );

// Register collections
var dir = path.join( __dirname, 'collections' );

fs.readdirSync( dir ).filter( function( file ){
  return fs.statSync( path.join( dir, file ) ).isFile();
}).map( function( t ){
  return require( './collections/' + t );
}).forEach( dirac.register );

dirac.init( config.db );

dirac.sync();

module.exports = dirac.dals;