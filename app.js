
/**
 * Module dependencies.
 */

var
  express = require('express')
, http    = require('http')
, path    = require('path')
, app     = express()
, m       = require('./lib/middleware')
, routes  = require('./routes')
, db      = require('./lib/db')
, config  = require('./config')
;

app.configure(function(){
  app.set('port', config.httpPort);
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser( config.cookieSecret ));
  app.use(express.cookieSession());
  app.use(m.error());
  app.use(m.dirac());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());

  // Use nginx in prod
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get( '/api/session'
, routes.session.get
);

app.del( '/api/session'
, routes.session.del
);

app.get( '/api/worlds'
, m.pagination()
, m.find( db.worlds )
);

app.post('/api/worlds'
, m.insert( db.worlds )
);

app.get( '/api/worlds/:id'
, m.param( 'id' )
, m.findOne( db.worlds )
);

app.put( '/api/worlds/:id'
, m.param( 'id' )
, m.update( db.worlds )
);

app.patch( '/api/worlds/:id'
, m.param( 'id' )
, m.update( db.worlds )
);

app.del( '/api/worlds/:id'
, m.param( 'id' )
, m.remove( db.worlds )
);

// app.get( '/api/worlds/:world_id/things'
// , m.param('world_id')
// , m.param('id')
// , m.pagination()
// , m.find( db.things )
// );

// app.post('/api/worlds/:world_id/things'
// , m.value('world_id')
// , m.insert( db.things )
// );

// app.get( '/api/worlds/:world_id/things/:id'
// , m.param( 'id' )
// , m.findOne( db.things )
// );

// app.put( '/api/worlds/:world_id/things/:id'
// , m.param( 'id' )
// , m.update( db.things )
// );

// app.del( '/api/worlds/:world_id/things/:id'
// , m.param('world_id')
// , m.param( 'id' )
// , m.remove( db.things )
// );

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
