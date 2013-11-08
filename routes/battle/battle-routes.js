var db    = require('db');
var m     = require('middleware');

module.exports = function( app ){
  app.get( '/api/battles'
  , m.pagination()
  , m.find( db.battles )
  );

  app.post('/api/battles'
  , m.insert( db.battles )
  );

  app.get( '/api/battles/:id'
  , m.param( 'id' )
  , m.findOne( db.battles )
  );

  app.put( '/api/battles/:id'
  , m.param( 'id' )
  , m.update( db.battles )
  );

  app.patch('/api/battles/:id'
  , m.param( 'id' )
  , m.update( db.battles )
  );

  app.del( '/api/battles/:id'
  , m.param( 'id' )
  , m.remove( db.battles )
  );

  app.get('/battles/:id'
  , m.view( 'battle/battle-view.html' )
  );
};