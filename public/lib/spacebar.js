define(function(require){
  var domready  = require('domReady');
  var $         = require('jquery');

  var isPressed = false;

  domready( function(){
    $( document ).keydown( function( e ){
      if ( isPressed ) return;
      isPressed = ( +(e.keyCode || e.which) == 32 );
      $(document.body).css('cursor', '-webkit-grab');
    });

    $( document ).keyup( function( e ){
      isPressed = false;
      $(document.body).css('cursor', '');
    });
  });

  return {
    isPressed: function(){
      return isPressed;
    }
  };
});