requirejs.config({
  baseUrl: '/'

, packages: [
    { name: 'utils',        location: 'lib',                main: 'utils.js' }
  , { name: 'gamepad',      location: 'lib',                main: 'gamepad.js' }
  , { name: 'boundary',     location: 'lib',                main: 'boundary-checker.js' }
  , { name: 'viewport',     location: 'lib',                main: 'viewport.js' }
  , { name: 'thing',        location: 'things',             main: 'base.js' }
  , { name: 'things',       location: 'things',             main: 'index.js' }
  , { name: 'title-screen', location: 'apps/title-screen',  main: 'title-screen-app.js' }
  , { name: 'main-game',    location: 'apps/main-game',     main: 'main-game-app.js' }
  , { name: 'main-game',    location: 'apps/main-game',     main: 'main-game-app.js' }

  , { name: 'mousetrap',    location: 'bower_components/mousetrap', main: 'mousetrap.js'}
  ]

, paths: {
    config: './config'
  , env:    './env'
  }
});