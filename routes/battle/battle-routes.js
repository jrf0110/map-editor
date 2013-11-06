var db    = require('db');
var m     = require('middleware');

module.exports = function( app ){
  app.get('/battles/:id'
  , m.view( 'battle/battle-view.html' )
  );
};