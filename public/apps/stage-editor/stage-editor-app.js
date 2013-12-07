define(function(require){
  var utils       = require('utils');
  var gamepad     = require('gamepad');
  var stage       = require('stage');
  var viewport    = require('viewport');
  var StageView   = require('lib/stage-view');

  var app = {
    init: function(){
      app.stageView = new StageView();
      app.stageView.render();

      utils.domready( function(){
        document.body.appendChild( app.stageView.el );
      });
    }
  };

  return app;
});