#!/usr/bin/env node

var db = require('db');

db.sync({ force: true }, function( error ){
  process.exit( ~~error );
});