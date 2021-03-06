# Tile Map Maker

I kind of want to make a video game. I've never done it before. So I started out creating this little map-maker. I then went on to build out general thinginess, "character" abstractions, character movement, character camera following. The basic system for representing tiles, objects, and characters is in place. I need to give attributes to all of these things to give them special properties (like, land-effect on tiles - does this affect character speed or attack range? Is this tile water? etc.), but that can be added in later.

[http://map-editor.j0.hn](http://map-editor.j0.hn) 
[http://map-editor.j0.hn/game-test.html](http://map-editor.j0.hn/game-test.html) WASD to move, click to change character

## Setup

Postgres 9.2+ is required! If you're on OS/X, [http://postgresapp.com](http://postgresapp.com), if you're on linux, aptitude works. Windows, you know, I really don't know.

Clone the repo, and install the dependencies:

```
npm install
```

You need the grunt-cli installed globally:

```
npm install -g grunt-cli
```

Create the database, load fixtures:

```
$ psql -h localhost
postgres=# create database map_editor
postgres=# \q
$ ./bin/force-sync.js
$ ./bin/load-fixtures.js
```

I'm still in hack mode and there are still tons of remnants from when I first just wanted to create a tile map editor (hence the database name). Obviously, it will be refactored.

Start the server on port 3300:

```
grunt
```

File serving in development mode is done through the static file server express middleware. In prod, it is disabled. I have my nginx vhost configuration file checked in for when it goes to my VPS.

## The rundown

We need to allow for multiple users. Users can create multiple heroes. Heroes are the main characters of a campaign. Campaigns have levels that are derived from stages. Stages define the tiles, things, layers, and scripts of a level. Heroes will have a party of supporting characters that they accumulate over the course of the game. Campaigns are composed of a number of ordered stages (that hopefully we can generate procedurally). We'll have to track the progress of a hero through a campaign.
