define(function(require){
  var utils       = require('utils');
  var gamepad     = require('gamepad');
  var stage       = require('stage');
  var boundary    = require('boundary');
  var viewport    = require('viewport');
  var StageView   = require('lib/stage-view');

  var app = {
    init: function(){
      app.stageView = new StageView();
      app.stageView.render();

      boundary.setStage( stage );

      utils.domready( function(){
        document.body.appendChild( app.stageView.el );
        
        var character = stage.attributes.things.at(0);
        viewport.follow( character );
        gamepad.takeControl( character );
      });
    }

  , router: {
      routes: {
        
      }
    }
  };

  return app;
});