var dm      = require('dirac-middleware');
var stdm    = require('stdm');
var db      = require('./db');
var utils   = require('./utils');
var errors  = require('./errors');

var m = module.exports = utils.extend( {}, dm, stdm );

m.dirac = dm;

m.value = function( name ){
  return function( req, res, next ){
    // Did not pass this value in the params, continue
    if ( !(name in req.params) ) return next();

    if ( !req.queryObj.values ) req.queryObj.values = {};

    req.body[ name ] = req.param( name );

    next();
  };
};

// m.join_world = function( root_table, param ){
//   return dm.param( param || 'world_id', function( world_id, $query, options ){
//     $query.where = $query.where || {};
//     $query.where[ 'worlds.id' ] = $query.where[ 'worlds.id' ] || {};
//     $query.where[ 'worlds.id' ].$equals = world_id;

//     $query.joins = $query.joins || {};

//     $query.joins.worlds = {
//       on: 'worlds.id': 
//     };
//   });
// };