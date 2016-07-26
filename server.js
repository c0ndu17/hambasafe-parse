'use strict';

/*
 * nodejs-express-mongoose
 * Copyright(c) 2015 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

require('dotenv').config();

const fs                      = require('fs');
const join                    = require('path').join;
const express                 = require('express');
const passport                = require('passport');
const compression             = require('compression');
const socketIO                = require('socket.io');
const https                   = require('https');
const ParseServer             = require('parse-server').ParseServer;
const bodyParser              = require('body-parser');
const config                  = join(__dirname, 'config/');
const routes                  = join(__dirname, 'routes/');


const MulterImpl              = require(config+'multerImpl');


//DB CONNECTION

const port                    = process.env.PORT || 3000;

//XHR SUPPORT
var cors                  = require('cors');

//Cookie Parser (Obv's)
var cookieParser          = require('cookie-parser')

var session               = require('express-session');

//Logging
var logger                = require('morgan');


var app = new (express)();

var options = {
  key   :   fs.readFileSync('/etc/letsencrypt/live/mainstream.ninja/privkey.pem'),
  cert  :   fs.readFileSync('/etc/letsencrypt/live/mainstream.ninja/fullchain.pem'),
  ca  :   fs.readFileSync('/etc/letsencrypt/live/mainstream.ninja/chain.pem'),
};

//
//Gzip
app.use(compression());

//body field in post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser()); 

app.set('webSecret', 'H3ll0w0rld');

//ALLOW ORIGIN 
app.use(cors());

// require(path.join(__dirname, 'server_utils/startUp.js'))(r);

const upload                = new MulterImpl({}).init();

      

var server = https.createServer(options, app)
const io = socketIO(server);
var parse = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: 'test1234',
  appName: 'hambaSafe',
  masterKey: 'test1234', // Keep this key secret!
  fileKey: 'file_',
  serverURL: 'https://mainstream.ninja/parse', // Don't forget to change to https if needed
  liveQuery : {
    classNames: [
      'Invite'
    ]
  }
});


//Require api routes
// require(
//   join(routes,'index.js')
// )(app, io, upload);


// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, parse);
app.use('/public', express.static(join(__dirname, 'public')));
// app.use("/", function(req, res) {
//   console.log('sending index')
//   res.sendFile(__dirname + '/index.html')
// })

// require(
//   './startUp.js'
// )(r);

/**
 * Expose
 */

// module.exports = {
//   app,
// };

server.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==>  Listening on port %s. Open up https://localhost:%s/ in your browser.", port, port)
  }
});
var parseLiveQueryServer = ParseServer.createLiveQueryServer(server);
