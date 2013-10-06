/**
 * Require Grouper
 */

var requirejs = require('requirejs');

var config = {
  name: 'requireGrouper'
, description: [
    'Groups directories of requirejs modules into a single module'
  ].join('')
};

var fs    = require('fs');
var path  = require('path');

var tmpl = [
  'define( function( require ){'
, '  return {'
, '    {json}'
, '  };'
, '});'
].join('\n');

var itemTmpl = "{key}: require('./{path}')";

// Make a global leak noop to quell requirejs module loading errors
define = function( fn ){
  // Pass in a fake require fn
  fn( function(){} );
};


module.exports = function( grunt ){
  var logStats = function( stats ){
    for ( var key in stats ){
      grunt.log.writeln( stats[ key ].title + ':', stats[ key ].value );
    }
  };

  grunt.registerMultiTask( config.name, config.description, function(){
    var stats = {
      numComplete: { value: 0, title: 'Groups Made' }
    };

    this.data.dirs.forEach( function( dir ){

      // Holds the final exports->path structure to be wrriten
      var out = {};

      // Filter out non-directories
      fs.readdirSync( dir ).filter( function( file ){
        return fs.statSync( path.resolve( dir, file ) ).isDirectory();
      }).forEach( function( dirPath ){
        var index = fs.readFileSync( path.resolve( dir, dirPath, 'index.js' ) ).toString();

        var exports = index.match(/\s*exports:\s*\'\w*\'/);
        
        // Did not specify exports, do not write
        if ( exports.length === 0 ) return;

        exports = exports[ 0 ].replace(/\s*exports:\s*/g, '').replace(/\'/g, '');

        // The key of the output is the exports value on the module
        out[ exports ] = dirPath + '/index';
      });

      // Write/render
      fs.writeFileSync(
        path.resolve( dir, 'index.js')
      , tmpl.replace( '{json}', Object.keys( out ).map( function( key ){
          return itemTmpl.replace( '{key}', key ).replace( '{path}', out[ key ] );
        }).join('\n  , '))
      );

      stats.numComplete.value++;
    });

    logStats( stats );
  });
};