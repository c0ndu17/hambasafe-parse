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
const bodyParser              = require('body-parser');
const config                  = join(__dirname, 'config/');
const routes                  = join(__dirname, 'routes/');


const MulterImpl            = require(config+'multerImpl');


//DB CONNECTION
// var r = require('rethinkdbdash')({
//   port  : '28015',
//   host  : 'localhost',
//   db    : 'hambasafe',
// })();

const port = process.env.PORT || 3000;

//XHR SUPPORT
var cors                  = require('cors');

//Cookie Parser (Obv's)
var cookieParser          = require('cookie-parser')

var session               = require('express-session');

//Logging
var logger                = require('morgan');


var app = new (express)();

var options = {
  key   :   fs.readFileSync(config + 'certificates/key.pem'),
  cert  :   fs.readFileSync(config + 'certificates/cert.pem'),
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

      

console.log(routes);


app.use('/public', express.static(join(__dirname, 'public')));
app.use("/", function(req, res) {
  console.log('sending index')
  res.sendFile(__dirname + '/index.html')
})
var server = https.createServer(options, app)
const io = socketIO(server);
// var r = null;

// require(
//   './startUp.js'
// )(r);
require(
  join(routes,'index.js')
)(app, io, upload);

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
