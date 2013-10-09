define(function(require){
  var world     = require('world');
  var WorldView = require('lib/world');
  var utils     = require('utils');
  var ThingModel = require('models/thing');

  var app = {
    init: function( worldName ){
      app.world = world;

      app.worldView = new WorldView();

      world.set( 'id', 1 ).fetch();

      utils.domready( function(){
        document.body.appendChild( app.worldView.$el[0] );
      });
    }
  };

  return app;
});