var bcrypt    = require('bcrypt-nodejs');
var jwt       = require('jwt-simple');
var _         = require('lodash');

module.exports = function(r) {
  console.log('Loading ATTENDANCE endpoints');
  
  joinEvent = (req, errorHandler, respHandler) => {
    
  }
  
  withdrawEvent = (req, errorHandler, respHandler) => {
    
  }

  endpointHandler = (req, errorHandler, respHandler) => {
    switch(req.endpoint) {
      case 'joinEvent':
        joinEvent(req);
      break;
      case 'withdrawEvent':
        withdrawEvent(req);
      default:
       error('ATTENDANCE', 'Invalid endpoint!');
    }
  }
  
  return {
    endpointHandler,
  }
}
