process.env.DEBUG = 'swagger:middleware';

var express = require('express');
var middleware = require('swagger-express-middleware');
var path = require('path');
var app = express();
var MemoryDataStore = middleware.MemoryDataStore;
var    Resource        = middleware.Resource;

middleware(path.join(__dirname, 'api/swagger/swagger.yaml'), app, function(err, middleware) {
  // Add all the Swagger Express Middleware, or just the ones you need.
  // NOTE: Some of these accept optional options (omitted here for brevity)

  var myDB = new MemoryDataStore();
  myDB.save(
    new Resource('/pets/Lassie', {name: 'Lassie', type: 'dog', tags: ['brown', 'white']}),
    new Resource('/pets/Clifford', {name: 'Clifford', type: 'dog', tags: ['red', 'big']}),
    new Resource('/pets/Garfield', {name: 'Garfield', type: 'cat', tags: ['orange']}),
    new Resource('/pets/Snoopy', {name: 'Snoopy', type: 'dog', tags: ['black', 'white']}),
    new Resource('/pets/Hello%20Kitty', {name: 'Hello Kitty', type: 'cat', tags: ['white']})
  );

  app.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.files(),
    middleware.parseRequest(),
    middleware.validateRequest()
  );

  app.use(middleware.mock(myDB));

  if(err) console.log('Um erro!',err);

  app.listen(8000, function() {
    console.log('The Swagger Pet Store is now running at http://localhost:8000');
  });
});
