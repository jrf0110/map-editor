/**
 * Interface to loading fixtures
 */

var glob  = require('glob');
var fs    = require('fs');
var db    = require('db');
var utils = require('utils');

var fixture = module.exports = {};

var options = {
  fixtureDir: __dirname + '/../data/*.js'
};

fixture.loadData = function( table, data, callback ){
  db[ table ].insert( data, callback );
};

fixture.load = function( callback ){
  var fns = glob.sync( options.fixtureDir ).map( function( path ){
    return function( done ){
      var table = path.substring( path.lastIndexOf('/') + 1 ).slice( 0, -3 );
      fixture.loadData( table, require( path ), done );
    };
  });

  utils.async.series( fns, callback );
};