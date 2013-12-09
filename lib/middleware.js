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

/**
 * Finds the hero specified in the url parameters
 * on the req.user object
 *
 * Options:
 *   + param - the url parameter to look for
 * 
 * @param  {Object} options options
 * @return {Function}       The middleware
 */
m.findUsersHero = function( options ){
  options = options || {};

  options = Object.merge({
    param: 'id'
  }, options );

  return function( req, res, next ){
    res.locals.hero = req.user.heroes.find( function( hero ){
      return hero.id === +req.param( options.param );
    });

    if ( !res.locals.hero ) return res.send( 404 );

    next();
  };
};