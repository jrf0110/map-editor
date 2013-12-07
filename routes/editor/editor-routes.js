var db    = require('db');
var m     = require('middleware');

module.exports = function( app ){
  app.get('/stages/:id/edit'
  , m.param('id')
  , m.view( 'editor/stage-editor.html', db.stages, {
      method: 'findOne'
    })
  );
};