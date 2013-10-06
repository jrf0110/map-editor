define(function(require){
  var utils     = require('utils');
  var world     = require('world');
  var itemTmpl  = '<li class="tile-choice tile {{type}}" data-tile="{{type}}"></li>';

  return utils.View.extend({
    className: 'editor'

  , tiles: [
      'ground ground-grass-1'
    , 'ground ground-dirt-patch-top-left'
    , 'ground ground-dirt-patch-top'
    , 'ground ground-dirt-patch-top-right'
    , 'ground ground-dirt-patch-middle-left'
    , 'ground ground-dirt-patch-middle'
    , 'ground ground-dirt-patch-middle-right'
    , 'ground ground-dirt-patch-bottom-left'
    , 'ground ground-dirt-patch-bottom'
    , 'ground ground-dirt-patch-bottom-right'
    , 'ground ground-dirt-patch-corner-top-left'
    , 'ground ground-dirt-patch-corner-top-right'
    , 'ground ground-dirt-patch-corner-bottom-left'
    , 'ground ground-dirt-patch-corner-bottom-right'
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
        frag += this.itemTmpl({ type: this.tiles[ i ] });
      }

      this.$el.html( '<div class="tile-choices">' + frag + '</div><button class="btn-save">Save</button>' );

      return this;
    }

  , save: function(){
      this.options.worldView.$el.find('.tile').each( function(){
        var $el = utils.dom( this );
        var x = $el.data('x');
        var y = $el.data('y');

        if ( !world.get('tiles')[ y ] ) world.get('tiles')[ y ] = [];

        world.get('tiles')[ y ][ x ] = $el.data('tile');
      });

      world.save();
    }

  , onTileChoiceClick: function( e ){
      this.$el.find('.tile-choice').removeClass('selected');
      var tile = $(e.target).addClass('selected').data( 'tile' );
      this.current = tile;
    }

  , onBtnSaveClick: function( e ){
      this.save();
    }
  });
});