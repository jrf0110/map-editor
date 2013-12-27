/**
 * Query Defaults
 */

var utils = require('utils');

module.exports = function( options ){
  options = options || {};

  utils.defaults( options, {
    operations: [ 'find', 'findOne', 'insert', 'remove', 'update' ]
  });

  return function( dirac ){
    Object.keys( dirac.dals ).filter( function( table ){
      return typeof dirac.dals[ table ].queryDefaults === 'function';
    }).forEach( function( table ){
      var dal = dirac.dals[ table ];

      options.operations.forEach( function( op ){
        dal.before( op, function( $query, schema, next ){
          utils.defaults( $query, dal.queryDefaults() );
          next();
        });
      });
    });
  };
};