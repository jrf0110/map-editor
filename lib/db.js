var fs      = require('fs');
var path    = require('path');
var dirac   = require('dirac');
var config  = require('../config');

// Middleware
dirac.use( dirac.embeds() );
dirac.use( dirac.castToJSON() );
dirac.use( dirac.tableRef() );
dirac.use( require('./db-middleware/json-default')() );
dirac.use( require('./db-middleware/query-defaults')() );

dirac.cleanupNulls = require('./db-middleware/cleanup-nulls');

// Register tables
var dir = path.join( __dirname, 'collections' );

fs.readdirSync( dir ).filter( function( file ){
  return fs.statSync( path.join( dir, file ) ).isFile();
}).map( function( t ){
  return path.join( dir, t );
}).forEach( require );

dirac.init( config.db );

for ( var key in dirac.dals ) module.exports[ key ] = dirac.dals[ key ];

module.exports.sync = dirac.sync;