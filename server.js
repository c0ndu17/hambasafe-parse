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

const links                   = require('docker-links').parseLinks(process.env);
const fs                      = require('fs');
const join                    = require('path').join;
const express                 = require('express');
const passport                = require('passport');
const compression             = require('compression');
const socketIO                = require('socket.io');
const https                   = require('https');
const http                    = require('http');
const ParseServer             = require('parse-server').ParseServer;
const bodyParser              = require('body-parser');
const config                  = join(__dirname, 'config/');
const routes                  = join(__dirname, 'routes/');


const MulterImpl              = require(config+'multerImpl');


//DB CONNECTION

const port                    = process.env.PORT || 3000;

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI

if (!databaseUri) {
  if (links.mongo) {
    databaseUri = 'mongodb://' + links.mongo.hostname + ':' + links.mongo.port + '/dev';
  }
}

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}


//XHR SUPPORT
var cors                  = require('cors');

//Cookie Parser (Obv's)
var cookieParser          = require('cookie-parser')

var session               = require('express-session');

//Logging
var logger                = require('morgan');


var app = new (express)();

var options = {
  // key   :   fs.readFileSync('/etc/letsencrypt/live/mainstream.ninja/privkey.pem'),
  // cert  :   fs.readFileSync('/etc/letsencrypt/live/mainstream.ninja/fullchain.pem'),
  // ca  :   fs.readFileSync('/etc/letsencrypt/live/mainstream.ninja/chain.pem'),
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

      

// var server = https.createServer(options, app)
var server = http.createServer(app);
const io = socketIO(server);
var parse = new ParseServer({
  databaseURI: databaseUri || 'mongodb://mongo:27017/dev', // Connection string for your MongoDB database
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: 'test1234',
  appName: 'hambaSafe',
  masterKey: 'test1234', // Keep this key secret!
  fileKey: 'file_',
  serverURL: 'http://mongo/parse', // Don't forget to change to https if needed
	emailVerifyTokenValidityDuration: 2 * 60 * 60, // in seconds (2 hours = 7200 seconds)
	preventLoginWithUnverifiedEmail: false, // defaults to false
  // emailAdapter: {
  //   module: 'parse-server-simple-mailgun-adapter',
  //   options: {
  //     // The address that your emails come from
  //     fromAddress: 'no-reply@mainstream.ninja',
  //     // Your domain from mailgun.com
  //     domain: 'mg.mainstream.ninja',
  //     // Your API key from mailgun.com
  //     apiKey: 'key-6291bd236f3b790a5259c1a0f2e74e9b',
  //   }
  // },
  accountLockout: {
    duration: 5, // duration policy setting determines the number of minutes that a locked-out account remains locked out before automatically becoming unlocked. Set it to a value greater than 0 and less than 100000.
    threshold: 3, // threshold policy setting determines the number of failed sign-in attempts that will cause a user account to be locked. Set it to an integer value greater than 0 and less than 1000.
  },
  liveQuery : {
    classNames: [
      'Invite',
      'Attendance',
      'Friend',
      'User'
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
app.use("/", function(req, res) {
  console.log('sending index')
  res.sendFile(__dirname + '/index.html')
})

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
