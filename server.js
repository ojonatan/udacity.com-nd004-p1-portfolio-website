// server.js

var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

var httpServer = require("http").createServer(app);

// set our port
var port = 3000;

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

//set the public folder of the app
app.use(express.static(__dirname + '/public'));

// startup our app at http://localhost:3000
httpServer.listen(port);

// shoutout to the user
console.log('Server available at http://localhost:' + port);

// expose app
exports = module.exports = app;

