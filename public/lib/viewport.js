/**
 * Viewport
 */

define(function(require){
  var utils = require('utils');
  var world = require('world');

  var $window = utils.dom( window );

  var $htmlBody;

  $(function(){
    $htmlBody = utils.dom('html, body');
  });

  var viewport = utils.extend({
    options: {
      // The minimum amount of screenspace to show to keep character in view
      buffer: world.get('tileSize')
    }

  , follow: function( character ){
      if ( this.following ) this.unfollow();

      this.following = character;
      this.listenTo( this.following, 'change:x change:y', this.onFollowingMove );

      this.centerOnCharacter();

      return this;
    }

  , unfollow: function(){
      this.stopListening( this.following );
      return this;
    }

  , moveIfNecessary: function(){
      var win = this.size();
      var port = this.getViewportBox();
      var pos = this.getCharacterPixelPosition( this.following );
      var x, y;

      if      ( pos.x < port.left  ) x = pos.x - win.width + this.options.buffer;
      else if ( pos.x > port.right ) x = pos.x - this.options.buffer;
      else                           x = port.left;

      if      ( pos.y < port.top    ) y = pos.y - win.height + this.options.buffer;
      else if ( pos.y > port.bottom ) y = pos.y - this.options.buffer;
      else                            y = port.top;

      if ( x === port.left && y === port.top ) return this;

      return this.scrollTo( x, y );
    }

  , centerOnCharacter: function( character ){
      if ( !character ) character = this.following;

      var win = this.size();
      var pos = this.getCharacterPixelPosition( character );

      pos.x -= parseInt( win.width / 2, 10 );
      pos.y -= parseInt( win.height / 2, 10 );

      this.scrollTo( pos.x, pos.y );

      return this;
    }

  , getCharacterPixelPosition: function( character ){
      if ( !character ) character = this.following;

      return {
        x: character.get('x') * world.get('tileSize')
      , y: character.get('y') * world.get('tileSize')
      };
    }

  , getViewportBox: function(){
      var port = this.size();

      return {
        left:   window.scrollX
      , top:    window.scrollY
      , right:  window.scrollX + port.width
      , bottom: window.scrollY + port.height
      };
    }

  , size: function(){
      return {
        width:  $window.width()
      , height: $window.height()
      };
    }

  , scrollTo: function( x, y ){
      $htmlBody.stop( false, true );
      $htmlBody.animate({
        scrollTop:  y
      , scrollLeft: x
      });

      return this;
    }

  , onFollowingMove: function(){
      this.moveIfNecessary();
    }
  }, utils.Events);

  world.on( 'change:tileSize', function( world, size ){
    viewport.options.buffer = size;
  });

  return Object.create( viewport );
});