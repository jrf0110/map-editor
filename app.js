
/**
 * Module dependencies.
 */

var
  express   = require('express')
, http      = require('http')
, path      = require('path')
, nunjucks  = require('nunjucks')
, app       = express()
, m         = require('middleware')
, routes    = require('./routes')
, db        = require('./lib/db')
, config    = require('config')
, utils     = require('utils')
;

app.configure(function(){
  app.set('port', config.httpPort);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser( config.cookieSecret ));
  app.use(express.cookieSession());
  app.use(m.error());
  app.use(m.dirac());
  app.use(app.router);

  nunjucks.configure( __dirname + '/routes', {
    autoescape: true
  , express: app
  , watch: true
  });
});

app.configure('development', function(){
  app.use(express.errorHandler());

  // Use nginx in prod
  app.use(express.static(path.join(__dirname, 'public')));
});

for ( var key in routes ){
  if ( typeof routes[ key ] === 'function' ){
    routes[ key ]( app );
  }
}

app.get( '/api/session'
, routes.session.get
);

app.post( '/api/session'
, routes.session.create
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
