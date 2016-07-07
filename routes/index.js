var bcrypt    = require('bcrypt-nodejs');
var jwt       = require('jwt-simple');
var _         = require('lodash');

module.exports = function(app, io, upload) {
  const attendance     = require('./attendance')(app)
  const authentication = require('./authentication')(app)
  const events         = require('./events')(app)
  const eventType      = require('./eventType')(app)
  const invitations    = require('./invitations')(app)
  const location       = require('./location')(app)
  const users          = require('./users')(app, upload)

  const endPoints = {
    'ATTENDANCE'    :  attendance.endpointHandler,
    'AUTHENTICATION':  authentication.endpointHandler,
    'EVENTS'        :  events.endpointHandler,
    'EVENTTYPE'     :  eventType.endpointHandler,
    'INVITATIONS'   :  invitations.endpointHandler,
    'LOCATION'      :  location.endpointHandler,
    'USERS'         :  users.endpointHandler,
  }
            
  io.on('connection', (socket) => {
    console.log('Client Connected!');
    socket.on('action', function(req) {
      console.log(req);
      if(!!req) {
        if(!!req.type) {
          var retVal = typeHandler(req);
          if(!retVal) {
            errorHandler(null, 'Invalid Type Specified');
          }
        } else {
          errorHandler(null, 'Invalid Format');
        }
      } else {
         errorHandler(null, 'Invalid Format');
      }
    });
    typeHandler = (req) => {
      return endPoints[req.type] ? endPoints[req.type](req, errorHandler, resHandler) : undefined;
    }
    /**
     *  type
     *
     */
    errorHandler = (type, message) => {
      var res = {
        'status'  : 'ERROR',
        'type'    : type,
        'message' : message,
      }
      socket.emit('SOCKET_RESPONSE', res);
    };
    /**
     *
     *
     */
    resHandler = (status, type, data) => {
      if(!type || !data){
        errorHandler('SERVER', 'A server error occurred');
      }
      var res = {
        'status'  : status ||'SUCCESS',
        'type'    : type,
        'data'    : data,
      }
      socket.emit('SOCKET_RESPONSE', res);
    };
  });
}
