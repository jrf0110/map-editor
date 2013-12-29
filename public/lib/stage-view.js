define(function(require){
  var utils       = require('utils');
  var scroll      = require('./scroll');
  var spacebar    = require('./spacebar');
  var $Things     = require('things');
  var config      = require('config');
  var battle      = require('battle');

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

      // stage.on( 'change:tiles',   this.renderTiles, this );
      // stage.on( 'change:things',  this.renderThings, this );

      return this;
    }

  , setEditor: function( editor ){
      this.editor = editor;
      return this;
    }

  , enterEditMode: function(){
      this.editMode = true;
      this.$el.addClass('edit-mode');
      this.editor.$el.removeClass('hide');
      return this;
    }

  , exitEditMode: function(){
      this.editMode = false;
      this.$el.removeClass('.edit-mode');
      this.editor.$el.addClass('hide');
      return this;
    }

  , render: function(){
      this.renderTiles();
      this.renderThings();
      this.renderCharacters();

      return this;
    }

  , renderTiles: function(){
      var size = config.tileSize * this.model.get('size');

      if ( this.editMode ){
        this.editor.render();
      }

      this.$el.html( this.template );
      this.$tileHolder = this.$el.find( '.tiles' );

      this.$tileHolder.css( 'width', size + 'px' );
      this.$tileHolder.css( 'height', size + 'px' );

      var tmpl = '<div class="tile {{class}}" data-tile="{{tile}}" data-x="{{x}}" data-y="{{y}}"></div>', out = "";

      for ( var y = 0, l = this.model.get('tiles').length; y < l; ++y ){
        for ( var x = 0, ll = this.model.get('tiles')[ y ].length; x < ll; ++x ){
          out += tmpl.replace( '{{class}}', this.model.get('tiles')[ y ][ x ] )
                     .replace( '{{tile}}', this.model.get('tiles')[ y ][ x ] )
                     .replace( '{{x}}', x )
                     .replace( '{{y}}', y );
        }
      }

      this.$tileHolder.html( out );
    }

  , renderThings: function(){
      var this_ = this;
      var $els = utils.dom();

      this.model.get('things').each( function( thing ){
        if ( !(thing.get('type') in $Things) ) return;

        $els = $els.add(
          new $Things[ thing.get('type') ].Main({
            model:    thing
          , tileSize: this_.model.get('tileSize')
          }).render().$el
        );
      });

      this.$el.find('.thing').remove();

      this.$el.prepend($els);

      return this;
    }

  , renderCharacters: function(){
      var this_ = this;
      var $els = utils.dom();

      battle.players.forEach( function( player ){
        player.characters.forEach( function( c ){
          $els = $els.add(
            new $Things.Character.Main({ model: c }).render().$el
          );
        });
      });

      this.$el.find('.character').remove();
      this.$el.prepend( $els );

      return this; 
    }

  , highlightTurnBounds: function(){
      var coords, stageWidth = this.model.get('size');
      var $tile, $tiles = this.$tileHolder.find('.tile');

      for ( var key in this.model.turnBounds ){
        coords = key.split('x');
        $tile = $tiles.eq( +coords[0] + ( +coords[1] * stageWidth ) );
        $tile.addClass('highlight');
      }

      return this;
    }

  , clearTurnBounds: function(){
      this.$tileHolder.find('.highlight').removeClass('highlight');
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
        this.model.get('tiles')[ $el.data('y') ][ $el.data('x') ] = this.editor.current;
      }
    }
  });

  return StageView;
});