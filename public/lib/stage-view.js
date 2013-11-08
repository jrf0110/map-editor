define(function(require){
  var utils       = require('utils');
  var scroll      = require('./scroll');
  var spacebar    = require('./spacebar');
  // var Editor      = require('./editor');
  var $Things     = require('things');
  var stage       = require('stage');
  var config      = require('config');

  var StageView = utils.View.extend({
    className: 'stage edit-mode'

  , events: {
      'click .tile':        'onTileClick'
    }

  , template: [
      '<div class="tiles"></div>'
    ].join('\n')

  , initialize: function( options ){
      // this.editor = new Editor({ stageView: this });
      // this.editor.$el.addClass('hide');

      stage.on( 'change:tiles',   this.renderTiles, this );
      stage.on( 'change:things',  this.renderThings, this );

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
      var size = config.tileSize * stage.get('size');

      if ( this.editMode ){
        this.editor.render();
      }

      this.$el.html( this.template );
      this.$tileHolder = this.$el.find( '.tiles' );

      this.$tileHolder.css( 'width', size + 'px' );
      this.$tileHolder.css( 'height', size + 'px' );

      var tmpl = '<div class="tile {{class}}" data-tile="{{tile}}" data-x="{{x}}" data-y="{{y}}"></div>', out = "";

      for ( var y = 0, l = stage.get('tiles').length; y < l; ++y ){
        for ( var x = 0, ll = stage.get('tiles')[ y ].length; x < ll; ++x ){
          out += tmpl.replace( '{{class}}', stage.get('tiles')[ y ][ x ] )
                     .replace( '{{tile}}', stage.get('tiles')[ y ][ x ] )
                     .replace( '{{x}}', x )
                     .replace( '{{y}}', y );
        }
      }

      this.$tileHolder.html( out );
    }

  , renderThings: function(){
      var this_ = this;
      var $els = utils.dom();

      stage.get('things').each( function( thing ){
        if ( !(thing.get('type') in $Things) ) return;

        $els = $els.add(
          new $Things[ thing.get('type') ].Main({
            model:    thing
          , tileSize: stage.get('tileSize')
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

  , onTileClick: function( e ){
      if ( !this.editMode ) return;

      if ( this.editor.current ){
        this.$enteredElement = null;
        var $el = utils.dom( e.target );
        $el[0].className = "tile";
        $el.addClass( this.editor.current );
        $el.data( 'tile', this.editor.current );
        stage.get('tiles')[ $el.data('y') ][ $el.data('x') ] = this.editor.current;
      }
    }
  });

  return StageView;
});