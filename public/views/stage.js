define(function(require){
  var utils       = require('utils');
  var scroll      = require('./scroll');
  var spacebar    = require('./spacebar');
  var Editor      = require('./editor');
  var $Things     = require('things');
  var world       = require('world');

  var Stage = utils.View.extend({
    className: 'stage edit-mode'

  , events: {
      /*'mouseenter .tile':   'onTileMouseEnter'
    , */'click .tile':        'onTileClick'
    }

  , template: [
      '<div class="tiles"></div>'
    ].join('\n')

  , initialize: function( options ){
      this.editor = new Editor({ worldView: this });
      this.editor.$el.addClass('hide');

      world.on( 'change:tiles',   this.renderTiles, this );
      world.on( 'change:things',  this.renderThings, this );

      return this;
    }

  , enterEditMode: function(){
      this.editMode = true;
      this.$el.addClass( 'edit-mode' );
      this.editor.$el.removeClass( 'hide' );
      return this;
    }

  , exitEditMode: function(){
      this.editMode = false;
      this.$el.removeClass( '.edit-mode' );
      this.editor.$el.addClass( 'hide' );
      return this;
    }

  , render: function(){
      this.renderTiles();
      this.renderThings();

      return this;
    }

  , renderTiles: function(){
      var size = world.get('tileSize') * world.get('size');

      this.editor.render();

      this.$el.html( this.template );
      this.$tileHolder = this.$el.find( '.tiles' );

      this.$tileHolder.css( 'width', size + 'px' );
      this.$tileHolder.css( 'height', size + 'px' );

      var tmpl = '<div class="tile {{class}}" data-tile="{{tile}}" data-x="{{x}}" data-y="{{y}}"></div>', out = "";

      for ( var y = 0, l = world.get('tiles').length; y < l; ++y ){
        for ( var x = 0, ll = world.get('tiles')[ y ].length; x < ll; ++x ){
          out += tmpl.replace( '{{class}}', world.get('tiles')[ y ][ x ] )
                     .replace( '{{tile}}', world.get('tiles')[ y ][ x ] )
                     .replace( '{{x}}', x )
                     .replace( '{{y}}', y );
        }
      }

      this.$tileHolder.html( out );
    }

  , renderThings: function(){
      var this_ = this;
      var $els = utils.dom();

      world.get('things').each( function( thing ){
        if ( !(thing.get('type') in $Things) ) return;

        $els = $els.add(
          new $Things[ thing.get('type') ].Main({
            model:    thing
          , tileSize: world.get('tileSize')
          }).render().$el
        );
      });

      this.$el.find('.thing').remove();

      this.$el.prepend($els);

      return this;
    }

  , onTilesMouseDown: function( e ){
      if ( !spacebar.isPressed() ) return;

      utils.dom(document.body).css('cursor', '-webkit-grabbing');
      hand.grab( this.$tileHolder, e );
    }

  , onTileMouseEnter: function( e ){
      if ( !this.editMode ) return;

      if ( this.$enteredElement ){
        this.$enteredElement[0].className = this.enteredElementOriginalClass;
      }

      if ( this.editor.current ){
        this.$enteredElement = utils.dom( e.target );
        this.enteredElementOriginalClass = this.$enteredElement[0].className;
        this.$enteredElement[0].className = "tile";
        this.$enteredElement.addClass( this.editor.current );
      }
    }

  , onTileClick: function( e ){
      if ( !this.editMode ) return;

      if ( this.editor.current ){
        this.$enteredElement = null;
        var $el = utils.dom( e.target );
        $el[0].className = "tile";
        $el.addClass( this.editor.current );
        $el.data( 'tile', this.editor.current );
        world.get('tiles')[ $el.data('y') ][ $el.data('x') ] = this.editor.current;
      }
    }
  });

  return Stage;
});