requirejs.config({
  packages: [
    { name: 'utils',    location: 'lib',      main: 'utils.js' }
  , { name: 'gamepad',  location: 'lib',      main: 'gamepad.js' }
  , { name: 'thing',    location: 'things',   main: 'base.js' }
  , { name: 'things',   location: 'things',   main: 'index.js' }
  , { name: 'world',    location: 'models',   main: 'world.js' }
  ]

, paths: {
    config: './config'
  , env:    './env'
  }
});