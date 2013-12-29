define(function(require){
  var utils       = require('utils');
  var gamepad     = require('gamepad');
  var stage       = require('stage');
  var boundary    = require('boundary');
  var viewport    = require('viewport');
  var battle      = require('battle');
  var hero        = require('hero');
  var Player      = require('lib/player');
  var Controls    = require('views/on-screen-controls');

  var app = {
    init: function(){
      boundary.setStage( stage );

      battle.init({
        players: [
          new Player({
            characters: [ hero ].concat( hero.get('party') )
          })
        ]

      , stage: stage
      });

      stage.render();

      app.onScreenControls = new Controls().render();

      utils.domready( function(){
        utils.touchClick.attach( document.body );

        document.body.appendChild( stage.el );
        document.body.appendChild( app.onScreenControls.el );

        battle.start();
      });
    }
  };

  return app;
});