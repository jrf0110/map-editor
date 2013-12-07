define(function(require){
  var utils       = require('utils');
  var gamepad     = require('gamepad');
  var stage       = require('stage');
  var viewport    = require('viewport');
  var StageView   = require('lib/stage-view');
  var EditorView  = require('lib/editor');

  var app = {
    init: function(){
      app.stageView = new StageView();
      app.stageView.render();
      app.editorView = new EditorView({
        worldView: app.stageView
      });

      utils.domready( function(){
        document.body.appendChild( app.editorView.el );
        document.body.appendChild( app.stageView.el );
      });
    }
  };

  return app;
});