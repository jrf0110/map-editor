define(function(require){
  var utils       = require('utils');
  var gamepad     = require('gamepad');
  var stage       = require('stage');
  var boundary    = require('boundary');
  var viewport    = require('viewport');
  var battle      = require('battle');
  var hero        = require('hero');
  var StageView   = require('lib/stage-view');

  var app = {
    init: function(){
      app.stageView = new StageView();
      app.stageView.render();

      boundary.setStage( stage );

      battle.init({
        players: [
          new Player({
            characters: [ hero ].concat( hero.party_members )
          })
        ]
      });

      utils.domready( function(){
        document.body.appendChild( app.stageView.el );
        battle.start();
      });
    }

  , router: {
      routes: {
        
      }
    }
  };

  return app;
});