/**
 * Dirac Embeds
 *
 * options: {
 *   // The methods to apply `after` filters to for embeds
 *   operations: ['find', 'findOne']
 * }
 */

var async = require('async');

module.exports = function( options ){
  options = options || {};

  var defaults = {
    operations: ['find', 'findOne']
  };

  for ( var key in defaults ){
    if ( !(key in options) ) options[ key ] = defaults[ key ];
  }

  return function( dirac ){
    var embedFn = function( table ){
      var dal = dirac.dals[ table ];

      return function( results, $query, schema, next ){
        if ( !dal ) return next();
        if ( !('embeds' in $query ) ) return next();
        if ( !('embeds' in schema ) ) return next();

        // Filter down to embeds that we can run
        var fns = Object.keys( $query.embeds ).filter( function( key ){
          return $query.embeds[ key ] in schema.embeds;
        }).map( function( key ){
          var embed = schema.embeds[ key ];
          return function( done ){
            embed( results, $query, done );
          };
        });

        async.parallel( fns, next );
      };
    };

    // Filter down to dals that have embeds
    Object.keys( dirac.dals ).filter( function( dal ){
      return 'embeds' in dirac.dals[ dal ];
    // Register embedFn
    }).forEach( function( table ){
      options.operations.forEach( function( op ){
        dirac.dals[ table ].after( op, embedFn( table ) );
      });
    });
  };
};