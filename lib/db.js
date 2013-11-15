var fs      = require('fs');
var path    = require('path');
var dirac   = require('dirac');
var config  = require('../config');

dirac.use( require('./db-middleware/json-default')() );

// Register collections
var dir = path.join( __dirname, 'collections' );

fs.readdirSync( dir ).filter( function( file ){
  return fs.statSync( path.join( dir, file ) ).isFile();
}).map( function( t ){
  return require( './collections/' + t );
}).forEach( dirac.register );

dirac.init( config.db );

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

// Quick and diry heroes lookup
dirac.dals.users.after( 'findOne', function( results, query, schema, next ){
  if ( results.length === 0 ) return next();

  var user = results[0];
  dirac.dals.heroes.find({ user_id: user.id }, function( error, heroes ){
    if ( error ) return next( error );
    user.heroes = heroes;
    next();
  });
});

module.exports = dirac.dals;