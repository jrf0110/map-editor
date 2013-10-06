define(function(require){
  var $ = require('jquery');

  var scroll = {};
  var isScrolling = false;
  var scrollTimeout;
  var resetScroll = function(){ isScrolling = false; };

  scroll.isScrolling = function(){
    return isScrolling;
  };

  $(window).scroll( function(){
    if ( isScrolling ) return;
    isScrolling = true;
    clearTimeout( scrollTimeout );
    setTimeout( resetScroll, 600 );
  });

  return scroll;
});