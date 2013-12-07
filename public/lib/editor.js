define(function(require){
  var utils     = require('utils');
  var stage     = require('stage');
  var itemTmpl  = '<li class="tile-choice tile {{pack}} {{tile}}" data-pack="{{pack}}" data-tile="{{tile}}"></li>';

  return utils.View.extend({
    className: 'editor'

  , tiles: [
      { pack: 'ground', tile: 'ground-grass-1' }
    , { pack: 'ground', tile: 'ground-dirt-patch-top-left' }
    , { pack: 'ground', tile: 'ground-dirt-patch-top' }
    , { pack: 'ground', tile: 'ground-dirt-patch-top-right' }
    , { pack: 'ground', tile: 'ground-dirt-patch-middle-left' }
    , { pack: 'ground', tile: 'ground-dirt-patch-middle' }
    , { pack: 'ground', tile: 'ground-dirt-patch-middle-right' }
    , { pack: 'ground', tile: 'ground-dirt-patch-bottom-left' }
    , { pack: 'ground', tile: 'ground-dirt-patch-bottom' }
    , { pack: 'ground', tile: 'ground-dirt-patch-bottom-right' }
    , { pack: 'ground', tile: 'ground-dirt-patch-corner-top-left' }
    , { pack: 'ground', tile: 'ground-dirt-patch-corner-top-right' }
    , { pack: 'ground', tile: 'ground-dirt-patch-corner-bottom-left' }
    , { pack: 'ground', tile: 'ground-dirt-patch-corner-bottom-right' }
    ]

  , itemTmpl: function( obj ){
      var _tmpl = itemTmpl;
      for ( var key in obj ){
        _tmpl = _tmpl.replace( new RegExp( '{{' + key + '}}', 'g' ), obj[ key ]);
      }
      return _tmpl;
    }

  , events: {
      'click .tile-choice': 'onTileChoiceClick'
    , 'click .btn-save':    'onBtnSaveClick'
    }

  , initialize: function(){
      return this;
    }

  , render: function(){
      var frag = "";
      for ( var i = 0, l = this.tiles.length; i < l; ++i ){
        frag += this.itemTmpl( this.tiles[ i ] );
      }

      this.$el.html( '<a href="#" class="btn-save">Save</a><div class="tile-choices">' + frag + '</div>' );

      return this;
    }

  , save: function(){
      this.options.worldView.$el.find('.tile').each( function(){
        var $el = utils.dom( this );
        var x = $el.data('x');
        var y = $el.data('y');

        if ( !stage.get('tiles')[ y ] ) stage.get('tiles')[ y ] = [];

        stage.get('tiles')[ y ][ x ] = $el.data('tile');
      });

      stage.save();
    }

  , onTileChoiceClick: function( e ){
      this.$el.find('.tile-choice').removeClass('selected');
      var tile = $(e.target).addClass('selected').data( 'tile' );
      var pack = $(e.target).addClass('selected').data( 'pack' );
      this.current = pack + ' ' + tile;
      this.options.worldView.$el.attr('data-pack', pack);
      this.options.worldView.$el.attr('data-tile', tile);
    }

  , onBtnSaveClick: function( e ){
      e.preventDefault();
      this.save();
    }
  });
});