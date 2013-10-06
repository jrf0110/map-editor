define(function(require){
  var $         = require('jquery');
  var _         = require('underscore');
  var Backbone  = require('backbone');
  var domready  = require('domReady');
  var FastClick = require('fastclick');


  var utils = _.extend( {}, _ );

  utils.domready = domready;

  utils.dom = $;

  utils.FastClick = FastClick;

  utils.Backbone    = Backbone;
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

  return utils;
});