/**
 * JSON default
 * Sets the default value for json types
 */

module.exports = function( options ){
  options = options || {};

  var defaults = {
    value: "'{}'"
  };

  for ( var key in defaults ){
    if ( !(key in options) ) options[ key ] = defaults[ key ];
  }

  return function( dirac ){
    Object.keys( dirac.dals ).forEach( function( dal ){
      dal = dirac.dals[ dal ];

      Object.keys( dal.schema ).filter( function( col ){
        col = dal.schema[ col ];
        return col.type === 'json' && !('default' in col);
      }).forEach( function( col ){
        dal.schema[ col ].default = options.value;
      });
    });
  };
};