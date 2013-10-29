var db    = require('db');
var m     = require('middleware');

module.exports = function( app ){
  app.get('/'
  , m.view( 'title-screen/title-screen-view.html' )
  );
};