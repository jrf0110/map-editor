
/**
 * Module dependencies.
 */

var
  express   = require('express')
, http      = require('http')
, path      = require('path')
, nunjucks  = require('nunjucks')
, app       = express()
, nEnv      = new nunjucks.Environment()
, m         = require('middleware')
, routes    = require('./routes')
, db        = require('./lib/db')
, nFilters  = require('./lib/nunjuck-filters')
, config    = require('config')
, utils     = require('utils')
;

var nEnv = nunjucks.configure( __dirname + '/routes', {
  autoescape: true
, express: app
});

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

  // Just make everyone the same user right now
  app.use( function( req, res, next ){
    db.users.findOne( 1, function( error, user ){
      if ( error ) res.status(500).send();

      req.user = user;
      res.locals.user = user;

      next();
    });
  });

  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());

  // Use nginx in prod
  app.use(express.static(path.join(__dirname, 'public')));
});

// Run custom router function groups
for ( var key in routes ){
  if ( typeof routes[ key ] === 'function' ){
    routes[ key ]( app );
  }
}

// Register nunjucks filters
for ( var key in nFilters ){
  nEnv.addFilter( key, nFilters[ key ] );
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

app.get( '/api/stages'
, m.pagination()
, m.find( db.stages )
);

app.post('/api/stages'
, m.insert( db.stages )
);

app.get( '/api/stages/:id'
, m.param( 'id' )
, m.findOne( db.stages )
);

app.put( '/api/stages/:id'
, m.param( 'id' )
, m.update( db.stages )
);

app.patch( '/api/stages/:id'
, m.param( 'id' )
, m.update( db.stages )
);

app.del( '/api/stages/:id'
, m.param( 'id' )
, m.remove( db.stages )
);

app.get( '/api/users'
, m.pagination()
, m.find( db.users )
);

app.post('/api/users'
, m.insert( db.users )
);

app.get( '/api/users/:id'
, m.param( 'id' )
, m.findOne( db.users )
);

app.put( '/api/users/:id'
, m.param( 'id' )
, m.update( db.users )
);

app.patch( '/api/users/:id'
, m.param( 'id' )
, m.update( db.users )
);

app.del( '/api/users/:id'
, m.param( 'id' )
, m.remove( db.users )
);

app.get( '/api/users/:user_id/heroes'
, m.pagination()
, m.param('user_id')
, m.find( db.heroes )
);

app.post('/api/users/:user_id/heroes'
, m.param('user_id')
, m.insert( db.heroes )
);

app.get( '/api/users/:user_id/heroes/:id'
, m.param( 'id' )
, m.findOne( db.heroes )
);

app.put( '/api/users/:user_id/heroes/:id'
, m.param( 'id' )
, m.update( db.heroes )
);

app.patch( '/api/users/:user_id/heroes/:id'
, m.param( 'id' )
, m.update( db.heroes )
);

app.del( '/api/users/:user_id/heroes/:id'
, m.param( 'id' )
, m.remove( db.heroes )
);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
