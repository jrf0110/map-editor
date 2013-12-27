define(function(require){
  var utils       = require('utils');
  var gamepad     = require('gamepad');
  var stage       = require('stage');
  var boundary    = require('boundary');
  var viewport    = require('viewport');
  var battle      = require('battle');
  var hero        = require('hero');
  var StageView   = require('lib/stage-view');
  var Player      = require('lib/player');

  var app = {
    init: function(){
      app.stageView = new StageView();
      app.stageView.render();

      boundary.setStage( stage );

      battle.init({
        players: [
          new Player({
            characters: [ hero ].concat( hero.get('party') )
          })
        ]

      , stage: stage
      });

      utils.domready( function(){
        document.body.appendChild( app.stageView.el );
        battle.start();
      });
    }
  };

  return app;
});