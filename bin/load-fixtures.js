#!/usr/bin/env node

var utils = require('../lib/utils');
var fixture = require('../lib/fixture');

var tables = process.argv.slice(2);

if ( tables.length > 0 ){
  var fns = tables.map( function( table ){
    return function( done ){
      fixture.loadData( table, require('../data/' + table + '.js'), done );
    };
  });

  utils.async.series( fns, function( error ){
    if ( error ){
      console.error( error );
      return process.exit(1);
    }

    process.exit(0);
  });
} else {
  fixture.load( function( error ){
    if ( error ){
      console.error( error );
      return process.exit(1);
    }

    process.exit(0);
  });
}
