/**
 * Cleanup Null
 */

var utils = require('utils');

module.exports = function( options ){
  options = options || {};

  return function( results, $query, schema, done ){
    if ( !options.fields ) return done();

    results.forEach( function( result ){
      options.fields.forEach( function( field ){
        if ( Array.isArray( result[ field ] ) ) return;

        result[ field ] = utils.without( result[ field ], null );
      });
    });

    done();
  };
};