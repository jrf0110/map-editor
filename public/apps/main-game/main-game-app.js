define(function(require){
  var utils       = require('utils');
  var gamepad     = require('gamepad');

  var app = {
    init: function(){
      utils.domready( function(){
        utils.dom('p').say()
      });
    }

  , router: {
      routes: {
        
      }
    }
  };

  return app;
});