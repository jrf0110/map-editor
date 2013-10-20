define(function(require){
  var world       = require('world');
  var WorldView   = require('lib/world');
  var utils       = require('utils');
  var ThingModel  = require('models/thing');
  var boundary    = require('boundary');
  var gamepad     = require('gamepad');
  var viewport    = require('viewport');

  var app = {
    init: function( worldName ){
      app.world = world;

      app.worldView = new WorldView();

      world.set( 'id', 1 ).fetch({
        success: function(){
          var character = world.attributes.things.at(0);
          viewport.follow( character );
          gamepad.takeControl( character );
        }
      });

      boundary.setWorld( app.world );

      utils.domready( function(){
        document.body.appendChild( app.worldView.$el[0] );
      });
    }
  };

  return app;
});