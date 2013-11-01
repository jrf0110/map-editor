define(function(require){
  var $           = require('jquery');
  var _           = require('underscore');
  var Backbone    = require('backbone');
  var domready    = require('domReady');
  var key         = require('keymaster');
  var handlebars  = require('handlebars');

  var utils = _.extend( {}, _ );

  utils.template = handlebars.compile;

  utils.domready = domready;

  utils.dom = $;

  utils.key = key;

  utils.Backbone    = Backbone;
  utils.Events      = Backbone.Events;
  utils.View        = Backbone.View;
  utils.Collection  = Backbone.Collection;
  utils.Router      = Backbone.Router;
  utils.History     = Backbone.History;
  utils.Model       = Backbone.Model.extend({
    setTransforms: {}

  , set: function( key, value ){
      if ( typeof key === 'object' ){
        for ( var k in key ) this.set( k, key[ k ] );
        return this;
      }

      if ( key in this.setTransforms ){
        value = this.setTransforms[ key ].call( this, value );
      }

      return Backbone.Model.prototype.set.call( this, key, value );
    }
  });

  Backbone.ajax = function( options ){
    var success = options.success;
    var error = options.error;

    $.ajax( _.extend( {}, options, {
      success: function( result ){
        if ( typeof result == 'string' ) result = JSON.parse( result );
        result = result || {};

        if ( result.error ) error( result.error );

        success( result.data );
      }
    }));
  };

  $.fn.say = function( options ){
    var defaults = {
      delay: 50
    };

    options = $.extend( {}, defaults, options );

    // Prep each character
    this.each( function(){
      var $el = $(this);

      $el.html(
        $el.text().split('').map( function( c ){
          return '<span class="text-character hidden">' + c + '</span>';
        }).join('')
      );
    });

    this.css('visibility', 'visible');

    var $chars = this.find('.text-character.hidden');
    var curr = -1;
    var showChar = function(){
      if ( curr++ === $chars.length ) return;

      $chars.eq( curr ).removeClass('hidden').css('visibility', 'visible');
      setTimeout( showChar, options.delay );
    };
    showChar();
  };


  return utils;
});