module.exports = function( grunt ){
  grunt.loadTasks('./tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-named-modules');
  grunt.loadNpmTasks('grunt-express-server');

  var config = {
    pkg: grunt.file.readJSON('package.json')

  , express: {
      options: {}
    , dev: {
        options: {
          script: 'app.js'
        }
      }
    }

  , requireGrouper: {
      components: {
        dirs: [
          './public/things'
        ]
      }
    }

  , less: {
      dev: {
        options: {
          // paths: ["public"]
        }
      , files: {
          "public/css/core.gen.css": "less/core.less"
        , "public/css/title-screen.gen.css": "routes/title-screen/title-screen.less"
        }
      }
    }

  , watch: {
      scripts: {
        // Concat jshint.all
        files: [],
        tasks: ['jshint'],
        options: {
          spawn: false,
        }
      },

      grouper: {
        files: [],
        tasks: ['requireGrouper'],
        options: {
          spawn: false,
        }
      },

      less: {
        files: [
          'routes/**/*.less'
        , 'less/*.less'
        ],
        tasks: ['less'],
        options: {
          spawn: false,
        }
      },

      namedModules: {
        files: ['package.json'],
        tasks: ['namedModules'],
        options: {
          spawn: false,
        }
      },

      express: {
        files: ['*.js', 'lib/*.js, lib/**/*.js', 'routes/*.js', 'routes/**/*.html', 'routes/**/*.js']
      , tasks: ['express:dev']
      , options: { spawn: false }
      }
    }

  , jshint: {
      // define the files to lint
      all: ['*.js', 'lib/*.js', 'routes/*.js', 'public/**/*.js'],
      options: {
        ignores: ['node_modules', 'public/jam/**', 'public/bower_components/**', 'public/js/*.js'],
        laxcomma: true,
        sub: true,
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    }
  };

  config.watch.scripts.files = config.watch.scripts.files.concat(
    config.jshint.all
  );

  config.watch.grouper.files = config.watch.grouper.files.concat(
    config.requireGrouper.components.dirs.map( function( dir ){
      return dir + '/*/*.js';
    })
  );

  grunt.initConfig( config );

  grunt.registerTask( 'default', [
    'jshint'
  , 'namedModules'
  , 'less'
  , 'express:dev'
  , 'watch'
  ]);
};
